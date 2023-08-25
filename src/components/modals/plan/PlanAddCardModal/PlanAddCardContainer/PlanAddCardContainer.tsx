import React, { FC, useCallback, useMemo, useState } from 'react';
import { Box } from '@mui/material';
import { loadStripe } from '@stripe/stripe-js/pure';
import { Elements } from '@stripe/react-stripe-js';
import PlanAddCard from './components/PlanAddCard';
import { CouponModel, PlanModel } from '../../../../../shared/models/plans.model';
import PlanAddCardSuccess from './components/PlanAddCardSuccess';
import { useAppDispatch } from '../../../../../shared/hooks/redux';
import { ModalNamesEnum } from '../../../../../shared/enums/modalNames.enum';
import { getCuponInfo } from '../../../../../store/settings/settingsThunk';
import modalObserver from '../../../../../shared/utils/observers/modalObserver';

type Props = {
  onClose: () => void;
  plan: PlanModel;
  isEditCard?: boolean;
};

const PlanAddCardContainer: FC<Props> = ({ onClose, plan, isEditCard }) => {
  const [step, setStep] = useState(1);
  const dispatch = useAppDispatch();
  const [couponState, setCouponState] = useState<CouponModel | null>(null);

  const handleGetCouponInfo = useCallback(
    (promocode: string, handleSetError: (text: string) => void) => {
      dispatch(getCuponInfo({ name: promocode, package_id: plan?.id })).then((res) => {
        if (getCuponInfo.fulfilled.match(res)) {
          setCouponState(res.payload);
        }
        if (getCuponInfo.rejected.match(res)) {
          // TODO add i18
          handleSetError('This promo code is invalid. Try again.');
        }
      });
    },
    [dispatch, plan?.id],
  );

  const handleClose = useCallback(() => {
    if (isEditCard) {
      modalObserver.addModal(ModalNamesEnum.upgradePlan, {});
      onClose();
      return;
    }
    onClose();
  }, [isEditCard, onClose]);

  const render = useMemo(() => {
    switch (step) {
      case 1:
        return (
          <Elements stripe={loadStripe(process.env.REACT_APP_STRIPE_KEY as string, { locale: 'en' })}>
            <PlanAddCard
              couponState={couponState}
              handleGetCouponInfo={handleGetCouponInfo}
              setStep={(newStep) => setStep(newStep)}
              plan={plan}
              onClose={handleClose}
            />
          </Elements>
        );
      case 2:
        return <PlanAddCardSuccess onClose={onClose} />;

      default:
        return <></>;
    }
  }, [couponState, handleClose, handleGetCouponInfo, onClose, plan, step]);

  return (
    <Box width="100%" height="100%">
      {render}
    </Box>
  );
};

export default PlanAddCardContainer;

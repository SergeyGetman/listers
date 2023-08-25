import React, { FC, useCallback, useMemo, useState } from 'react';
import { Box } from '@mui/material';
import { CouponModel, PlanModel } from '../../../../../../shared/models/plans.model';
import UpgradePlan from './UpgradePlan';
import { createSubscription, getCuponInfo } from '../../../../../../store/settings/settingsThunk';
import { useAppDispatch } from '../../../../../../shared/hooks/redux';
import { setLoading } from '../../../../../../store/Common/commonSlice';
import UpgradePlanSuccess from './UpgradePlanSuccess';
import { selectGoogleTagManagerPlansEvents } from '../../../../../../shared/utils/selectGoogleTagManagerPlansEvents';
import { ModalNamesEnum } from '../../../../../../shared/enums/modalNames.enum';
import modalObserver from '../../../../../../shared/utils/observers/modalObserver';

type Props = {
  onClose: () => void;
  plan: PlanModel;
};

const PlanUpgradeContainer: FC<Props> = ({ onClose, plan }) => {
  const [step, setStep] = useState(1);
  const [couponState, setCouponState] = useState<CouponModel | null>(null);
  const dispatch = useAppDispatch();

  const [errorText, setErrorText] = useState('');

  const handleChangeCard = useCallback(() => {
    modalObserver.addModal(ModalNamesEnum.addPlanCard, {
      props: {
        plan,
        isEditCard: true,
      },
    });

    modalObserver.closeModal(ModalNamesEnum.upgradePlan);
  }, [plan]);

  const handleUpgradePlan = useCallback(async () => {
    dispatch(setLoading(true));
    await dispatch(createSubscription({ id: plan?.id, code: couponState?.coupon?.id })).then(async (resp) => {
      if (createSubscription.fulfilled.match(resp)) {
        if (
          resp.payload.user_status === 'requires_action' ||
          resp.payload.user_status === 'requires_payment_method'
        ) {
          window.location = resp.payload.payment_url;
        } else {
          setStep(2);
        }

        selectGoogleTagManagerPlansEvents({ tag: plan?.tag, period: plan?.period });
      } else {
        if (resp.payload?.status === 425) {
          setStep(2);

          selectGoogleTagManagerPlansEvents({ tag: plan?.tag, period: plan?.period });
        }
      }
      if (createSubscription.rejected.match(resp)) {
        setErrorText(resp.payload?.message || '');
      }
    });
    dispatch(setLoading(false));
  }, [couponState?.coupon?.id, dispatch, plan?.id, plan?.period, plan?.tag]);

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

  const render = useMemo(() => {
    switch (step) {
      case 1: {
        return (
          <UpgradePlan
            couponState={couponState}
            handleGetCouponInfo={handleGetCouponInfo}
            handleEditCard={handleChangeCard}
            plan={plan}
            onClose={onClose}
            handleUpgradePlan={handleUpgradePlan}
            errorText={errorText}
          />
        );
      }
      case 2: {
        return <UpgradePlanSuccess onClose={onClose} />;
      }
      default:
        return <></>;
    }
  }, [couponState, errorText, handleChangeCard, handleGetCouponInfo, handleUpgradePlan, onClose, plan, step]);

  return <Box height="100%">{render}</Box>;
};

export default PlanUpgradeContainer;

import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { Box } from '@mui/material';
import { useLocation } from 'react-router-dom';
import DowngradeForm from './components/DoungradeForm';
import { DowngradeFormType } from './components/DoungradeForm/DowngradeForm';
import DowngradePlan from './components/DoungradePlan';
import DowngradeDiscount from './components/DoungradeDiscount';
import DowngradeSuccessForm from './components/DoungradeSuccessForm';
import DowngradeCancelForm from './components/DoungradeCancelForm';
import { DiscountModel, PlanModel, SubscriptionFeedback } from '../../../../../shared/models/plans.model';
import { setLoading } from '../../../../../store/Common/commonSlice';
import {
  applyDiscount,
  createSubscription,
  createSubscriptionFeedback,
  getDowngradeSubscription,
} from '../../../../../store/settings/settingsThunk';
import { useAppDispatch, useAppSelector } from '../../../../../shared/hooks/redux';
import { PlanPeriodEnum } from '../../../../../shared/enums/planPeriodEnum';
import { planFormText } from './components/DoungradeForm/config';
import { getWalletItems } from '../../../../../store/wallet/walletThunk';
import { setWalletData } from '../../../../../store/wallet/walletSlice';
import router from '../../../../../shared/services/router';
import { selectGoogleTagManagerPlansEvents } from '../../../../../shared/utils/selectGoogleTagManagerPlansEvents';
import modalObserver from '../../../../../shared/utils/observers/modalObserver';

type Props = {
  downgradePlan?: PlanModel;
  onClose: () => void;
};

const convertFormToRequest = (form: DowngradeFormType) => {
  const data: SubscriptionFeedback = { checkboxes: [], message: '' };
  if (form.first) {
    data.checkboxes.push({ text: planFormText.first });
  }
  if (form.second) {
    data.checkboxes.push({ text: planFormText.second });
  }
  if (form.third) {
    data.checkboxes.push({ text: planFormText.third });
  }
  if (form.forth) {
    data.checkboxes.push({ text: planFormText.forth });
  }
  if (form.text.length > 2) {
    data.message = form.text;
  }
  return data;
};

const DowngradePlanContainer: FC<Props> = ({ downgradePlan = null, onClose }) => {
  const dispatch = useAppDispatch();
  const [step, setStep] = useState(1);
  const [formState, setFormState] = useState<DowngradeFormType | null>(null);
  const [discount, setDiscount] = useState<DiscountModel | null>(null);
  const profile = useAppSelector((state) => state.profile.data);
  const [currentSubscription, setCurrentSubscription] = useState(null);
  const { filters } = useAppSelector(({ wallet }) => wallet);
  const location = useLocation();

  useEffect(() => {
    setCurrentSubscription(profile?.subscription);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getDiscount = () => {
    setStep(3);
  };

  const isHasDiscount = useMemo(() => {
    if (
      profile.subscription.period === PlanPeriodEnum.year ||
      profile.subscription.package_canceled !== null
    ) {
      return false;
    }
    return !!discount;
  }, [discount, profile]);

  const totalSteps = useMemo(() => {
    return isHasDiscount ? 3 : 2;
  }, [isHasDiscount]);

  const submitDiscount = useCallback(async () => {
    if (discount) {
      await dispatch(applyDiscount(discount.id.toString()));
      dispatch(createSubscriptionFeedback({ data: convertFormToRequest(formState as DowngradeFormType) }));
      setStep(4);
    }
  }, [discount, dispatch, formState]);

  const cancelPlan = useCallback(() => {
    if (downgradePlan) {
      dispatch(setLoading(true));
      dispatch(createSubscriptionFeedback({ data: convertFormToRequest(formState as DowngradeFormType) }));
      dispatch(createSubscription({ id: downgradePlan.id }))
        .then((response) => {
          if (createSubscription.fulfilled.match(response)) {
            selectGoogleTagManagerPlansEvents({ tag: downgradePlan?.tag, period: downgradePlan?.period });
            if (
              response.payload.user_status === 'requires_action' ||
              response.payload.user_status === 'requires_payment_method'
            ) {
              window.location = response.payload.payment_url;
            } else {
              setStep(5);
            }

            if (location.pathname.includes(router.settings.children.wallet.path)) {
              dispatch(getWalletItems(filters)).then((result) => {
                if (getWalletItems.fulfilled.match(result)) {
                  dispatch(setWalletData(result.payload));
                }
              });
              modalObserver.removeAllModals();
            }
          } else {
            if (response.payload?.status === 425) {
              selectGoogleTagManagerPlansEvents({ tag: downgradePlan?.tag, period: downgradePlan?.period });
              setStep(5);
              if (location.pathname.includes(router.settings.children.wallet.path)) {
                dispatch(getWalletItems(filters)).then((result) => {
                  if (getWalletItems.fulfilled.match(result)) {
                    dispatch(setWalletData(result.payload));
                  }
                });
                modalObserver.removeAllModals();
              }
            }
          }
        })
        .finally(() => dispatch(setLoading(false)));
    }
  }, [dispatch, downgradePlan, filters, formState, location.pathname]);

  const handleSaveForm = (form: DowngradeFormType) => {
    setFormState(form);
    setStep(2);
  };

  useEffect(() => {
    dispatch(getDowngradeSubscription()).then((res) => {
      if (getDowngradeSubscription.fulfilled.match(res)) {
        setDiscount(res.payload[0] || null);
      }
    });
  }, [dispatch]);
  const renderForm = useMemo(() => {
    switch (step) {
      case 1:
        return (
          <DowngradeForm
            onSaveForm={(form) => handleSaveForm(form)}
            onClose={onClose}
            formState={formState}
            countStep={totalSteps}
          />
        );
      case 2:
        return (
          <DowngradePlan
            getDiscount={getDiscount}
            back={() => setStep(1)}
            onClose={onClose}
            isHasDiscount={isHasDiscount}
            cancelPlan={cancelPlan}
            countStep={totalSteps}
            downgradePlan={downgradePlan}
          />
        );
      case 3:
        return (
          <DowngradeDiscount
            cancelPlan={cancelPlan}
            submitDiscount={submitDiscount}
            back={() => setStep(2)}
            countStep={totalSteps}
            onClose={onClose}
          />
        );
      case 4:
        return <DowngradeSuccessForm onClose={onClose} />;
      case 5:
        return (
          <DowngradeCancelForm
            currentSubscription={currentSubscription}
            onClose={onClose}
            downgradePlan={downgradePlan}
          />
        );
      default:
        return 1;
    }
  }, [
    cancelPlan,
    currentSubscription,
    downgradePlan,
    formState,
    isHasDiscount,
    onClose,
    step,
    submitDiscount,
    totalSteps,
  ]);

  return (
    <Box display="flex" height="100%">
      {renderForm}
    </Box>
  );
};

export default DowngradePlanContainer;

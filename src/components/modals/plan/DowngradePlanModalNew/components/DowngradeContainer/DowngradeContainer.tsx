import React, { FC, useState } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { PlanModel } from '../../../../../../shared/models/plans.model';
import Stepper from '../../../../../Stepper';
import { ChangeCurrentPlan } from '../DowngradeContentContainer/StepContent/ChangeCurrentPlan/ChangeCurrentPlan';
import FeedbackForm from '../DowngradeContentContainer/StepContent/FeedbackForm/FeedbackForm';
import { contentBlock } from './DowngradeContainer.style';
import PriceToMuch from '../DowngradeContentContainer/StepContent/PriceToMuch/PriceToMuch';

import { STEP_CASE } from './enum/stepCaseEnum';
import BookDemoForm from '../DowngradeContentContainer/StepContent/BookDemo/BookDemoForm';
import SuccessBookDemo from '../DowngradeContentContainer/StepContent/SuccesBookDemo/SuccessBookDemo';
import { useAppDispatch, useAppSelector } from '../../../../../../shared/hooks/redux';
import AcceptDowngrade from '../DowngradeContentContainer/StepContent/AcceptDowgrade/AcceptDowngrade';
import { getCurrentSubscriptionSelector } from './selector/selectors';
import { selectGoogleTagManagerPlansEvents } from '../../../../../../shared/utils/selectGoogleTagManagerPlansEvents';
import { createSubscription } from '../../../../../../store/settings/settingsThunk';
import { setLoading } from '../../../../../../store/Common/commonSlice';
import AcceptDiscount from '../DowngradeContentContainer/StepContent/AcceptDiscount/AcceptDiscount';

type PropsType = {
  downgradePlan: PlanModel;
  onClose: () => void;
  setNewHeader: (newHeader: string | JSX.Element) => void;
  isMobile: boolean;
};

const STEP_COUNT = 3;

const DowngradeContainer: FC<PropsType> = ({ downgradePlan, onClose, setNewHeader, isMobile }) => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const { t } = useTranslation();
  const currentSubscription = useAppSelector(getCurrentSubscriptionSelector);

  const [step_case, setNewStepCase] = useState(() => STEP_CASE.CHANGE_PLAN);
  const [step_indicator, setStepIndicator] = useState(true);
  const [step, setStep] = useState(1);

  const handleChangeNewStep = (
    newStep: STEP_CASE,
    newHeader: string,
    stepper: number,
    stepIndicator: boolean = true,
  ) => {
    setNewStepCase(newStep);
    setNewHeader(newHeader);
    setStep(stepper);
    setStepIndicator(stepIndicator);
  };

  const canselSubscription = async () => {
    const subscriptionName = t('plans.downgrade.header.cancelSub.subscription', {
      subscription: currentSubscription?.name,
    });
    const headerCancelName = (
      <>
        {t('plans.downgrade.header.cancelSub.getBack')}
        <Typography mx="4px" variant="h3" component="span" sx={{ color: theme.palette.case.primary.p600 }}>
          {subscriptionName}
        </Typography>
        {t('plans.downgrade.header.cancelSub.anyTime')}
      </>
    );

    dispatch(setLoading(true));

    await dispatch(createSubscription({ id: downgradePlan.id }))
      .unwrap()
      .then(() => {
        selectGoogleTagManagerPlansEvents({ tag: downgradePlan?.tag, period: downgradePlan?.period });
        dispatch(setLoading(false));
      });

    setNewHeader(headerCancelName);
    setNewStepCase(STEP_CASE.CANCELED);
    setStepIndicator(false);
  };

  const renderStepDowngrade = () => {
    switch (step_case) {
      case STEP_CASE.CHANGE_PLAN: {
        return (
          <ChangeCurrentPlan
            downgradeName={downgradePlan.name}
            onClose={onClose}
            setNewStep={handleChangeNewStep}
            setNewHeader={setNewHeader}
          />
        );
      }
      case STEP_CASE.FEEDBACK: {
        return <FeedbackForm onClose={onClose} setNewStep={handleChangeNewStep} />;
      }
      case STEP_CASE.BOOK_A_DEMO: {
        return (
          <BookDemoForm
            onClose={onClose}
            setNewStep={handleChangeNewStep}
            canselSubscription={canselSubscription}
          />
        );
      }
      case STEP_CASE.TOO_MUCH: {
        return <PriceToMuch canselSubscription={canselSubscription} setNewStep={handleChangeNewStep} />;
      }
      case STEP_CASE.SUCCESS_BOOK: {
        return <SuccessBookDemo onClose={onClose} />;
      }
      case STEP_CASE.DISCOUNT_OFFER: {
        return <AcceptDiscount onClose={onClose} />;
      }

      case STEP_CASE.CANCELED: {
        return <AcceptDowngrade downgradePlanName={downgradePlan.name} onClose={onClose} />;
      }

      default: {
        return STEP_CASE.CHANGE_PLAN;
      }
    }
  };

  return (
    <Box sx={{ ...contentBlock, marginTop: isMobile ? '15px' : '40px' }}>
      {step_indicator && <Stepper count={STEP_COUNT} selected={step} />}

      {renderStepDowngrade()}
    </Box>
  );
};

export default DowngradeContainer;

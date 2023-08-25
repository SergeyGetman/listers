import React, { FC } from 'react';
import { Box, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useTranslation } from 'react-i18next';
import DowngradeFormsContainer from '../DowngradeFormsContainer';
import LouseHubsContainer from './LouseHubsContainer';
import { useAppSelector } from '../../../../../../../shared/hooks/redux';
import { PlanModel } from '../../../../../../../shared/models/plans.model';

type Props = {
  getDiscount: () => void;
  back: () => void;
  onClose: () => void;
  isHasDiscount: boolean;
  cancelPlan: () => void;
  countStep: number;
  downgradePlan?: PlanModel | null;
};

const DowngradePlan: FC<Props> = ({
  getDiscount,
  back,
  onClose,
  isHasDiscount,
  cancelPlan,
  countStep,
  downgradePlan,
}) => {
  const subscription = useAppSelector((state) => state.profile.data?.subscription);
  const { t } = useTranslation();

  const handleNextPage = async () => {
    await getDiscount();
  };

  return (
    <DowngradeFormsContainer
      title={t('plans.downgrade.title')}
      countSteps={countStep}
      step={2}
      onClose={onClose}
      rightBtnProps={{
        isShow: true,
        label: isHasDiscount ? 'Cancel' : t('plans.button.stay'),
        variant: 'contained',
        isLoadingBtn: true,
        onClick: isHasDiscount ? handleNextPage : onClose,
        isStopPropagation: false,
      }}
      middleBtnProps={{
        isShow: true,
        label: isHasDiscount ? t('plans.button.stay') : t('plans.button.cancel'),
        type: 'button',
        onClick: isHasDiscount ? onClose : cancelPlan,
      }}
      leftBtnProps={{
        isShow: true,
        label: t('plans.button.back'),
        onClick: back,
        startIcon: <ArrowBackIcon />,
      }}
    >
      <Box>
        <Typography variant="large_bolt">{t('plans.downgrade.step2.title')}</Typography>
      </Box>
      <Box mb="16px">
        <Typography variant="default">{t('plans.downgrade.step2.subtitle1')}</Typography>
      </Box>
      <Box display="flex" justifyContent="center">
        <LouseHubsContainer title={subscription?.name} downgradePlanName={downgradePlan?.name} />
      </Box>
    </DowngradeFormsContainer>
  );
};

export default DowngradePlan;

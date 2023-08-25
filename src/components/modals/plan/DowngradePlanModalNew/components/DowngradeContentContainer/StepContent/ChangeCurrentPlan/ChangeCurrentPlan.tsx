import React, { FC, useEffect } from 'react';
import { useMediaQuery } from '@mui/material';
import { useTranslation } from 'react-i18next';
import DowngradeContentContainer from '../../DowngradeContentContainer';
import PermanentlyLooseItem from './PermanentlyLooseItem/PermanentlyLooseItem';

import theme from '../../../../../../../../theme/theme';
import { STEP_CASE } from '../../../DowngradeContainer/enum/stepCaseEnum';

type PropsType = {
  onClose: () => void;
  downgradeName: string;
  setNewStep: (newStep: STEP_CASE, newHeader: string, step: number, stepIndicator?: boolean) => void;
  setNewHeader: (newName: string) => void;
};

export const ChangeCurrentPlan: FC<PropsType> = ({ onClose, downgradeName, setNewStep, setNewHeader }) => {
  const { t } = useTranslation();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const headerForStepFeedback = isMobile
    ? t('plans.downgrade.header.feedback.mobile')
    : t('plans.downgrade.header.feedback.desktop');

  useEffect(() => {
    const changePlanHeader = t('plans.downgrade.header.changePlan');
    setNewHeader(changePlanHeader);
  }, [setNewHeader, t]);

  return (
    <DowngradeContentContainer
      title={t('plans.downgrade.changePlan.title')}
      rightBtnProps={{
        isShow: true,
        label: t('plans.button.keepPlan'),
        fullWidth: isMobile,
        onClick: onClose,
        variant: 'contained',
      }}
      leftBtnProps={{
        isShow: true,
        label: t('plans.button.downgrade'),
        fullWidth: isMobile,
        onClick: () => setNewStep(STEP_CASE.FEEDBACK, headerForStepFeedback, 2),
        variant: 'outlined',
      }}
    >
      <PermanentlyLooseItem downgradeName={downgradeName} />
    </DowngradeContentContainer>
  );
};

import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';
import { FormStepsEnum, FormSubStepsEnum } from '../../../../../../../../../shared/enums/formSteps.enum';
import FormSubStepContainer from '../../../../../../../../containers/FormSubStepContainer';
import { ReactComponent as ArrowLeft } from '../../../../../../../../../assets/Images/arrow-left.svg';
import { ReactComponent as ArrowRight } from '../../../../../../../../../assets/Images/arrow-right.svg';
import BaseContainer from '../../../../../../../../containers/BaseContainer';
type ThirdSubStepProps = {
  handleSelectStep: (step: FormStepsEnum, subStepId?: FormSubStepsEnum) => void;
};
const ThirdSubStep: FC<ThirdSubStepProps> = ({ handleSelectStep }) => {
  const { t } = useTranslation();

  const selectStepHandler = (step: FormStepsEnum, subStepId?: FormSubStepsEnum) => {
    handleSelectStep(step, subStepId);
  };

  return (
    <FormSubStepContainer
      backBtnProps={{
        isShow: true,
        label: t('general.buttons.back'),
        startIcon: <ArrowLeft />,
        onClick: () => selectStepHandler(FormStepsEnum.step_fourth, FormSubStepsEnum.sub_step_second),
      }}
      nextBtnProps={{
        isShow: true,
        label: t('general.buttons.next'),
        endIcon: <ArrowRight />,
        onClick: () => selectStepHandler(FormStepsEnum.step_fourth, FormSubStepsEnum.sub_step_fourth),
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <BaseContainer title={t('general.containers.date')}>
          <Box sx={{ height: '102px' }} />
        </BaseContainer>
        <Box sx={{ mt: '24px', width: '100%' }}>
          <BaseContainer title={t('general.containers.fee')}>
            <Box sx={{ height: '274px' }} />
          </BaseContainer>
        </Box>
      </Box>
    </FormSubStepContainer>
  );
};

export default ThirdSubStep;

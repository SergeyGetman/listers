import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';
import { FormStepsEnum, FormSubStepsEnum } from '../../../../../../../../../shared/enums/formSteps.enum';
import FormSubStepContainer from '../../../../../../../../containers/FormSubStepContainer';
import { ReactComponent as ArrowLeft } from '../../../../../../../../../assets/Images/arrow-left.svg';
import { ReactComponent as ArrowRight } from '../../../../../../../../../assets/Images/arrow-right.svg';
import BaseContainer from '../../../../../../../../containers/BaseContainer';
type SecondSubStepProps = {
  handleSelectStep: (step: FormStepsEnum, subStepId?: FormSubStepsEnum) => void;
};
const SecondSubStep: FC<SecondSubStepProps> = ({ handleSelectStep }) => {
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
        onClick: () => selectStepHandler(FormStepsEnum.step_second, FormSubStepsEnum.sub_step_first),
      }}
      nextBtnProps={{
        isShow: true,
        label: t('general.buttons.next'),
        endIcon: <ArrowRight />,
        onClick: () => selectStepHandler(FormStepsEnum.step_second, FormSubStepsEnum.sub_step_third),
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <BaseContainer title={t('general.containers.peopleCovered')}>
          <Box sx={{ height: '102px' }} />
        </BaseContainer>
        <Box sx={{ mt: '24px', width: '100%' }}>
          <BaseContainer title={t('general.containers.agency')}>
            <Box sx={{ height: '360px' }} />
          </BaseContainer>
        </Box>
        <Box sx={{ mt: '24px', width: '100%' }}>
          <BaseContainer title={t('general.containers.agent')}>
            <Box sx={{ height: '102px' }} />
          </BaseContainer>
        </Box>
      </Box>
    </FormSubStepContainer>
  );
};

export default SecondSubStep;

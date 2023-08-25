import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { FormStepsEnum, FormSubStepsEnum } from '../../../../../../../../../shared/enums/formSteps.enum';
import FormSubStepContainer from '../../../../../../../../containers/FormSubStepContainer';
import { ReactComponent as ArrowLeft } from '../../../../../../../../../assets/Images/arrow-left.svg';
import { ReactComponent as ArrowRight } from '../../../../../../../../../assets/Images/arrow-right.svg';
import BaseContainer from '../../../../../../../../containers/BaseContainer';
import ZoneFormContainer from '../../../../../../../../formContainers/garage/vehicleRegistration/ZoneFormContainer';
import { validation } from './validation';
type SecondSubStepProps = {
  handleSelectStep: (step: FormStepsEnum, subStepId?: FormSubStepsEnum) => void;
};
const SecondSubStep: FC<SecondSubStepProps> = ({ handleSelectStep }) => {
  const { t } = useTranslation();

  const selectStepHandler = (step: FormStepsEnum, subStepId?: FormSubStepsEnum) => {
    handleSelectStep(step, subStepId);
  };

  const initialValue = {
    zone_number: '',
  };

  const onSubmit = (formData: any) => {
    selectStepHandler(FormStepsEnum.step_fourth, FormSubStepsEnum.sub_step_third);
    return formData;
  };

  const { control, handleSubmit } = useForm<any>({
    defaultValues: initialValue,
    resolver: yupResolver(validation),
  });

  const handleNextStepClick = () => {
    handleSubmit(onSubmit)();
  };

  return (
    <FormSubStepContainer
      backBtnProps={{
        isShow: true,
        label: t('general.buttons.back'),
        startIcon: <ArrowLeft />,
        onClick: () => selectStepHandler(FormStepsEnum.step_fourth, FormSubStepsEnum.sub_step_first),
      }}
      nextBtnProps={{
        isShow: true,
        label: t('general.buttons.next'),
        endIcon: <ArrowRight />,
        onClick: () => handleNextStepClick(),
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <BaseContainer title={t('general.containers.resident')}>
          <Box sx={{ height: '102px' }} />
        </BaseContainer>
        <Box sx={{ mt: '24px', width: '100%' }}>
          <ZoneFormContainer control={control} />
        </Box>
      </Box>
    </FormSubStepContainer>
  );
};

export default SecondSubStep;

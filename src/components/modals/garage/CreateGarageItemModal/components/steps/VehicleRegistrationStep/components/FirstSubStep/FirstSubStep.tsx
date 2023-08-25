import React, { FC } from 'react';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import FormSubStepContainer from '../../../../../../../../containers/FormSubStepContainer';
import { ReactComponent as ArrowLeft } from '../../../../../../../../../assets/Images/arrow-left.svg';
import { ReactComponent as ArrowRight } from '../../../../../../../../../assets/Images/arrow-right.svg';
import { FormStepsEnum, FormSubStepsEnum } from '../../../../../../../../../shared/enums/formSteps.enum';
import RenewOnlineFormContainer from '../../../../../../../../formContainers/insurance/RenewOnlineFormContainer';
import MainInformationFormContainer from '../../../../../../../../formContainers/garage/vehicleRegistration/MainInformationFormContainer';
import { validation } from './validation';
type FirstSubStepProps = {
  handleSelectStep: (step: FormStepsEnum, subStepId?: FormSubStepsEnum) => void;
};
const FirstSubStep: FC<FirstSubStepProps> = ({ handleSelectStep }) => {
  const { t } = useTranslation();

  const selectStepHandler = (step: FormStepsEnum, subStepId?: FormSubStepsEnum) => {
    handleSelectStep(step, subStepId);
  };

  const initialValue = {
    reference: '',
    number: '',
    type: null,
    renew: '',
    login: '',
    password: '',
  };

  const onSubmit = (formData: any) => {
    selectStepHandler(FormStepsEnum.step_fourth, FormSubStepsEnum.sub_step_second);
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
      skipBtnProps={{
        isShow: true,
        label: t('general.buttons.skipVehicleRegistration'),
        onClick: () => selectStepHandler(FormStepsEnum.step_fifth, FormSubStepsEnum.sub_step_first),
      }}
      backBtnProps={{
        isShow: true,
        label: t('general.buttons.back'),
        startIcon: <ArrowLeft />,
        onClick: () => selectStepHandler(FormStepsEnum.step_third, FormSubStepsEnum.sub_step_fourth),
      }}
      nextBtnProps={{
        isShow: true,
        label: t('general.buttons.next'),
        endIcon: <ArrowRight />,
        onClick: () => handleNextStepClick(),
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <MainInformationFormContainer control={control} />
        <Box sx={{ mt: '24px', width: '100%' }}>
          <RenewOnlineFormContainer control={control} />
        </Box>
      </Box>
    </FormSubStepContainer>
  );
};

export default FirstSubStep;

import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { FormStepsEnum, FormSubStepsEnum } from '../../../../../../../../../shared/enums/formSteps.enum';
import FormSubStepContainer from '../../../../../../../../containers/FormSubStepContainer';
import { ReactComponent as ArrowLeft } from '../../../../../../../../../assets/Images/arrow-left.svg';
import { ReactComponent as ArrowRight } from '../../../../../../../../../assets/Images/arrow-right.svg';
import { validation } from './validation';
import MoreDetailsFormContainer from '../../../../../../../../formContainers/garage/generalInformation/MoreDetailsFormContainer';
type SecondSubStepProps = {
  handleSelectStep: (step: FormStepsEnum, subStepId?: FormSubStepsEnum) => void;
};
const SecondSubStep: FC<SecondSubStepProps> = ({ handleSelectStep }) => {
  const { t } = useTranslation();

  const selectStepHandler = (step: FormStepsEnum, subStepId?: FormSubStepsEnum) => {
    handleSelectStep(step, subStepId);
  };

  const initialValue = {
    fuel_type: null,
    hybrid_type: null,
    engine_type: '',
    transmission: null,
    mileage: '',
    drivetrain: '',
    country_of_assembly: '',
    vin: '',
  };

  const onSubmit = (formData: any) => {
    selectStepHandler(FormStepsEnum.step_first, FormSubStepsEnum.sub_step_third);
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
        onClick: () => selectStepHandler(FormStepsEnum.step_first, FormSubStepsEnum.sub_step_first),
      }}
      nextBtnProps={{
        isShow: true,
        label: t('general.buttons.next'),
        endIcon: <ArrowRight />,
        onClick: () => handleNextStepClick(),
      }}
    >
      <MoreDetailsFormContainer control={control} />
    </FormSubStepContainer>
  );
};

export default SecondSubStep;

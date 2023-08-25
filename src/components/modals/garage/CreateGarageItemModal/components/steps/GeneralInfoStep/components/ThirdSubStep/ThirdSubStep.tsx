import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { FormStepsEnum, FormSubStepsEnum } from '../../../../../../../../../shared/enums/formSteps.enum';
import FormSubStepContainer from '../../../../../../../../containers/FormSubStepContainer';
import { ReactComponent as ArrowLeft } from '../../../../../../../../../assets/Images/arrow-left.svg';
import { ReactComponent as ArrowRight } from '../../../../../../../../../assets/Images/arrow-right.svg';
import { validation } from './validation';
import LicensePlateFromContainer from '../../../../../../../../formContainers/garage/generalInformation/LicensePlateFromContainer';
import EditorContainer from '../../../../../../../../formContainers/EditorContainer';
type ThirdSubStepProps = {
  handleSelectStep: (step: FormStepsEnum, subStepId?: FormSubStepsEnum) => void;
};
const ThirdSubStep: FC<ThirdSubStepProps> = ({ handleSelectStep }) => {
  const { t } = useTranslation();

  const selectStepHandler = (step: FormStepsEnum, subStepId?: FormSubStepsEnum) => {
    handleSelectStep(step, subStepId);
  };

  const initialValue = {
    state_on_license_plate: '',
    license_plate: '',
    description: [
      {
        type: 'paragraph',
        children: [{ text: '' }],
      },
    ],
  };

  const onSubmit = (formData: any) => {
    selectStepHandler(FormStepsEnum.step_first, FormSubStepsEnum.sub_step_fourth);
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
        onClick: () => selectStepHandler(FormStepsEnum.step_first, FormSubStepsEnum.sub_step_second),
      }}
      nextBtnProps={{
        isShow: true,
        label: t('general.buttons.next'),
        endIcon: <ArrowRight />,
        onClick: () => handleNextStepClick(),
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <LicensePlateFromContainer control={control} />
        <Box sx={{ mt: '24px', width: '100%' }}>
          <EditorContainer
            control={control}
            label={t('general.containers.description')}
            blockTitle={t('general.containers.description')}
          />
        </Box>
      </Box>
    </FormSubStepContainer>
  );
};

export default ThirdSubStep;

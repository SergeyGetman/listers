import React, { FC } from 'react';
import { Box, Collapse, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { FormStepperContainer, FormStepperStepBlock, FormStepperStepNameDot } from './FormStepper.style';
import { FormStepsEnum, FormSubStepsEnum } from '../../shared/enums/formSteps.enum';
type FormStepperProps = {
  label: string;
  step: FormStepsEnum;
  step_id: number;
  isSelected?: boolean;
  isDisabled?: boolean;
  handleSelectStep: (step: FormStepsEnum, subStepId?: FormSubStepsEnum) => void;
  subSteps: {
    isSelected: boolean;
    is_filled?: boolean;
    isDisabled?: boolean;
    sub_step: FormSubStepsEnum;
  }[];
};
const FormStepper: FC<FormStepperProps> = ({
  label,
  isSelected,
  isDisabled,
  step,
  step_id,
  handleSelectStep,
  subSteps,
}) => {
  const { t } = useTranslation();

  const handleStepperSubStepClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    selectedStep: FormStepsEnum,
    selectedSubStep: FormSubStepsEnum,
  ) => {
    event.stopPropagation();
    handleSelectStep(selectedStep, selectedSubStep);
  };

  return (
    <FormStepperContainer
      onClick={() => (!isDisabled ? handleSelectStep(step) : true)}
      isSelected={isSelected}
      isDisabled={isDisabled}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', mb: '4px' }}>
        <Collapse orientation="horizontal" in={isSelected}>
          <FormStepperStepNameDot />
        </Collapse>
        <Typography sx={{ textTransform: 'uppercase' }} className="form-stepper-step-name" variant="badge">
          {t('general.step', { step: step_id })}
        </Typography>
      </Box>

      <Typography className="form-stepper-label" variant="large">
        {label}
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        {subSteps.map((subStepItem) => (
          <FormStepperStepBlock
            onClick={(e) =>
              !subStepItem.isDisabled ? handleStepperSubStepClick(e, step, subStepItem.sub_step) : true
            }
            isDisabled={subStepItem.isDisabled}
            key={subStepItem.sub_step}
            isSelected={subStepItem.isSelected}
            isFilled={subStepItem.is_filled}
          />
        ))}
      </Box>
    </FormStepperContainer>
  );
};

export default FormStepper;

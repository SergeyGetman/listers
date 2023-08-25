import React, { FC, useMemo } from 'react';
import { Box } from '@mui/material';
import FormStepper from '../../../../../FormStepper';
import { FormStepsEnum, FormSubStepsEnum } from '../../../../../../shared/enums/formSteps.enum';
import { FormStepperModel } from '../../../../../../shared/models/formStepper.model';
type CreateGarageItemStepperProps = {
  handleSelectStep: (step: FormStepsEnum, subStepId?: FormSubStepsEnum) => void;
  formStepper: FormStepperModel;
};
const CreateGarageItemStepper: FC<CreateGarageItemStepperProps> = ({ handleSelectStep, formStepper }) => {
  const formattedStepsConfig = useMemo(() => {
    return Object.entries(formStepper).map(([stepKey, value]) => ({
      ...value,
      step: stepKey as FormStepsEnum,
      sub_steps: Object.entries(value.sub_steps).map(([subStepsKey, subStepsValue]) => ({
        ...subStepsValue,
        sub_step: subStepsKey as FormSubStepsEnum,
      })),
    }));
  }, [formStepper]);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        p: '0 20px',
      }}
    >
      {formattedStepsConfig ? (
        <>
          {formattedStepsConfig.map((item) => (
            <FormStepper
              key={item.step}
              isDisabled={item.isDisabled}
              handleSelectStep={handleSelectStep}
              isSelected={item.isSelected}
              step={item.step}
              step_id={item.step_id}
              subSteps={item.sub_steps}
              label={item.label}
            />
          ))}
        </>
      ) : (
        <></>
      )}
    </Box>
  );
};

export default CreateGarageItemStepper;

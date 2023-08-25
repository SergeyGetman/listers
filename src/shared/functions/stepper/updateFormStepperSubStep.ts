import { FormStepsEnum, FormSubStepsEnum } from '../../enums/formSteps.enum';
import { FormStepperModel, FormStepperSubStepModel } from '../../models/formStepper.model';

export const updateFormStepperSubStep = ({
  stepKey,
  subStepKey,
  formStepper,
  subStep,
}: {
  stepKey: FormStepsEnum;
  subStepKey: FormSubStepsEnum;
  formStepper: FormStepperModel;
  subStep: FormStepperSubStepModel;
}): FormStepperModel => {
  return {
    ...formStepper,
    [stepKey]: {
      ...formStepper[stepKey],
      sub_steps: {
        ...formStepper[stepKey].sub_steps,
        [subStepKey]: {
          ...formStepper[stepKey].sub_steps[subStepKey],
          ...subStep,
          is_filled: !!subStep.is_filled,
        },
      },
    },
  };
};

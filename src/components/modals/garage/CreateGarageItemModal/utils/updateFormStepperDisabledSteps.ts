import { FormStepsEnum, FormSubStepsEnum } from '../../../../../shared/enums/formSteps.enum';
import { FormStepperModel, FormStepperSubStepModel } from '../../../../../shared/models/formStepper.model';

export const updateFormStepperDisabledSteps = (stepper: FormStepperModel): FormStepperModel => {
  const isFilledSubSteps = {
    [FormStepsEnum.step_first]:
      stepper[FormStepsEnum.step_first].sub_steps[FormSubStepsEnum.sub_step_first].is_filled,
    [FormStepsEnum.step_second]:
      stepper[FormStepsEnum.step_second].sub_steps[FormSubStepsEnum.sub_step_first].is_filled,
    [FormStepsEnum.step_third]:
      stepper[FormStepsEnum.step_third].sub_steps[FormSubStepsEnum.sub_step_first].is_filled,
    [FormStepsEnum.step_fourth]:
      stepper[FormStepsEnum.step_third].sub_steps[FormSubStepsEnum.sub_step_first].is_filled,
    [FormStepsEnum.step_fifth]:
      stepper[FormStepsEnum.step_fifth].sub_steps[FormSubStepsEnum.sub_step_first].is_filled,
  };
  return Object.entries(stepper).reduce((acc, [stepId, step], stepIndex) => {
    acc[stepId] = {
      ...step,
      isDisabled: stepIndex !== 0 && !isFilledSubSteps[FormStepsEnum.step_first],
      sub_steps: Object.entries(step.sub_steps).reduce(
        (subStepsAcc, [subStepId, sub_steps], subStepIndex) => {
          subStepsAcc[subStepId] = {
            ...sub_steps,
            isDisabled:
              subStepIndex === 0
                ? stepId === FormStepsEnum.step_first
                  ? false
                  : !isFilledSubSteps[FormStepsEnum.step_first]
                : !isFilledSubSteps[stepId as FormStepsEnum],
          };
          return subStepsAcc;
        },
        {} as Record<string, FormStepperSubStepModel>,
      ),
    };

    return acc;
  }, {} as FormStepperModel);
};

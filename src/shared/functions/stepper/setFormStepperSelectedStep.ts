import { FormStepperModel, FormStepperSubStepModel } from '../../models/formStepper.model';
import { FormStepsEnum, FormSubStepsEnum } from '../../enums/formSteps.enum';

export const setFormStepperSelectedStep = (
  stepKey: FormStepsEnum,
  formStepper: FormStepperModel,
  subStepKey?: FormSubStepsEnum,
): FormStepperModel => {
  return Object.keys(formStepper).reduce((acc, stepId) => {
    const step = formStepper[stepId];
    if (stepId === stepKey) {
      acc[stepId] = {
        ...step,
        isSelected: true,
        sub_steps:
          step.isSelected && !subStepKey
            ? step.sub_steps
            : Object.keys(step.sub_steps).reduce((subStepsAcc, subStepId, index) => {
                subStepsAcc[subStepId] = {
                  ...step.sub_steps[subStepId],
                  isSelected: subStepKey ? subStepId === subStepKey : index === 0,
                };
                return subStepsAcc;
              }, {} as Record<string, FormStepperSubStepModel>),
      };
    } else {
      acc[stepId] = {
        ...step,
        isSelected: false,
        sub_steps: Object.keys(step.sub_steps).reduce((subStepsAcc, subStepId) => {
          subStepsAcc[subStepId] = {
            ...step.sub_steps[subStepId],
            isSelected: false,
          };
          return subStepsAcc;
        }, {} as Record<string, FormStepperSubStepModel>),
      };
    }
    return acc;
  }, {} as FormStepperModel);
};

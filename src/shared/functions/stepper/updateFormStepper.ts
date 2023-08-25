import {
  FormStepperModel,
  FormStepperSubStepModel,
  ResponseFormStepperModel,
} from '../../models/formStepper.model';

export const updateFormStepper = ({
  newStepper,
  formStepper,
}: {
  newStepper: ResponseFormStepperModel;
  formStepper: FormStepperModel;
}): FormStepperModel => {
  const mergedFormStepperModel: FormStepperModel = { ...formStepper };

  Object.keys(newStepper).forEach((key) => {
    if (key in mergedFormStepperModel) {
      const responseStep = newStepper[key];
      const mergedSubSteps: Record<string, FormStepperSubStepModel> = {};
      Object.keys(responseStep.sub_steps).forEach((subStepKey) => {
        const subStep = responseStep.sub_steps[subStepKey];
        if (subStep !== null) {
          mergedSubSteps[subStepKey] = { ...mergedFormStepperModel[key].sub_steps[subStepKey], ...subStep };
        }
      });

      mergedFormStepperModel[key].sub_steps = { ...mergedFormStepperModel[key].sub_steps, ...mergedSubSteps };
    }
  });

  return mergedFormStepperModel;
};

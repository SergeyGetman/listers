import { FormStepsEnum, FormSubStepsEnum } from '../../../../../shared/enums/formSteps.enum';
import { FormStepperModel } from '../../../../../shared/models/formStepper.model';
// TODO LOCALIZE
export const initialStepper: FormStepperModel = {
  [FormStepsEnum.step_first]: {
    isSelected: true,
    isDisabled: false,
    label: 'General Information',
    step_id: 1,
    sub_steps: {
      [FormSubStepsEnum.sub_step_first]: {
        isSelected: true,
        is_filled: false,
        isDisabled: false,
      },
      [FormSubStepsEnum.sub_step_second]: {
        isSelected: false,
        is_filled: false,
        isDisabled: false,
      },
      [FormSubStepsEnum.sub_step_third]: {
        isSelected: false,
        is_filled: false,
        isDisabled: false,
      },
      [FormSubStepsEnum.sub_step_fourth]: {
        isSelected: false,
        is_filled: false,
        isDisabled: false,
      },
    },
  },
  [FormStepsEnum.step_second]: {
    isSelected: false,
    isDisabled: false,
    step_id: 2,
    label: 'Insurance',
    sub_steps: {
      [FormSubStepsEnum.sub_step_first]: {
        isSelected: false,
        is_filled: false,
        isDisabled: false,
      },
      [FormSubStepsEnum.sub_step_second]: {
        isSelected: false,
        is_filled: false,
        isDisabled: false,
      },
      [FormSubStepsEnum.sub_step_third]: {
        isSelected: false,
        is_filled: false,
        isDisabled: false,
      },
      [FormSubStepsEnum.sub_step_fourth]: {
        isSelected: false,
        is_filled: false,
        isDisabled: false,
      },
    },
  },
  [FormStepsEnum.step_third]: {
    isSelected: false,
    isDisabled: false,
    label: 'LP Registration',
    step_id: 3,
    sub_steps: {
      [FormSubStepsEnum.sub_step_first]: {
        isSelected: false,
        is_filled: false,
        isDisabled: false,
      },
      [FormSubStepsEnum.sub_step_second]: {
        isSelected: false,
        is_filled: false,
        isDisabled: false,
      },
      [FormSubStepsEnum.sub_step_third]: {
        isSelected: false,
        is_filled: false,
        isDisabled: false,
      },
      [FormSubStepsEnum.sub_step_fourth]: {
        isSelected: false,
        is_filled: false,
        isDisabled: false,
      },
    },
  },
  [FormStepsEnum.step_fourth]: {
    isSelected: false,
    isDisabled: false,

    label: 'Vehicle Registration',
    step_id: 4,
    sub_steps: {
      [FormSubStepsEnum.sub_step_first]: {
        isSelected: false,
        is_filled: false,
        isDisabled: false,
      },
      [FormSubStepsEnum.sub_step_second]: {
        isSelected: false,
        is_filled: false,
        isDisabled: false,
      },
      [FormSubStepsEnum.sub_step_third]: {
        isSelected: false,
        is_filled: false,
        isDisabled: false,
      },
      [FormSubStepsEnum.sub_step_fourth]: {
        isSelected: false,
        is_filled: false,
        isDisabled: false,
      },
    },
  },
  [FormStepsEnum.step_fifth]: {
    isSelected: false,
    isDisabled: false,
    label: 'Gallery',
    step_id: 5,
    sub_steps: {
      [FormSubStepsEnum.sub_step_first]: {
        isSelected: false,
        is_filled: false,
        isDisabled: false,
      },
    },
  },
};

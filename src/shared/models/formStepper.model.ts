export interface FormStepperSubStepModel {
  isSelected: boolean;
  is_filled: boolean;
  isDisabled?: boolean;
}

export interface FormStepperStepModel {
  isSelected: boolean;
  isDisabled?: boolean;
  step_id: number;
  label: string;
  sub_steps: Record<string, FormStepperSubStepModel>;
}

export type FormStepperModel = Record<string, FormStepperStepModel>;

export type ResponseFormStepperModel = Record<
  string,
  FormStepperStepModel & { sub_steps: Record<string, FormStepperSubStepModel | null> }
>;

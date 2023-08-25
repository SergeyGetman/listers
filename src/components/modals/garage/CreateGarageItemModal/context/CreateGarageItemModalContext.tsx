import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { FormStepsEnum, FormSubStepsEnum } from '../../../../../shared/enums/formSteps.enum';
import {
  FormStepperModel,
  FormStepperSubStepModel,
  ResponseFormStepperModel,
} from '../../../../../shared/models/formStepper.model';
import { setFormStepperSelectedStep } from '../../../../../shared/functions/stepper/setFormStepperSelectedStep';
import { initialStepper } from '../data/initialStepper';
import { updateFormStepperDisabledSteps } from '../utils/updateFormStepperDisabledSteps';
import { updateFormStepperSubStep } from '../../../../../shared/functions/stepper/updateFormStepperSubStep';
import { updateFormStepper } from '../../../../../shared/functions/stepper/updateFormStepper';
import { TransportTypeEnum } from '../../../../../shared/enums/garage.enums';

export type CreateGarageItemModalContextType = {
  formStepper: FormStepperModel;
  currentStep: FormStepsEnum;
  currentSubStep: FormSubStepsEnum;
  isChangedCurrentForm: boolean;
  isValidCurrentForm: boolean;
  transportId: number | null;
  handleUpdateFormStepperSubStep: (props: {
    stepKey: FormStepsEnum;
    subStepKey: FormSubStepsEnum;
    subStep: FormStepperSubStepModel;
  }) => void;
  handleUpdateFormStepper: (props: { newStepper: any }) => void;
  handleSetTransportId: (val: number) => void;
  handleSetIsCurrentFormChange: (val: boolean) => void;
  handleSetIsCurrentFormValid: (val: boolean) => void;
  handleFormSubmit: () => Promise<void>;
  setHandleFormSubmitFunction: (func: () => () => Promise<void>) => void;
  handleNavigate: (props: { stepKey: FormStepsEnum; subStepKey?: FormSubStepsEnum }) => void;
  transportType: TransportTypeEnum;
  handleUpdateFormStepperGarageStep: FormStepsEnum;
};

const CreateGarageItemModalContext = createContext<CreateGarageItemModalContextType | null>(null);

export const useCreateGarageItemModalContext = () =>
  useContext(CreateGarageItemModalContext) as CreateGarageItemModalContextType;

type CreateGarageItemModalContextProviderProps = {
  children: React.ReactNode;
};

export const CreateGarageItemModalContextProvider: React.FC<CreateGarageItemModalContextProviderProps> = ({
  children,
}) => {
  const [formStepper, setFormStepper] = useState<FormStepperModel>(initialStepper);
  const [handleFormSubmit, setHandleFormSubmit] = useState<() => Promise<void>>(() => Promise.resolve());
  const [currentStep, setCurrentStep] = useState<FormStepsEnum>(FormStepsEnum.step_first);
  const [currentSubStep, setCurrentSubStep] = useState<FormSubStepsEnum>(FormSubStepsEnum.sub_step_second);
  const [isChangedCurrentForm, setIsChangedCurrentForm] = useState<boolean>(false);
  const [isValidCurrentForm, setIsValidCurrentForm] = useState<boolean>(false);
  const [transportId, setTransportId] = useState<number | null>(null);
  const [transportType] = useState<TransportTypeEnum>(TransportTypeEnum.car);
  const [stepGarage] = useState<any>(FormStepsEnum);

  const handleSetTransportId = useCallback((val: number) => {
    setTransportId(val);
  }, []);
  const handleSetIsCurrentFormChange = useCallback((val: boolean) => {
    setIsChangedCurrentForm(val);
  }, []);

  const handleSetIsCurrentFormValid = useCallback((val: boolean) => {
    setIsValidCurrentForm(val);
  }, []);

  const setHandleFormSubmitFunction = useCallback((func: () => () => Promise<void>) => {
    setHandleFormSubmit(func);
  }, []);

  const handleUpdateFormStepperSubStep = useCallback(
    ({
      stepKey,
      subStepKey,
      subStep,
    }: {
      stepKey: FormStepsEnum;
      subStepKey: FormSubStepsEnum;
      subStep: FormStepperSubStepModel;
    }) => {
      setFormStepper((prevState) => {
        return updateFormStepperDisabledSteps(
          updateFormStepperSubStep({ stepKey, subStepKey, formStepper: prevState, subStep }),
        );
      });
    },
    [],
  );

  const handleUpdateFormStepper = useCallback(({ newStepper }: { newStepper: ResponseFormStepperModel }) => {
    setFormStepper((prevState) => {
      return updateFormStepperDisabledSteps(updateFormStepper({ newStepper, formStepper: prevState }));
    });
  }, []);

  const handleNavigate = useCallback(
    ({ stepKey, subStepKey }: { stepKey: FormStepsEnum; subStepKey?: FormSubStepsEnum }) => {
      setFormStepper((prevState) => setFormStepperSelectedStep(stepKey, prevState, subStepKey));
      setCurrentSubStep(
        subStepKey ? subStepKey : currentStep === stepKey ? currentSubStep : FormSubStepsEnum.sub_step_first,
      );
      setCurrentStep(stepKey);
    },
    [currentStep, currentSubStep],
  );

  const contextValue = useMemo(
    () => ({
      formStepper,
      currentStep,
      currentSubStep,
      transportType,
      isChangedCurrentForm,
      isValidCurrentForm,
      transportId,
      handleSetTransportId,
      handleUpdateFormStepperSubStep,
      handleUpdateFormStepper,
      handleSetIsCurrentFormChange,
      handleSetIsCurrentFormValid,
      handleNavigate,
      setHandleFormSubmitFunction,
      stepGarage,
      handleUpdateFormStepperGarageStep: stepGarage,
      handleFormSubmit,
    }),
    [
      formStepper,
      currentStep,
      currentSubStep,
      transportType,
      isChangedCurrentForm,
      isValidCurrentForm,
      transportId,
      handleSetTransportId,
      handleUpdateFormStepperSubStep,
      handleUpdateFormStepper,
      handleSetIsCurrentFormChange,
      handleSetIsCurrentFormValid,
      handleNavigate,
      setHandleFormSubmitFunction,
      stepGarage,
      handleFormSubmit,
    ],
  );

  return (
    <CreateGarageItemModalContext.Provider value={contextValue}>
      {children}
    </CreateGarageItemModalContext.Provider>
  );
};

/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Skeleton } from '@mui/lab';
import FormSubStepContainer from '../../../../../../../../containers/FormSubStepContainer';
import { ReactComponent as ArrowRight } from '../../../../../../../../../assets/Images/arrow-right.svg';
import { FormStepsEnum, FormSubStepsEnum } from '../../../../../../../../../shared/enums/formSteps.enum';
import { TransportTypeEnum } from '../../../../../../../../../shared/enums/garage.enums';
import MainInformationFormContainer from '../../../../../../../../formContainers/garage/generalInformation/MainInformationFormContainer';
import { useCreateGarageItemModalContext } from '../../../../../context/CreateGarageItemModalContext';
import {
  createNewTransport,
  getFirstStepFirstSubStep,
} from '../../../../../../../../../store/garage/garageThunk';
import errorsHandler from '../../../../../../../../../shared/functions/errorsHandler';
import { useAppDispatch } from '../../../../../../../../../shared/hooks/redux';
import { validation } from './validation';
import { FormType } from './types';
import { formatFormDataForRequest } from './utils';
import { getSelectOption } from '../../../../../../../../../shared/utils/generateSelectOptions';

type FirstSubStepProps = {
  handleSelectStep: (step: FormStepsEnum, subStepId?: FormSubStepsEnum) => void;
  transportType: TransportTypeEnum;
};

const FirstSubStep: FC<FirstSubStepProps> = ({ handleSelectStep, transportType }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [isLoadingDraftStep, setIsLoadingDraftStep] = useState<boolean>(false);
  const {
    transportId,
    formStepper,
    setHandleFormSubmitFunction,
    handleSetIsCurrentFormChange,
    handleSetIsCurrentFormValid,
    handleSetTransportId,
    handleUpdateFormStepperSubStep,
  } = useCreateGarageItemModalContext();

  const selectStepHandler = (step: FormStepsEnum, subStepId?: FormSubStepsEnum) => {
    handleSelectStep(step, subStepId);
  };

  const initialValue = {
    transport_type: transportType,
    year: null,
    make: null,
    model: null,
    style: null,
    trim: null,
    body: null,
    exterior_color: null,
    interior_color: null,
  };

  const {
    control,
    setValue,
    handleSubmit,
    formState: { isDirty, isValid },
    setError,
    reset,
  } = useForm<FormType>({
    defaultValues: initialValue,
    resolver: yupResolver(validation),
  });

  useEffect(() => {
    if (
      transportId &&
      formStepper[FormStepsEnum.step_first].sub_steps[FormSubStepsEnum.sub_step_first].is_filled
    ) {
      setIsLoadingDraftStep(true);
      dispatch(getFirstStepFirstSubStep(transportId)).then((result) => {
        if (getFirstStepFirstSubStep.fulfilled.match(result)) {
          reset({
            year: getSelectOption(result.payload.year, 'garage.transportType'),
            make: getSelectOption(result.payload.make, 'garage.make'),
            model: getSelectOption(result.payload.model, 'garage.model'),
          });
          setIsLoadingDraftStep(false);
        }
      });
    }
  }, [
    transportId,
    formStepper[FormStepsEnum.step_first].sub_steps[FormSubStepsEnum.sub_step_first].is_filled,
  ]);

  useEffect(() => {
    handleSetIsCurrentFormChange(isDirty);
  }, [isDirty]);

  useEffect(() => {
    handleSetIsCurrentFormValid(isValid);
  }, [isValid]);

  const onSubmit = (formData: FormType, resolve?: (value: any) => void, reject?: (value: any) => void) => {
    const formattedValue = formatFormDataForRequest(formData);

    dispatch(createNewTransport(formattedValue)).then((result) => {
      if (createNewTransport.fulfilled.match(result)) {
        handleSetTransportId(result.payload.id);
        handleUpdateFormStepperSubStep({
          stepKey: FormStepsEnum.step_first,
          subStepKey: FormSubStepsEnum.sub_step_first,
          subStep: result.payload.steps.step_first.sub_steps.sub_step_first,
        });
        if (resolve) {
          resolve(result);
        } else {
          selectStepHandler(FormStepsEnum.step_first, FormSubStepsEnum.sub_step_second);
        }
      } else {
        errorsHandler(result, setError);
        if (reject) {
          reject(result);
        }
      }
    });
  };

  const handleNextStepClick = () => {
    handleSubmit((form: FormType) => onSubmit(form))();
  };

  const handleSubmitWithPromise = () => {
    return new Promise<void>((resolve, reject) => {
      handleSubmit((form: FormType) => onSubmit(form, resolve, reject))();
    });
  };

  useEffect(() => {
    setHandleFormSubmitFunction(() => handleSubmitWithPromise);
  }, []);

  return (
    <FormSubStepContainer
      nextBtnProps={{
        isShow: true,
        label: t('general.buttons.next'),
        endIcon: <ArrowRight />,
        onClick: () => handleNextStepClick(),
      }}
    >
      {isLoadingDraftStep ? (
        <Skeleton height={380} variant="rectangular" />
      ) : (
        <MainInformationFormContainer control={control} setValue={setValue} transportType={transportType} />
      )}
    </FormSubStepContainer>
  );
};

export default FirstSubStep;

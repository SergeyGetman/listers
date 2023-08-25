import React, { FC, useMemo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';
import { Skeleton } from '@mui/lab';
import CreateItemModalHeader from '../../../../../headers/CreateItemModalHeader';
import {
  StyledCreateGarageContent,
  StyledCreateGarageContentContainer,
  StyledCreateGarageItemContainer,
} from './CreateGarageItemContainer.style';
import CreateGarageItemStepper from '../CreateGarageItemStepper';
import GeneralInfoStep from '../steps/GeneralInfoStep';
import InsuranceStep from '../steps/InsuranceStep';
import LPRegistrationStep from '../steps/LPRegistrationStep';
import VehicleRegistrationStep from '../steps/VehicleRegistrationStep';
import GalleryStep from '../steps/GalleryStep';
import { FormStepsEnum, FormSubStepsEnum } from '../../../../../../shared/enums/formSteps.enum';
import { TransportTypeEnum } from '../../../../../../shared/enums/garage.enums';
import { useCreateGarageItemModalContext } from '../../context/CreateGarageItemModalContext';
import { NotificationService } from '../../../../../../shared/services/notifications/SnackbarUtilsConfigurator/SnackbarUtilsConfigurator';

type CreateGarageItemContainerProps = {
  transportType: TransportTypeEnum;
  onClose: (progress: string | number) => void;
};

const CreateGarageItemContainer: FC<CreateGarageItemContainerProps> = ({
  transportType = TransportTypeEnum.car,
  onClose,
}) => {
  const [isLoadingDraftTransport] = useState<boolean>(false);

  const { t } = useTranslation();

  const {
    handleFormSubmit,
    currentStep,
    currentSubStep,
    handleNavigate,
    formStepper,
    isValidCurrentForm,
    isChangedCurrentForm,
  } = useCreateGarageItemModalContext();

  const handleCloseModal = () => {
    onClose(5);
  };
  const handlePublish = () => {
    if (isValidCurrentForm && isChangedCurrentForm) {
      handleFormSubmit()
        .then(() => {
          NotificationService.success(t('general.notifications.transportCreated'));
        })
        .catch(() => {
          NotificationService.error(t('general.notifications.transportCreated'));
        });
    }
  };
  // useEffect(() => {
  //   setIsLoadingDraftTransport(true);
  //
  //   handleSetTransportId(30);
  //   dispatch(getDraftedTransport(30)).then((result) => {
  //     if (getDraftedTransport.fulfilled.match(result)) {
  //       handleUpdateFormStepper({ newStepper: result.payload.steps });
  //       setIsLoadingDraftTransport(false);
  //     }
  //   });
  // }, [dispatch, handleSetTransportId, handleUpdateFormStepper]);

  const handleSelectStep = useCallback(
    (step: FormStepsEnum, subStepId?: FormSubStepsEnum) => {
      handleNavigate({ stepKey: step, subStepKey: subStepId });
    },
    [handleNavigate],
  );

  const content = useMemo(() => {
    switch (currentStep) {
      case FormStepsEnum.step_first:
        return (
          <GeneralInfoStep
            currentSubStep={currentSubStep}
            transportType={transportType}
            handleSelectStep={handleSelectStep}
          />
        );
      case FormStepsEnum.step_second:
        return <InsuranceStep currentSubStep={currentSubStep} handleSelectStep={handleSelectStep} />;
      case FormStepsEnum.step_third:
        return <LPRegistrationStep currentSubStep={currentSubStep} handleSelectStep={handleSelectStep} />;
      case FormStepsEnum.step_fourth:
        return (
          <VehicleRegistrationStep currentSubStep={currentSubStep} handleSelectStep={handleSelectStep} />
        );
      case FormStepsEnum.step_fifth:
        return <GalleryStep currentSubStep={currentSubStep} handleSelectStep={handleSelectStep} />;
      default:
        return <></>;
    }
  }, [currentStep, handleSelectStep, transportType, currentSubStep]);
  return (
    <StyledCreateGarageItemContainer>
      {isLoadingDraftTransport ? (
        <>
          <Skeleton height={66} variant="rectangular" />
          <StyledCreateGarageContentContainer>
            <StyledCreateGarageContent>
              <Skeleton height={62} variant="rectangular" />
              <Box sx={{ mt: '14px', height: '100%', overflow: 'scroll', p: '10px 20px 200px 20px' }}>
                <Skeleton height={380} variant="rectangular" />
              </Box>
            </StyledCreateGarageContent>
          </StyledCreateGarageContentContainer>
        </>
      ) : (
        <>
          <CreateItemModalHeader
            handleCancel={handleCloseModal}
            isDisabledConfirmBtn={false}
            handleConfirm={handlePublish}
            title={t('general.addNew', {
              item: transportType ? t(`garage.transportType.${transportType}`) : '',
            })}
          />
          <StyledCreateGarageContentContainer>
            <StyledCreateGarageContent>
              <CreateGarageItemStepper formStepper={formStepper} handleSelectStep={handleSelectStep} />
              <Box sx={{ mt: '14px', height: '100%', overflow: 'scroll', p: '10px 20px 200px 20px' }}>
                {content}
              </Box>
            </StyledCreateGarageContent>
          </StyledCreateGarageContentContainer>
        </>
      )}
    </StyledCreateGarageItemContainer>
  );
};

export default CreateGarageItemContainer;

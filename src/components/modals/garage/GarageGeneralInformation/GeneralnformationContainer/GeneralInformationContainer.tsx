import React, { FC, useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { EditorState } from 'draft-js';
import MuiDefaultDrawerHeader from '../../../../modalsElements/containers/MuiDrawer/MuiDrawersHeders/MuiDefaultDrawerHeader';
import ModalFooter from '../../../../modalsElements/containers/Footer/ModalFooter';
import GarageGeneralInformationMainBlock from './Main';
import { MediaType } from '../../../../../shared/models/media.model';
import { OptionType } from '../../../../formElements/MuiSelect/MuiSelect';
import GarageGeneralInformationDescriptionBlock from './LicensePlate';
import DescriptionContainer from '../../../../formContainers/DescriptionContainer';
import DocumentsContainer from '../../../../viewContainers/DocumentsContainer';
import { TransportTypeEnum } from '../../../../../shared/enums/garage.enums';
import { garageGeneraInformationFormYupResolver } from '../GarageGeneraInformationFormYupResolver';
import { useAppDispatch } from '../../../../../shared/hooks/redux';
import { createTransport, editTransport } from '../../../../../store/garage/garageThunk';
import {
  garageGeneralInfoFormToRequest,
  garageGeneralInformationDataToForm,
} from '../garageGeneralInfoModalUtils';
import { NotificationService } from '../../../../../shared/services/notifications/SnackbarUtilsConfigurator/SnackbarUtilsConfigurator';
import errorsHandler from '../../../../../shared/functions/errorsHandler';
import { TransportItemModel } from '../../../../../shared/models/garage.model';
import { GeneralInformationContainerForm } from './GeneralInformationContainer.style';
import { DocumentsEntityTypeEnum } from '../../../../../shared/enums/documentEntityType.enum';

type Props = {
  onClose: (isSkip?: boolean) => void;
  data?: TransportItemModel;
  setIsShowUnsavedDataModal: (value: boolean) => void;
};

type SelectType = OptionType | null;

export type TransportGeneralInformationForm = {
  transport_type: SelectType;
  year: SelectType;
  make: SelectType;
  model: SelectType;
  style: SelectType;
  trim: SelectType;
  body: SelectType;
  description: any;
  exterior_color: SelectType;
  interior_color: SelectType;
  fuel_type: SelectType;
  hybrid_type: SelectType;
  engine_type: string;
  transmission: SelectType;
  country_of_assembly: string;
  mileage: string;
  drivetrain: string;
  state_on_license_plate: string;
  license_plate: string;
  purchase: string;
  vin: string;
  documents: MediaType[];
};

const GeneralInformationContainer: FC<Props> = ({ onClose, data, setIsShowUnsavedDataModal }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const initialValue = {
    transport_type: null,
    year: null,
    make: null,
    model: null,
    style: null,
    trim: null,
    body: null,
    description: EditorState.createEmpty(),
    exterior_color: null,
    interior_color: null,
    fuel_type: null,
    hybrid_type: null,
    engine_type: '',
    transmission: null,
    country_of_assembly: '',
    mileage: '',
    drivetrain: '',
    state_on_license_plate: '',
    license_plate: '',
    purchase: '',
    vin: '',
    documents: [],
  };

  const {
    handleSubmit,
    watch,
    control,
    setValue,
    setError,
    reset,
    formState: { isDirty },
  } = useForm<TransportGeneralInformationForm>({
    defaultValues: initialValue,
    resolver: yupResolver(garageGeneraInformationFormYupResolver),
  });

  const [isLoading, setIsLoading] = useState(false);

  const changedTransportType = (transportType: OptionType) => {
    setValue('model', initialValue.model);
    setValue('make', initialValue.make);
    setValue('body', initialValue.body);
    setValue('style', initialValue.style);

    if (transportType === null) {
      setValue('trim', initialValue.trim);
      setValue('interior_color', initialValue.interior_color);
      setValue('fuel_type', initialValue.fuel_type);
      setValue('mileage', initialValue.mileage);
      setValue('mileage', initialValue.mileage);
      setValue('mileage', initialValue.mileage);
      return;
    }
    if (transportType.value === TransportTypeEnum.motorcycle) {
      setValue('trim', initialValue.trim);
      setValue('interior_color', initialValue.interior_color);
      return;
    }
    if (
      transportType.value !== TransportTypeEnum.motorcycle &&
      transportType.value !== TransportTypeEnum.car
    ) {
      setValue('make', initialValue.make);
      setValue('model', initialValue.model);
      setValue('trim', initialValue.trim);
      setValue('interior_color', initialValue.interior_color);
      setValue('fuel_type', initialValue.fuel_type);
      setValue('mileage', initialValue.mileage);
      setValue('drivetrain', initialValue.drivetrain);
    }
  };

  const changedMake = () => {
    setValue('model', initialValue.model);
  };

  const onSubmit = (formData: TransportGeneralInformationForm) => {
    setIsLoading(true);
    if (data) {
      dispatch(editTransport({ data: garageGeneralInfoFormToRequest(formData), id: data.id })).then(
        (result) => {
          if (editTransport.fulfilled.match(result)) {
            NotificationService.success(t('general.notifications.transportCreated'));
            onClose(true);
            reset();
          } else {
            errorsHandler(result, setError);
          }
          setIsLoading(false);
        },
      );
    } else {
      dispatch(createTransport(garageGeneralInfoFormToRequest(formData))).then((result) => {
        if (createTransport.fulfilled.match(result)) {
          NotificationService.success(t('general.notifications.transportCreated'));
          onClose(true);
          reset();
        } else {
          errorsHandler(result, setError);
        }
        setIsLoading(false);
      });
    }
  };

  useEffect(() => {
    if (data) {
      reset(garageGeneralInformationDataToForm(data) as TransportGeneralInformationForm);
    }
  }, [data, reset]);

  useEffect(() => {
    setIsShowUnsavedDataModal(isDirty);
  }, [isDirty, setIsShowUnsavedDataModal]);

  return (
    <GeneralInformationContainerForm onSubmit={handleSubmit(onSubmit)}>
      <MuiDefaultDrawerHeader
        isEditMode={!!data}
        onClose={onClose}
        title={t('general.header.generalInformation')}
      />

      <Box
        sx={{
          flexGrow: 1,
          p: '0 10px 50px 10px',
        }}
      >
        <Box sx={{ pt: '20px' }}>
          <GarageGeneralInformationMainBlock
            control={control}
            watch={watch}
            changedTransportType={changedTransportType}
            changedMake={changedMake}
          />
        </Box>
        <Box sx={{ pt: '30px' }}>
          <GarageGeneralInformationDescriptionBlock control={control} />
        </Box>
        <Box sx={{ pt: '30px' }}>
          <DescriptionContainer
            name="description"
            control={control}
            isDefaultExpand
            title={t('general.containers.description')}
            placeholder={t('general.placeholders.write_vehicle_description')}
            isDisabledExpand
          />
        </Box>
        <Box sx={{ mt: '30px' }}>
          <DocumentsContainer
            entityType={DocumentsEntityTypeEnum.transport_document}
            files={watch('documents')}
            onAddMedia={(files) => setValue('documents', files)}
            placeholder={t('general.placeholders.add_documents')}
            isCounter={false}
            isContentInformation={false}
            isDisabledExpand
          />
        </Box>
      </Box>
      <ModalFooter
        isShow
        middleBtnProps={{
          isShow: true,
          label: t('general.buttons.cancel'),
          onClick: () => onClose(),
        }}
        rightBtnProps={{
          isShow: true,
          isStopPropagation: false,
          // TODO loading
          loading: isLoading,
          label: t('general.buttons.save'),
          variant: 'contained',
          isLoadingBtn: true,
          type: 'submit',
        }}
      />
    </GeneralInformationContainerForm>
  );
};

export default GeneralInformationContainer;

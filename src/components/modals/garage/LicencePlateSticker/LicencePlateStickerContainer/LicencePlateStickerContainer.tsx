import React, { FC, useEffect, useMemo, useState } from 'react';
import { Box } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import MuiDefaultDrawerHeader from '../../../../modalsElements/containers/MuiDrawer/MuiDrawersHeders/MuiDefaultDrawerHeader';
import ModalFooter from '../../../../modalsElements/containers/Footer/ModalFooter';
import LicencePlateStickerMainBlock from './components/Main';
import { MediaType } from '../../../../../shared/models/media.model';
import StickerRenewOnlineBlock from '../../components/RenewOnline';
import LicencePlateStickerFeeBlock from './components/Fee';
import LicencePlateStickerResidentBlock from './components/Resident';
import DocumentsContainer from '../../../../viewContainers/DocumentsContainer';
import { OptionType } from '../../../../formElements/MuiSelect/MuiSelect';
import { transportLicenseSchema } from './schema';
import { useAppDispatch, useAppSelector } from '../../../../../shared/hooks/redux';
import { transportLicenseFormToRequest, transportLicenseRequestToForm } from './utils';
import { createTransportLicense, editTransportLicense } from '../../../../../store/garage/garageThunk';
import errorsHandler from '../../../../../shared/functions/errorsHandler';
import { TransportLicenseModel } from '../../../../../shared/models/garage.model';
import { LicencePlateStickerContainerForm } from './LicencePlateStickerContainer.style';
import { DocumentsEntityTypeEnum } from '../../../../../shared/enums/documentEntityType.enum';
import { PackageEnum } from '../../../../../shared/enums/package.enum';
import { ModalNamesEnum } from '../../../../../shared/enums/modalNames.enum';
import modalObserver from '../../../../../shared/utils/observers/modalObserver';

type Props = {
  onClose: (skipModal?: boolean) => void;
  data?: TransportLicenseModel;
  setIsShowUnsavedDataModal: (isDirty: boolean) => void;
  transportId: string;
};

export type FormStickerLicenseValues = {
  purchase_date: Date | null;
  transport_id: number | null;
  expiration: {
    date: Date | null;
    is_notify: boolean;
  };
  registration_id: string | null;
  pin_code: string;
  renewal_fee: number | null;
  late_fee: number | null;
  administrative_fee: number | null;
  renew: string;
  login: string;
  password: string;
  name: OptionType | null;
  address: { map: { lat: number | null; lng: number | null }; address: string | null };
  state: OptionType | null;
  county: OptionType | null;
  documents: MediaType[];
  id?: number;
};

const defaultValues: FormStickerLicenseValues = {
  purchase_date: null,
  transport_id: null,
  expiration: {
    date: null,
    is_notify: false,
  },
  registration_id: null,
  pin_code: '',
  renewal_fee: null,
  late_fee: null,
  administrative_fee: null,
  renew: '',
  login: '',
  password: '',
  name: null,
  address: {
    map: { lat: null, lng: null },
    address: null,
  },
  state: null,
  county: null,
  documents: [],
};

const LicencePlateStickerContainer: FC<Props> = ({
  onClose,
  data,
  setIsShowUnsavedDataModal,
  transportId,
}) => {
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);
  const profile = useAppSelector((state) => state.profile.data);

  const isPackageRight = useMemo(() => {
    return profile?.subscription?.package === PackageEnum.premium;
  }, [profile?.subscription?.package]);
  const handleOpenUpgradePackageModal = () => {
    modalObserver.addModal(ModalNamesEnum.purchaseModal, {
      props: { isPlatinum: true },
    });
  };

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    setError,
    reset,
    formState: { isDirty },
  } = useForm<FormStickerLicenseValues>({
    defaultValues,
    resolver: yupResolver(transportLicenseSchema),
  });
  const { t } = useTranslation();
  const onSubmit = (form: FormStickerLicenseValues) => {
    if (data) {
      if (transportId) {
        dispatch(editTransportLicense({ data: transportLicenseFormToRequest(form), id: form.id as number }))
          .then((result) => {
            if (editTransportLicense.fulfilled.match(result)) {
              setLoading(false);
              onClose(true);
            } else {
              errorsHandler(result, setError);
            }
          })
          .finally(() => {
            setLoading(false);
          });
      }
    } else {
      if (transportId) {
        setLoading(true);
        dispatch(
          createTransportLicense({ ...transportLicenseFormToRequest(form), transport_id: +transportId }),
        )
          .then((result) => {
            if (createTransportLicense.fulfilled.match(result)) {
              setLoading(false);
              onClose(true);
            } else {
              errorsHandler(result, setError);
            }
          })
          .finally(() => {
            setLoading(false);
          });
      }
    }
  };

  const handleChangeState = () => {
    setValue('county', defaultValues.county);
  };
  const handleChangePurchaseDate = () => {
    setValue('expiration.date', defaultValues.expiration.date);
  };

  useEffect(() => {
    if (data) {
      reset(transportLicenseRequestToForm(data));
    }
  }, [data, reset]);

  useEffect(() => {
    setIsShowUnsavedDataModal(isDirty);
  }, [isDirty, setIsShowUnsavedDataModal]);

  return (
    <LicencePlateStickerContainerForm onSubmit={handleSubmit(onSubmit)}>
      <MuiDefaultDrawerHeader
        isUpgradeToGold={false}
        isShowUpgradePackagesBtn={!isPackageRight}
        handleClickUpgradePackage={handleOpenUpgradePackageModal}
        onClose={onClose}
        title={t('general.containers.licencePlateSticker')}
      />
      <Box sx={{ flexGrow: 1, p: '20px 10px 50px 10px' }}>
        <LicencePlateStickerMainBlock
          control={control}
          watch={watch}
          handleChangePurchaseDate={handleChangePurchaseDate}
        />

        <Box sx={{ mt: '30px' }}>
          <LicencePlateStickerFeeBlock control={control} watch={watch} />
        </Box>

        <Box sx={{ mt: '30px' }}>
          <StickerRenewOnlineBlock control={control} isDisabledExpand={false} isDefaultExpand={false} />
        </Box>
        <Box sx={{ mt: '30px' }}>
          <LicencePlateStickerResidentBlock
            control={control}
            watch={watch}
            handleChangeState={handleChangeState}
          />
        </Box>
        <Box sx={{ mt: '30px' }}>
          <DocumentsContainer
            entityType={DocumentsEntityTypeEnum.license_document}
            files={watch('documents')}
            placeholder={t('general.placeholders.add_documents')}
            onAddMedia={(files) => setValue('documents', files)}
            isCounter={false}
            isContentInformation={false}
            isDefaultExpand={false}
          />
        </Box>
      </Box>
      <ModalFooter
        isShow
        middleBtnProps={{
          color: 'primary',
          isShow: true,
          label: t('general.buttons.cancel'),
          onClick: () => onClose(),
        }}
        rightBtnProps={{
          isLoadingBtn: true,
          isStopPropagation: false,
          isShow: true,
          loading,
          label: t('general.buttons.save'),
          variant: 'contained',
          onClick: () => (!isPackageRight ? handleOpenUpgradePackageModal() : true),
          type: !isPackageRight ? 'button' : 'submit',
        }}
      />
    </LicencePlateStickerContainerForm>
  );
};

export default LicencePlateStickerContainer;

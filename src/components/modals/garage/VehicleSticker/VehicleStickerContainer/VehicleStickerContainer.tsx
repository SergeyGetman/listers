import React, { FC, useEffect, useMemo, useState } from 'react';
import { Box } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import MuiDefaultDrawerHeader from '../../../../modalsElements/containers/MuiDrawer/MuiDrawersHeders/MuiDefaultDrawerHeader';
import ModalFooter from '../../../../modalsElements/containers/Footer/ModalFooter';
import VehicleStickerMainBlock from './components/Main';
import { OptionType } from '../../../../formElements/MuiSelect/MuiSelect';
import { MediaType } from '../../../../../shared/models/media.model';
import StickerRenewOnlineBlock from '../../components/RenewOnline';
import VehicleStickerFeeBlock from './components/Fee';
import VehicleStickerResidentBlock from './components/Resident';
import DocumentsContainer from '../../../../viewContainers/DocumentsContainer';
import VehicleStickerZoneBlock from './components/Zone';
import { YesNoEnum } from '../../../../../shared/enums/gender.enum';
import { getSelectOption } from '../../../../../shared/utils/generateSelectOptions';
import { transportStickerSchema } from './schema';
import { useAppDispatch, useAppSelector } from '../../../../../shared/hooks/redux';
import { transportStickerFromToRequest, transportStickerRequestToForm } from './utils';
import { createTransportSticker, editTransportSticker } from '../../../../../store/garage/garageThunk';
import errorsHandler from '../../../../../shared/functions/errorsHandler';
import { TransportStickerModel } from '../../../../../shared/models/garage.model';
import { VehicleStickerContainerForm } from './VehicleStickerContainerForm.style';
import { DocumentsEntityTypeEnum } from '../../../../../shared/enums/documentEntityType.enum';
import { PackageEnum } from '../../../../../shared/enums/package.enum';
import { ModalNamesEnum } from '../../../../../shared/enums/modalNames.enum';
import modalObserver from '../../../../../shared/utils/observers/modalObserver';

type Props = {
  onClose: (isSkip?: boolean) => void;
  setIsShowUnsavedDataModal: (isSkip: boolean) => void;
  data?: TransportStickerModel;
  transportId: string;
};

export type FormStickerType = {
  purchase_date: Date | null;
  transport_id: number | null;
  expiration: {
    date: Date | null;
    is_notify: boolean;
  };
  number: string | null;
  sticker_fee: number | null;
  late_fee: number | null;
  administrative_fee: number | null;
  zone_fee: number | null;
  type: OptionType | null;
  zone: OptionType | null;
  zone_number: number | null;
  reference: string;
  renew: string;
  login: string;
  password: string;
  name: OptionType | null;
  address: { map: { lat: number | null; lng: number | null }; address: string | null };
  documents: MediaType[];
  id?: number;
};

const defaultValues: FormStickerType = {
  purchase_date: null,
  transport_id: null,
  expiration: {
    date: null,
    is_notify: false,
  },
  late_fee: null,
  sticker_fee: null,
  administrative_fee: null,
  type: null,
  zone: getSelectOption(YesNoEnum.no, 'general.buttons'),
  zone_number: null,
  zone_fee: null,
  number: '',
  renew: '',
  login: '',
  reference: '',
  password: '',
  name: null,
  address: {
    map: { lat: null, lng: null },
    address: null,
  },
  documents: [],
};

const VehicleStickerContainer: FC<Props> = ({ onClose, setIsShowUnsavedDataModal, data, transportId }) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    setError,
    reset,
    formState: { isDirty },
  } = useForm<FormStickerType>({
    defaultValues: defaultValues,
    resolver: yupResolver(transportStickerSchema),
  });
  const { t } = useTranslation();
  const profile = useAppSelector((state) => state.profile.data);

  const isPackageRight = useMemo(() => {
    return profile?.subscription?.package === PackageEnum.premium;
  }, [profile?.subscription?.package]);
  const handleOpenUpgradePackageModal = () => {
    modalObserver.addModal(ModalNamesEnum.purchaseModal, {
      props: { isPlatinum: true },
    });
  };
  const handleChangePurchaseDate = () => {
    setValue('expiration.date', defaultValues.expiration.date);
  };

  const onSubmit = (form: FormStickerType) => {
    if (transportId) {
      setLoading(true);
      if (data) {
        dispatch(
          editTransportSticker({ data: transportStickerFromToRequest(form, +transportId), id: data.id }),
        ).then((result) => {
          if (editTransportSticker.fulfilled.match(result)) {
            setLoading(false);
            onClose(true);
          } else {
            errorsHandler(result, setError);
            setLoading(false);
          }
        });
        return;
      }
      dispatch(createTransportSticker(transportStickerFromToRequest(form, +transportId))).then((result) => {
        if (createTransportSticker.fulfilled.match(result)) {
          setLoading(false);
          onClose(true);
        } else {
          errorsHandler(result, setError);
          setLoading(false);
        }
      });
    }
  };

  useEffect(() => {
    setIsShowUnsavedDataModal(isDirty);
  }, [isDirty, setIsShowUnsavedDataModal]);

  useEffect(() => {
    if (data) {
      reset(transportStickerRequestToForm(data));
    }
  }, [data, reset]);

  return (
    <VehicleStickerContainerForm onSubmit={handleSubmit(onSubmit)}>
      <MuiDefaultDrawerHeader
        isUpgradeToGold={false}
        isShowUpgradePackagesBtn={!isPackageRight}
        handleClickUpgradePackage={handleOpenUpgradePackageModal}
        onClose={() => onClose()}
        title={t('general.containers.vehicleSticker')}
      />
      <Box sx={{ flexGrow: 1, p: '20px 10px 50px 10px' }}>
        <Box>
          <VehicleStickerMainBlock
            watch={watch}
            handleChangePurchaseDate={handleChangePurchaseDate}
            control={control}
          />
        </Box>
        <Box sx={{ mt: '30px' }}>
          <VehicleStickerZoneBlock watch={watch} control={control} />
        </Box>
        <Box sx={{ mt: '30px' }}>
          <VehicleStickerFeeBlock watch={watch} control={control} />
        </Box>

        <Box sx={{ mt: '30px' }}>
          <StickerRenewOnlineBlock control={control} isDisabledExpand={false} isDefaultExpand={false} />
        </Box>
        <Box sx={{ mt: '30px' }}>
          <VehicleStickerResidentBlock control={control} />
        </Box>
        <Box sx={{ mt: '30px' }}>
          <DocumentsContainer
            entityType={DocumentsEntityTypeEnum.sticker_document}
            files={watch('documents')}
            placeholder={t('general.placeholders.add_documents')}
            onAddMedia={(files) => setValue('documents', files)}
            isCounter={false}
            isContentInformation={false}
            isDisabledExpand
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
    </VehicleStickerContainerForm>
  );
};

export default VehicleStickerContainer;

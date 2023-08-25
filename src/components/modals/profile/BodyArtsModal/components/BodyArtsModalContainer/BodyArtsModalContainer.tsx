import React, { FC, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Controller, useForm } from 'react-hook-form';
import { Box, Grid } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch, useAppSelector } from '../../../../../../shared/hooks/redux';
import MuiDefaultDrawerHeader from '../../../../../modalsElements/containers/MuiDrawer/MuiDrawersHeders/MuiDefaultDrawerHeader';
import ModalFooter from '../../../../../modalsElements/containers/Footer/ModalFooter';
import MuiSelect from '../../../../../formElements/MuiSelect';
import MuiBaseTextFiled from '../../../../../formElements/MuiBaseTextFiled';
import { MediaType } from '../../../../../../shared/models/media.model';
import GalleryContainer from '../../../../../viewContainers/GalleryContainer';
import DocumentsContainer from '../../../../../viewContainers/DocumentsContainer';
import MuiDotAccordion from '../../../../../accordions/MuiDotAccordion';
import PhysicalAddressContainer from '../../../../../formContainers/PhysicalAddressContainer';
import MuiPhoneNumberTextFiled from '../../../../../formElements/MuiPhoneNumberTextFiled';
import { ProfileBodyArtValidationSchema } from './schema';
import { BodyArtTypeConfig } from '../../../../../../shared/configs/selectors/bodyArtType.config';
import { BodyArtTypeEnum } from '../../../../../../shared/enums/bodyArtType.enum';
import {
  createProfileBodyArt,
  deleteProfileBodyArt,
  updateProfileBodyArt,
} from '../../../../../../store/Profile/profile.actions';
import { NotificationService } from '../../../../../../shared/services/notifications/SnackbarUtilsConfigurator/SnackbarUtilsConfigurator';
import errorsHandler from '../../../../../../shared/functions/errorsHandler';
import { ActionMenuListModel } from '../../../../../../shared/models/actionMenuList.model';
import { ModalNamesEnum } from '../../../../../../shared/enums/modalNames.enum';
import {
  GeneralModalContainer,
  GeneralModalContentContainer,
} from '../../../../../../shared/styles/GeneralModalContainers';
import MuiCurrencyTextFiled from '../../../../../formElements/MuiCurrencyTextFiled';
import { DocumentsEntityTypeEnum } from '../../../../../../shared/enums/documentEntityType.enum';
import { PhotoEntityTypeEnum } from '../../../../../../shared/enums/photoEntityType.enum';
import modalObserver from '../../../../../../shared/utils/observers/modalObserver';

type BodyArtsModalContainerProps = {
  onClose: (isSubmitted?: boolean) => void;
  setIsShowUnsavedDataModal: (val: boolean) => void;
  bodyArtId?: number;
};
const BodyArtsModalContainer: FC<BodyArtsModalContainerProps> = ({
  onClose,
  setIsShowUnsavedDataModal,
  bodyArtId,
}) => {
  const dispatch = useAppDispatch();
  const { bodyArts } = useAppSelector(({ profile }) => profile.data);
  const [isShowConfirmLoader, setIsShowConfirmLoader] = useState<boolean>(false);
  const { t } = useTranslation();

  const bodyArtIndex = bodyArts.findIndex((item: any) => item.id === bodyArtId);
  const bodyArt = bodyArtIndex !== -1 ? bodyArts[bodyArtIndex] : null;
  const [gallery, setGallery] = useState<MediaType[]>(bodyArt?.photos ? bodyArt?.photos : []);
  const [files, setFiles] = useState<MediaType[]>(bodyArt?.documents ? bodyArt?.documents : []);
  const initialValues = {
    title: bodyArt?.title ? bodyArt.title : '',
    physicalAddress: bodyArt?.address.address ? bodyArt?.address : undefined,
    phone: bodyArt?.phone ? bodyArt.phone : '',
    email: bodyArt?.email ? bodyArt.email : '',
    type: bodyArt?.type ? BodyArtTypeConfig[bodyArt.type] : null,
    country: bodyArt?.country ? bodyArt.country : '',
    artist: bodyArt?.artist ? bodyArt.artist : '',
    price: bodyArt?.price ? Math.round(+bodyArt.price) : undefined,
    salon: bodyArt?.salon ? bodyArt.salon : '',
  };
  const { handleSubmit, control, setError, formState, reset, setValue } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(ProfileBodyArtValidationSchema),
  });

  const onSubmit = (val: any) => {
    setIsShowConfirmLoader(true);
    const documents = files.map((item: MediaType) => ({
      id: item.id,
    }));
    const photos = gallery.map((item: MediaType) => ({
      id: item.id,
    }));
    const address =
      val?.physicalAddress?.address && val?.physicalAddress?.map
        ? {
            address: val.physicalAddress.address,
            map: val.physicalAddress.map,
          }
        : null;
    const reqData = {
      title: val.title,
      country: val.country,
      type: val?.type?.value,
      email: val.email,
      phone: val.phone,
      artist: val.artist,
      price: val.price,
      salon: val.salon,
      address,
      documents,
      photos,
    };
    if (bodyArtId) {
      dispatch(updateProfileBodyArt({ ...reqData, id: bodyArtId }))
        .then((result) => {
          if (updateProfileBodyArt.fulfilled.match(result)) {
            NotificationService.success(t('general.notifications.bodyArtUpdated'));
            reset();
            onClose(true);
          } else {
            errorsHandler(result, setError);
          }
        })
        .finally(() => {
          setIsShowConfirmLoader(false);
        });
    } else {
      dispatch(createProfileBodyArt(reqData))
        .then((result) => {
          if (createProfileBodyArt.fulfilled.match(result)) {
            NotificationService.success(t('general.notifications.bodyArtCreated'));
            reset();
            onClose(true);
          } else {
            errorsHandler(result, setError);
          }
        })
        .finally(() => {
          setIsShowConfirmLoader(false);
        });
    }
  };
  useEffect(() => {
    setIsShowUnsavedDataModal(formState.isDirty);
  }, [formState.isDirty, setIsShowUnsavedDataModal]);

  const bodyArtTypeOptions = [
    BodyArtTypeConfig[BodyArtTypeEnum.branding],
    BodyArtTypeConfig[BodyArtTypeEnum.earrings],
    BodyArtTypeConfig[BodyArtTypeEnum.piercing],
    BodyArtTypeConfig[BodyArtTypeEnum.tattoo],
    BodyArtTypeConfig[BodyArtTypeEnum.permanent_makeup],
    BodyArtTypeConfig[BodyArtTypeEnum.other],
  ];

  const handleChangePhoneNumber = useCallback(
    (phone: string | 'undefined', country: string | undefined) => {
      setValue('phone', phone, { shouldValidate: true });

      if (country) {
        setValue('country', country);
      } else {
        setValue('country', '');
      }
    },
    [setValue],
  );
  const handleDeleteBodyArt = useCallback(() => {
    modalObserver.addModal(ModalNamesEnum.baseConfirmModal, {
      props: {
        title: t('general.modals.deleteBodyArt.title'),
        text: t('general.modals.deleteBodyArt.text'),
        cancelBtnText: t('general.buttons.cancel'),
        confirmBtnText: t('general.buttons.confirm'),
        handleConfirm: () =>
          Promise.resolve().then(() =>
            dispatch(deleteProfileBodyArt({ id: bodyArtId ? bodyArtId : 123 })).then((result) => {
              if (deleteProfileBodyArt.fulfilled.match(result)) {
                onClose();
                NotificationService.success(t('general.notifications.bodyArtDeleted'));
              }
            }),
          ),
      },
    });
  }, [dispatch, onClose, bodyArtId, t]);

  const menuList: ActionMenuListModel = [
    {
      label: t('general.actionMenus.deleteBodyArt'),
      callback: () => handleDeleteBodyArt(),
      isDisabled: false,
    },
  ];

  return (
    <GeneralModalContainer>
      <MuiDefaultDrawerHeader
        onClose={onClose}
        title={bodyArtId ? bodyArt?.title : t('general.header.newBodyArt')}
        headerMenuList={menuList}
        isShowHeaderMenu={!!bodyArtId}
        isEditMode={bodyArtIndex !== -1}
      />
      <form style={{ height: '100%' }} onSubmit={handleSubmit(onSubmit)} noValidate>
        <GeneralModalContentContainer>
          <Grid container rowSpacing="16px" columnSpacing="20px">
            <Grid xs={12} item>
              <Grid container rowSpacing="16px" columnSpacing="20px">
                <Grid xs={12} sm={12} item>
                  <Controller
                    name="type"
                    control={control}
                    render={({ field, fieldState }) => (
                      <MuiSelect
                        {...field}
                        isRequired
                        isSearchable
                        isError={!!fieldState?.error?.message}
                        helpText={fieldState?.error?.message}
                        options={bodyArtTypeOptions}
                        label={t('general.fieldNames.bodyArtType')}
                        placeholder={t('general.placeholders.select_type')}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid xs={12} item>
              <Grid container rowSpacing="16px" columnSpacing="20px">
                <Grid xs={6} sm={6} item>
                  <Controller
                    name="title"
                    control={control}
                    render={({ field, fieldState }) => (
                      <MuiBaseTextFiled
                        label={t('general.fieldNames.title')}
                        placeholder={t('general.placeholders.enter_title')}
                        isError={!!fieldState?.error?.message}
                        errorMessage={fieldState?.error?.message}
                        type="text"
                        isRequired
                        {...field}
                      />
                    )}
                  />
                </Grid>
                <Grid xs={6} sm={6} item>
                  <Controller
                    name="artist"
                    control={control}
                    render={({ field, fieldState }) => (
                      <MuiBaseTextFiled
                        label={t('general.fieldNames.artist')}
                        placeholder={t('general.placeholders.enter_name')}
                        isError={!!fieldState?.error?.message}
                        errorMessage={fieldState?.error?.message}
                        type="text"
                        {...field}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid xs={12} item>
              <Grid container rowSpacing="16px" columnSpacing="20px">
                <Grid xs={6} sm={6} item>
                  <Controller
                    name="salon"
                    control={control}
                    render={({ field, fieldState }) => (
                      <MuiBaseTextFiled
                        label={t('general.fieldNames.salon')}
                        placeholder={t('general.placeholders.enter_name')}
                        isError={!!fieldState?.error?.message}
                        errorMessage={fieldState?.error?.message}
                        type="text"
                        {...field}
                      />
                    )}
                  />
                </Grid>
                <Grid xs={6} sm={6} item>
                  <Controller
                    name="price"
                    control={control}
                    render={({ field, fieldState }) => (
                      <MuiCurrencyTextFiled
                        {...field}
                        label={t('general.fieldNames.price')}
                        placeholder={t('general.placeholders.enter_price')}
                        isError={!!fieldState?.error?.message}
                        errorMessage={fieldState?.error?.message}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Box sx={{ mt: '30px' }}>
            <GalleryContainer
              placeholder={t('general.placeholders.add_bodyArd_photos')}
              onAddMedia={(newMedia: MediaType[]) => setGallery(newMedia)}
              entityType={PhotoEntityTypeEnum.photo_body_arts}
              gallery={gallery}
            />
          </Box>
          <Box sx={{ mt: '30px' }}>
            <DocumentsContainer
              placeholder={t('general.placeholders.add_your_documents')}
              entityType={DocumentsEntityTypeEnum.document_body_arts}
              files={files}
              onAddMedia={(newMedia: MediaType[]) => setFiles(newMedia)}
            />
          </Box>
          <Box sx={{ mt: '30px' }}>
            <MuiDotAccordion isDisabledExpand label={t('general.containers.contacts')} isDefaultExpand>
              <Grid container rowSpacing="16px" columnSpacing="20px">
                <Grid xs={12} item>
                  <Grid container rowSpacing="16px" columnSpacing="20px">
                    <Grid xs={6} sm={6} item>
                      <Controller
                        name="phone"
                        control={control}
                        render={({ field, fieldState }) => (
                          <MuiPhoneNumberTextFiled
                            {...field}
                            label={t('general.fieldNames.phone')}
                            placeholder={t('general.placeholders.enter_number')}
                            isError={!!fieldState?.error?.message}
                            onChange={(phone: string | 'undefined', country: string | undefined) =>
                              handleChangePhoneNumber(phone, country)
                            }
                            errorMessage={fieldState?.error?.message}
                          />
                        )}
                      />
                    </Grid>
                    <Grid xs={6} sm={6} item>
                      <Controller
                        name="email"
                        control={control}
                        render={({ field, fieldState }) => (
                          <MuiBaseTextFiled
                            label={t('general.fieldNames.email')}
                            placeholder={t('general.placeholders.enter_email')}
                            isError={!!fieldState?.error?.message}
                            errorMessage={fieldState?.error?.message}
                            type="text"
                            {...field}
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Box sx={{ mt: '16px' }}>
                <PhysicalAddressContainer
                  control={control}
                  placeholder={t('general.placeholders.enter_location')}
                  isContainAccordion={false}
                />
              </Box>
            </MuiDotAccordion>
          </Box>
        </GeneralModalContentContainer>

        <ModalFooter
          position="absolute"
          middleBtnProps={{
            isShow: true,
            label: t('general.buttons.cancel'),
            variant: 'outlined',
            onClick: () => onClose(),
          }}
          rightBtnProps={{
            isShow: true,
            isLoadingBtn: true,
            loading: isShowConfirmLoader,
            label: t('general.buttons.save'),
            variant: 'contained',
            isStopPropagation: false,
            type: 'submit',
          }}
        />
      </form>
    </GeneralModalContainer>
  );
};

export default BodyArtsModalContainer;

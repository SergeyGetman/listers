import React, { FC, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Grid } from '@mui/material';
import { useAppDispatch } from '../../../shared/hooks/redux';
import { ModalNamesEnum } from '../../../shared/enums/modalNames.enum';
import MuiBaseInputView from '../../formElements/MuiBaseInputView';
import { BodyArtTypeConfig } from '../../../shared/configs/selectors/bodyArtType.config';
import MuiDotAccordion from '../../accordions/MuiDotAccordion';
import LocationView from '../../locations/LocationView';
import MuiBaseMobileAccordion from '../../accordions/MuiBaseMobileAccordion';
import MuiBaseAccordion from '../../accordions/MuiBaseAccordion';
import Gallery from '../../media/Gallery';
import MuiPhoneNumberInputView from '../../formElements/MuiPhoneNumberInputView';
import { deleteProfileBodyArt } from '../../../store/Profile/profile.actions';
import { NotificationService } from '../../../shared/services/notifications/SnackbarUtilsConfigurator/SnackbarUtilsConfigurator';
import FileView from '../../FilePreView';
import { DocumentsEntityTypeEnum } from '../../../shared/enums/documentEntityType.enum';
import { PhotoEntityTypeEnum } from '../../../shared/enums/photoEntityType.enum';
import modalObserver from '../../../shared/utils/observers/modalObserver';

type ProfileBodyArtContainerProps = {
  bodyArt: any;
  isMobileDisplay?: boolean;
  isEdit?: boolean;
};
// TODO storybook

const ProfileBodyArtContainer: FC<ProfileBodyArtContainerProps> = ({ bodyArt, isMobileDisplay, isEdit }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const handleDeleteBodyArt = useCallback(() => {
    modalObserver.addModal(ModalNamesEnum.baseConfirmModal, {
      props: {
        title: t('general.modals.deleteBodyArt.title'),
        text: t('general.modals.deleteBodyArt.text'),
        cancelBtnText: t('general.buttons.cancel'),
        confirmBtnText: t('general.buttons.confirm'),
        handleConfirm: () =>
          Promise.resolve().then(() =>
            dispatch(deleteProfileBodyArt({ id: bodyArt?.id ? bodyArt?.id : 123 })).then((result) => {
              if (deleteProfileBodyArt.fulfilled.match(result)) {
                NotificationService.success(t('general.notifications.bodyArtDeleted'));
              }
            }),
          ),
      },
    });
  }, [dispatch, bodyArt.id, t]);

  const menuList = [
    {
      label: t('general.actionMenus.edit'),
      callback: () =>
        modalObserver.addModal(ModalNamesEnum.bodyArts, {
          props: {
            bodyArtId: bodyArt.id,
          },
        }),
      isDisabled: false,
    },
    {
      label: t('general.actionMenus.deleteBodyArt'),
      callback: () => handleDeleteBodyArt(),
      isDisabled: false,
    },
  ];
  const renderContent = useMemo(() => {
    return (
      <Box>
        {!!bodyArt?.media?.length && (
          <Box sx={{ mb: '30px' }}>
            <MuiDotAccordion
              isDisabledExpand
              label={t('general.containers.gallery')}
              contentInformation={t('general.containerInfo.pictures')}
              contentCounter={bodyArt.media.length}
              isDefaultExpand
            >
              <Gallery
                isCanAddMedia={false}
                type="gallery"
                media={bodyArt.media}
                isDeleteWithoutAutoSave={false}
                onAddMedia={() => true}
                entityType={PhotoEntityTypeEnum.photo_body_arts}
                permission={{ isDelete: false, isDownload: true, isUpdate: false }}
              />
            </MuiDotAccordion>
          </Box>
        )}
        <Grid container rowSpacing="16px" columnSpacing="20px">
          <Grid xs={12} item>
            <Grid container rowSpacing="16px" columnSpacing="20px">
              <Grid xs={6} item>
                <MuiBaseInputView
                  content={
                    BodyArtTypeConfig[bodyArt?.type]?.label ? BodyArtTypeConfig[bodyArt?.type].label : '-'
                  }
                  label={t('general.fieldNames.type')}
                />
              </Grid>
              <Grid xs={6} item>
                <MuiBaseInputView
                  content={bodyArt?.salon ? bodyArt?.salon : '-'}
                  label={t('general.fieldNames.salon')}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid xs={12} item>
            <Grid container rowSpacing="16px" columnSpacing="20px">
              <Grid xs={6} item>
                <MuiBaseInputView
                  content={bodyArt?.artist ? bodyArt?.artist : '-'}
                  label={t('general.fieldNames.artist')}
                />
              </Grid>
              <Grid xs={6} item>
                <MuiBaseInputView
                  content={bodyArt?.price ? `$${+bodyArt.price / 100}` : '-'}
                  label={t('general.fieldNames.price')}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Box sx={{ mt: '30px' }}>
          <MuiDotAccordion isDisabledExpand label={t('general.containers.contacts')} isDefaultExpand>
            <Grid container rowSpacing="16px" columnSpacing="20px">
              <Grid xs={12} item>
                <Grid container rowSpacing="16px" columnSpacing="20px">
                  <Grid xs={6} item>
                    <MuiPhoneNumberInputView
                      country={bodyArt?.country}
                      content={bodyArt?.phone ? bodyArt?.phone : '-'}
                    />
                  </Grid>
                  <Grid xs={6} item>
                    <MuiBaseInputView
                      content={bodyArt?.email ? bodyArt?.email : '-'}
                      label={t('general.fieldNames.email')}
                    />
                  </Grid>
                </Grid>
              </Grid>
              {bodyArt?.address?.address && (
                <Grid xs={12} item>
                  <Grid container rowSpacing="16px" columnSpacing="20px">
                    <Grid xs={12} sm={12} md={12} item>
                      <LocationView location={bodyArt?.address?.map} address={bodyArt?.address?.address} />
                    </Grid>
                  </Grid>
                </Grid>
              )}
            </Grid>
          </MuiDotAccordion>
        </Box>
        {!!bodyArt.documents.length && (
          <Box sx={{ mt: '30px' }}>
            <MuiDotAccordion
              isDisabledExpand
              label={t('general.containers.documents')}
              contentInformation={t('general.containerInfo.documents')}
              contentCounter={bodyArt?.documents?.length}
              isDefaultExpand
            >
              <FileView
                files={bodyArt.documents}
                entityType={DocumentsEntityTypeEnum.document_body_arts}
                permission={{ isDelete: false, isDownload: true, isUpdate: false }}
              />
            </MuiDotAccordion>
          </Box>
        )}
      </Box>
    );
  }, [t, bodyArt]);

  return isMobileDisplay ? (
    <MuiBaseMobileAccordion
      menuList={isEdit ? menuList : undefined}
      title={bodyArt?.title}
      subtitleText={t('general.containerInfo.bodyArt')}
    >
      <Box sx={{ padding: '0 10px 16px 10px' }}> {renderContent}</Box>
    </MuiBaseMobileAccordion>
  ) : (
    <MuiBaseAccordion
      menuList={isEdit ? menuList : undefined}
      withHover
      label={bodyArt?.title}
      isShowInfoDialog={false}
    >
      {renderContent}
    </MuiBaseAccordion>
  );
};

export default ProfileBodyArtContainer;

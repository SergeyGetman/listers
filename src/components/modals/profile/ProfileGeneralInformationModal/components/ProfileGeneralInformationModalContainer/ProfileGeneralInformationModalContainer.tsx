import React, { FC, useEffect, useState } from 'react';
import { Box, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Controller, useForm } from 'react-hook-form';
import Moment from 'moment';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch, useAppSelector } from '../../../../../../shared/hooks/redux';
import MuiDefaultDrawerHeader from '../../../../../modalsElements/containers/MuiDrawer/MuiDrawersHeders/MuiDefaultDrawerHeader';
import ModalFooter from '../../../../../modalsElements/containers/Footer/ModalFooter';
import MuiDotAccordion from '../../../../../accordions/MuiDotAccordion';
import Gallery from '../../../../../media/Gallery';
import MuiBaseTextFiled from '../../../../../formElements/MuiBaseTextFiled';
import MuiDatePicker from '../../../../../formElements/MuiDatePicker';
import MuiSelect from '../../../../../formElements/MuiSelect';
import { GenderConfig } from '../../../../../../shared/configs/gender.config';
import { GenderEnum } from '../../../../../../shared/enums/gender.enum';
import { RelationshipConfig } from '../../../../../../shared/configs/relationship.config';
import { RelationshipEnum } from '../../../../../../shared/enums/relationship.enum';
import { MediaType } from '../../../../../../shared/models/media.model';
import { updateProfileGeneralInfo } from '../../../../../../store/Profile/profile.actions';
import { NotificationService } from '../../../../../../shared/services/notifications/SnackbarUtilsConfigurator/SnackbarUtilsConfigurator';
import errorsHandler from '../../../../../../shared/functions/errorsHandler';
import { ProfileGeneralInfoSchema } from './schema';
import {
  GeneralModalContainer,
  GeneralModalContentContainer,
} from '../../../../../../shared/styles/GeneralModalContainers';
import { DocumentsEntityTypeEnum } from '../../../../../../shared/enums/documentEntityType.enum';

type ProfileGeneralInformationModalContainerProps = {
  onClose: (isSubmitted?: boolean) => void;
  setIsShowUnsavedDataModal: (val: boolean) => void;
};

const ProfileGeneralInformationModalContainer: FC<ProfileGeneralInformationModalContainerProps> = ({
  onClose,
  setIsShowUnsavedDataModal,
}) => {
  const dispatch = useAppDispatch();
  const profileData = useAppSelector(({ profile }) => profile.data);
  const [isShowConfirmLoader, setIsShowConfirmLoader] = useState<boolean>(false);
  const { t } = useTranslation();
  const [files, setFiles] = useState<MediaType[]>(profileData?.documents);

  const initialValues = {
    first_name: profileData?.first_name ? profileData?.first_name : '',
    last_name: profileData?.last_name ? profileData?.last_name : '',
    middle_name: profileData?.middle_name === null ? '' : profileData?.middle_name,
    birth_day: profileData?.birth_day ? Moment(profileData.birth_day).toDate() : null,
    gender: profileData?.gender === null ? null : GenderConfig[profileData?.gender],
    relationship_status:
      profileData?.relationship_status === null ? '' : RelationshipConfig[profileData?.relationship_status],
  };

  const { handleSubmit, control, setError, formState, reset } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(ProfileGeneralInfoSchema),
  });

  const onSubmit = (val: any) => {
    setIsShowConfirmLoader(true);
    const documents = files.map((item: MediaType) => ({
      id: item.id,
    }));
    const reqData = {
      first_name: val.first_name,
      last_name: val.last_name,
      middle_name: val.middle_name,
      birth_day: Moment(val.birth_day).format('MM/DD/YYYY'),
      gender: val?.gender?.value,
      relationship_status: val?.relationship_status?.value,
      documents,
    };
    dispatch(updateProfileGeneralInfo(reqData))
      .then((result) => {
        if (updateProfileGeneralInfo.fulfilled.match(result)) {
          NotificationService.success(t('general.notifications.profileGeneralInfoUpdated'));
          reset();
          onClose(true);
        } else {
          errorsHandler(result, setError);
        }
      })
      .finally(() => {
        setIsShowConfirmLoader(false);
      });
  };
  const genderOptions = [
    GenderConfig[GenderEnum.male],
    GenderConfig[GenderEnum.female],
    GenderConfig[GenderEnum.unspecified],
    GenderConfig[GenderEnum.undisclosed],
  ];

  const relationshipOptions = [
    RelationshipConfig[RelationshipEnum.single],
    RelationshipConfig[RelationshipEnum.in_a_relationship],
    RelationshipConfig[RelationshipEnum.married],
  ];

  useEffect(() => {
    setIsShowUnsavedDataModal(formState.isDirty);
  }, [formState.isDirty, setIsShowUnsavedDataModal]);
  return (
    <GeneralModalContainer>
      <MuiDefaultDrawerHeader isEditMode onClose={onClose} title={t('general.header.generalInformation')} />
      <form style={{ height: '100%' }} onSubmit={handleSubmit(onSubmit)} noValidate>
        <GeneralModalContentContainer>
          <MuiDotAccordion isDisabledExpand label={t('general.containers.main')} isDefaultExpand>
            <Grid container rowSpacing="16px" columnSpacing="20px">
              <Grid xs={12} item>
                <Grid container rowSpacing="16px" columnSpacing="20px">
                  <Grid xs={6} item>
                    <Controller
                      name="first_name"
                      control={control}
                      render={({ field, fieldState }) => (
                        <MuiBaseTextFiled
                          label={t('general.fieldNames.firstName')}
                          placeholder={t('general.placeholders.enter_your_first_name')}
                          isError={!!fieldState?.error?.message}
                          errorMessage={fieldState?.error?.message}
                          isRequired
                          type="text"
                          {...field}
                        />
                      )}
                    />
                  </Grid>
                  <Grid xs={6} item>
                    <Controller
                      name="last_name"
                      control={control}
                      render={({ field, fieldState }) => (
                        <MuiBaseTextFiled
                          label={t('general.fieldNames.lastName')}
                          placeholder={t('general.placeholders.enter_your_last_name')}
                          isError={!!fieldState?.error?.message}
                          errorMessage={fieldState?.error?.message}
                          isRequired
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
                  <Grid xs={6} item>
                    <Controller
                      name="middle_name"
                      control={control}
                      render={({ field, fieldState }) => (
                        <MuiBaseTextFiled
                          label={t('general.fieldNames.middleName')}
                          placeholder={t('general.placeholders.enter_your_middle_name')}
                          isError={!!fieldState?.error?.message}
                          errorMessage={fieldState?.error?.message}
                          type="text"
                          {...field}
                        />
                      )}
                    />
                  </Grid>
                  <Grid xs={6} item>
                    <Controller
                      name="birth_day"
                      control={control}
                      render={({ field, fieldState }) => (
                        <MuiDatePicker
                          {...field}
                          isClearable={false}
                          isFullWidth={false}
                          isRequired
                          label={t('general.fieldNames.birthday')}
                          placeholder={t('general.placeholders.select_date')}
                          isError={!!fieldState?.error?.message}
                          errorMessage={fieldState?.error?.message}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid xs={12} item>
                <Grid container rowSpacing="16px" columnSpacing="20px">
                  <Grid xs={6} item>
                    <Controller
                      name="gender"
                      control={control}
                      render={({ field, fieldState }) => (
                        <MuiSelect
                          {...field}
                          isClearable
                          isSearchable
                          isError={!!fieldState?.error?.message}
                          helpText={fieldState?.error?.message}
                          options={genderOptions}
                          label={t('general.fieldNames.gender')}
                          placeholder={t('general.placeholders.select_gender')}
                        />
                      )}
                    />
                  </Grid>
                  <Grid xs={6} item>
                    <Controller
                      name="relationship_status"
                      control={control}
                      render={({ field, fieldState }) => (
                        <MuiSelect
                          {...field}
                          isSearchable
                          isError={!!fieldState?.error?.message}
                          helpText={fieldState?.error?.message}
                          options={relationshipOptions}
                          isClearable
                          label={t('general.fieldNames.relationship')}
                          placeholder={t('general.placeholders.select_type')}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </MuiDotAccordion>
          <Box sx={{ mt: '30px' }}>
            <MuiDotAccordion
              label={t('general.containers.documents')}
              contentInformation={t('general.containerInfo.documents')}
              contentCounter={files.length}
              isDefaultExpand
            >
              <Gallery
                placeholder={t('general.placeholders.add_your_documents')}
                isCanAddMedia
                type="files"
                maxPhotoLength={5}
                maxHideView={5}
                media={files}
                entityType={DocumentsEntityTypeEnum.user_document}
                isDeleteWithoutAutoSave
                onAddMedia={(newMedia: MediaType[]) => setFiles(newMedia)}
                permission={{ isDelete: true, isDownload: true, isUpdate: false }}
              />
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

export default ProfileGeneralInformationModalContainer;

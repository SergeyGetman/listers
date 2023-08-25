import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Controller, useForm } from 'react-hook-form';
import { Box } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../../../shared/hooks/redux';
import MuiDefaultDrawerHeader from '../../../../modalsElements/containers/MuiDrawer/MuiDrawersHeders/MuiDefaultDrawerHeader';
import ModalFooter from '../../../../modalsElements/containers/Footer/ModalFooter';
import MuiSelect from '../../../../formElements/MuiSelect';
import { AutoArchiveConfig } from '../../../../../shared/configs/selectors/autoArchiveConfig';
import { setProfileSettings } from '../../../../../store/Profile/profile.actions';
// Todo add  enums

type ArchiveSettingsModalContainerProps = {
  onClose: (isSubmitted?: boolean) => void;
  setIsShowUnsavedDataModal: (val: boolean) => void;
};
const ArchiveSettingsModalContainer: FC<ArchiveSettingsModalContainerProps> = ({
  onClose,
  setIsShowUnsavedDataModal,
}) => {
  const dispatch = useAppDispatch();
  const profileData = useAppSelector(({ profile }) => profile?.data);
  const { t } = useTranslation();
  const [isShowConfirmLoader, setIsShowConfirmLoader] = useState<boolean>(false);

  const initialValues = {
    event_auto_archive: !!profileData?.profileSettings?.event_auto_archive?.is_enable
      ? AutoArchiveConfig[profileData?.profileSettings?.event_auto_archive?.value || 'none']
      : AutoArchiveConfig.none,
    task_auto_archive: !!profileData?.profileSettings?.task_auto_archive?.is_enable
      ? AutoArchiveConfig[profileData?.profileSettings?.task_auto_archive?.value || 'none']
      : AutoArchiveConfig.none,
  };
  const { handleSubmit, formState, control } = useForm({
    defaultValues: initialValues,
  });

  const onSubmit = (val: any) => {
    setIsShowConfirmLoader(true);
    const submitData = {
      settings: [
        {
          is_enable: val.event_auto_archive.value !== 'none',
          key: 'event_auto_archive',
          value: val.event_auto_archive.value !== 'none' ? `${val.event_auto_archive.value}` : '15',
        },
        {
          is_enable: val.task_auto_archive.value !== 'none',
          key: 'task_auto_archive',
          value: val.task_auto_archive.value !== 'none' ? `${val.task_auto_archive.value}` : '15',
        },
      ],
    };
    dispatch(setProfileSettings(submitData))
      .then((result) => {
        if (setProfileSettings.fulfilled.match(result)) {
          onClose(true);
        }
      })
      .finally(() => setIsShowConfirmLoader(false));
    return val;
  };

  useEffect(() => {
    setIsShowUnsavedDataModal(formState.isDirty);
  }, [formState.isDirty, setIsShowUnsavedDataModal]);

  const bodyTypeOptions = [AutoArchiveConfig.none, AutoArchiveConfig[15], AutoArchiveConfig[30]];

  return (
    <Box sx={{ width: '100%', height: '100%', overflow: 'hidden' }}>
      <MuiDefaultDrawerHeader onClose={onClose} title="Automatic archive" />
      <form onSubmit={handleSubmit(onSubmit)} noValidate style={{ height: '100%' }}>
        <Box sx={{ p: '10px', pt: '0', overflowX: 'hidden', height: '100%' }}>
          <Box sx={{ mt: '30px' }}>
            <Controller
              name="event_auto_archive"
              control={control}
              render={({ field, fieldState }) => (
                <MuiSelect
                  {...field}
                  isSearchable
                  isError={!!fieldState?.error?.message}
                  helpText={fieldState?.error?.message}
                  options={bodyTypeOptions}
                  isClearable
                  label={t('general.fieldNames.tasks')}
                />
              )}
            />
          </Box>
          <Box sx={{ mt: '16px' }}>
            <Controller
              name="task_auto_archive"
              control={control}
              render={({ field, fieldState }) => (
                <MuiSelect
                  {...field}
                  isSearchable
                  isError={!!fieldState?.error?.message}
                  helpText={fieldState?.error?.message}
                  options={bodyTypeOptions}
                  isClearable
                  label={t('general.fieldNames.events')}
                />
              )}
            />
          </Box>
        </Box>
        <ModalFooter
          isSpaceBetweenBtn
          isShowSecurityInfo={false}
          position="absolute"
          middleBtnProps={{
            isShow: true,
            label: t('general.buttons.cancel'),

            variant: 'outlined',
            color: 'secondary',
            onClick: () => onClose(),
          }}
          rightBtnProps={{
            isShow: true,
            label: t('general.buttons.save'),
            variant: 'contained',
            isStopPropagation: false,
            isLoadingBtn: true,
            loading: isShowConfirmLoader,
            isDisabled: !formState.isDirty,
            type: 'submit',
          }}
        />
      </form>
    </Box>
  );
};

export default ArchiveSettingsModalContainer;

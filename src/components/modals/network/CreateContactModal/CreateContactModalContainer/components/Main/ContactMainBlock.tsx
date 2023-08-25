import React, { FC, useCallback, useMemo, useRef } from 'react';
import { Grid, Box, CircularProgress } from '@mui/material';
import { Control, UseFormSetValue } from 'react-hook-form/dist/types/form';
import { Controller, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import MuiBaseTextFiled from '../../../../../../formElements/MuiBaseTextFiled';
import MuiCheckbox from '../../../../../../formElements/MuiCheckbox';
import MuiSelect from '../../../../../../formElements/MuiSelect';
import SelectRole from '../../../../../../formElements/SelectRole';
import {
  ContactMainBlockCheckboxContainer,
  ContactMainBlockContainer,
  ContactMainBlockAvatarContainer,
} from './ContactMainBlock.style';
import MuiAvatar from '../../../../../../avatars/MuiAvatart/MuiAvatar';
import AvatarContainer from '../../../../../../avatars/AvatarContainer';
import { NotificationService } from '../../../../../../../shared/services/notifications/SnackbarUtilsConfigurator/SnackbarUtilsConfigurator';
import modalObserver from '../../../../../../../shared/utils/observers/modalObserver';
import { ModalNamesEnum } from '../../../../../../../shared/enums/modalNames.enum';
import { PhotoEntityTypeEnum } from '../../../../../../../shared/enums/photoEntityType.enum';
import useValidTypes from '../../../../../../../shared/hooks/useValidTypes';
import { uploadMediaPhoto } from '../../../../../../../store/Common/commonThunk';
import { useAppDispatch } from '../../../../../../../shared/hooks/redux';
import { MediaType } from '../../../../../../../shared/models/media.model';
import { tagsConfig } from '../../../../../../../shared/configs/tags.config';
import { TagsEnum } from '../../../../../../../shared/enums/tags.enum';
import { FormContactValues } from '../../CreateContactModalContainer';

type Props = {
  control: Control<FormContactValues>;
  handleChangeIsCompany: (value: boolean) => void;
  handleChangeRole: (role: string) => void;
  setValue: UseFormSetValue<FormContactValues>;
};

const ContactMainBlock: FC<Props> = ({ control, handleChangeIsCompany, handleChangeRole, setValue }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const fileRef = useRef<HTMLInputElement | null>(null);
  const AVATAR_ITEM = {
    created_at: '',
    filename: '',
    id: 2,
    original_filename: '',
    url: '',
    token: '',
    additional_info: {
      in_progress: true,
      size_urls: {
        big_icon: '',
        gallery: '',
        middle_icon: '',
      },
      sizes: [],
    },
    progress: 0,
    progressId: 0,
  };
  const watchAvatar = useWatch({ control, name: 'avatar' });
  const watchFirstName = useWatch({ control, name: 'first_name' });
  const watchLastName = useWatch({ control, name: 'last_name' });

  const { getAcceptedFormat, validateMediaFormat } = useValidTypes();
  const handleSavePhoto = useCallback(
    (data: FormData, progressId: string) => {
      setValue('avatar', { ...AVATAR_ITEM, progressId });
      dispatch(
        uploadMediaPhoto(
          data,
          (progress: number) => setValue('avatar', { ...(watchAvatar as MediaType), progress }),
          (file) => setValue('avatar', file ? { ...(file as MediaType), progress: 100 } : null),
        ),
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch, setValue, watchAvatar],
  );
  const handleAddFile = useCallback(
    (inputFile: any) => {
      if (!validateMediaFormat('photo', inputFile.type)) {
        NotificationService.error(t('mediaGallery.errors.fileTypeItem', { fileName: inputFile.name }));
      } else {
        modalObserver.addModal(ModalNamesEnum.photoCrop, {
          props: {
            img: inputFile,
            handleSavePhoto,
            loadingMediaId: uuidv4() || '',
            cropTitle: t('mediaGallery.crop.title'),
            entityType: PhotoEntityTypeEnum.thread_avatar,
          },
        });
      }
    },
    [handleSavePhoto, t, validateMediaFormat],
  );

  const handleDeleteFile = useCallback(() => {
    setValue('avatar', null);
  }, [setValue]);

  const handleOpenViewFileModal = useCallback(() => {
    modalObserver.addModal(ModalNamesEnum.mediaViewer, {
      props: {
        media: [watchAvatar],
        activeMedia: 0,
        onDelete: handleDeleteFile,
        onUpdate: (files: MediaType[]) => setValue('avatar', files[0]),
        entityType: PhotoEntityTypeEnum.thread_avatar,
        permission: {
          isDownload: true,
          isDelete: true,
          isUpdate: true,
        },
      },
    });
  }, [handleDeleteFile, setValue, watchAvatar]);

  const handleRenderAvatar = useMemo(() => {
    if (watchAvatar === null) {
      return (
        <Box
          sx={{ cursor: 'pointer' }}
          onClick={() => {
            if (fileRef) {
              fileRef.current?.click();
            }
          }}
        >
          <AvatarContainer
            id={0}
            firstName={!!watchFirstName ? watchFirstName : ''}
            lastName={!!watchLastName ? watchLastName : ''}
            size="large"
            isAddPhotoIcon
            src=""
          />

          <input
            ref={fileRef}
            onChange={(e: any) => handleAddFile(e.target.files[0])}
            accept={getAcceptedFormat('photo')}
            type="file"
            max={1}
            name="media"
            hidden
          />
        </Box>
      );
    }
    if (watchAvatar?.id) {
      return (
        <Box onClick={handleOpenViewFileModal} sx={{ width: '100px', height: '100px', cursor: 'pointer' }}>
          <MuiAvatar
            firstName={!!watchFirstName ? watchFirstName : ''}
            lastName={!!watchLastName ? watchLastName : ''}
            src={watchAvatar?.additional_info?.size_urls?.middle_icon || watchAvatar?.url || ''}
            id={0}
            size="large"
          />
        </Box>
      );
    }
    if (watchAvatar?.id === 0 || watchAvatar?.progress) {
      return (
        <Box
          sx={{
            width: '100px',
            height: '100px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CircularProgress variant="determinate" value={watchAvatar?.progress} />
        </Box>
      );
    }

    return <></>;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getAcceptedFormat, handleAddFile, watchAvatar, watchLastName, watchFirstName]);

  const tagsItemConfig = [
    tagsConfig[TagsEnum.profile],
    tagsConfig[TagsEnum.garage],
    tagsConfig[TagsEnum.education],
    tagsConfig[TagsEnum.work],
    tagsConfig[TagsEnum.pets],
    tagsConfig[TagsEnum.property],
    tagsConfig[TagsEnum.none],
  ];

  return (
    <ContactMainBlockContainer>
      <ContactMainBlockAvatarContainer>{handleRenderAvatar}</ContactMainBlockAvatarContainer>
      <Grid container rowSpacing="16px" columnSpacing="16px">
        <Grid xs={12} sm={6} item>
          <Controller
            name="first_name"
            control={control}
            render={({ field, fieldState }) => (
              <MuiBaseTextFiled
                label={t('general.fieldNames.firstName')}
                placeholder={t('general.placeholders.enter_first_name')}
                isError={!!fieldState?.error?.message}
                errorMessage={fieldState?.error?.message}
                type="text"
                {...field}
              />
            )}
          />
        </Grid>
        <Grid xs={12} sm={6} item>
          <Controller
            name="last_name"
            control={control}
            render={({ field, fieldState }) => (
              <MuiBaseTextFiled
                {...field}
                label={t('general.fieldNames.lastName')}
                placeholder={t('general.placeholders.enter_last_name')}
                isError={!!fieldState?.error?.message}
                errorMessage={fieldState?.error?.message}
                type="text"
              />
            )}
          />
        </Grid>
        <Grid xs={12} sm={6} item>
          <Controller
            name="role"
            control={control}
            render={({ field, fieldState }) => (
              <SelectRole
                value={field.value}
                label={t('general.fieldNames.role')}
                placeholder={t('general.placeholders.select_role')}
                onChange={(role) => handleChangeRole(role)}
                isError={!!fieldState?.error?.message}
                errorMessage={fieldState?.error?.message}
              />
            )}
          />
        </Grid>
        <Grid xs={12} sm={6} item>
          <Controller
            name="tag"
            control={control}
            render={({ field, fieldState }) => (
              <MuiSelect
                {...field}
                isClearable
                options={tagsItemConfig}
                startIcon={field?.value?.icon ? <field.value.icon /> : null}
                label={t('general.fieldNames.tag')}
                placeholder={t('general.placeholders.select_tag')}
                isError={!!fieldState?.error?.message}
                helpText={fieldState?.error?.message}
              />
            )}
          />
        </Grid>

        <Grid xs={12} sm={6} item>
          <Controller
            name="contacts.company"
            control={control}
            render={({ field, fieldState }) => (
              <MuiBaseTextFiled
                label={t('general.fieldNames.company')}
                placeholder={t('general.placeholders.enter_company')}
                isError={!!fieldState?.error?.message}
                errorMessage={fieldState?.error?.message}
                type="text"
                {...field}
              />
            )}
          />
        </Grid>
        <Grid xs={12} sm={6} item>
          <ContactMainBlockCheckboxContainer>
            <Controller
              name="contacts.is_company"
              control={control}
              render={({ field }) => (
                <MuiCheckbox
                  {...field}
                  onChange={(el: React.ChangeEvent<HTMLInputElement>) =>
                    handleChangeIsCompany(el.target.checked)
                  }
                  label={t('general.fieldNames.isMakeAsAContactTitle')}
                />
              )}
            />
          </ContactMainBlockCheckboxContainer>
        </Grid>
      </Grid>
    </ContactMainBlockContainer>
  );
};

export default ContactMainBlock;

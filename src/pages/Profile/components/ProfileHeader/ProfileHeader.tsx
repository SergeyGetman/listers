import React, { FC, useCallback, useRef } from 'react';
import { Box } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { useTranslation } from 'react-i18next';
import MobileBackgroundStub from '../../../../assets/Images/profile-header-mobile-background.png';
import DesktopBackgroundStub from '../../../../assets/Images/profile-header-background-stub.png';
import { AvatarModel } from '../../../../shared/models/avatar.model';
import { ProfileHeaderAvatar, ProfileHeaderContainer } from './ProfileHeader.style';
import useValidTypes from '../../../../shared/hooks/useValidTypes';
import { NotificationService } from '../../../../shared/services/notifications/SnackbarUtilsConfigurator/SnackbarUtilsConfigurator';
import { ModalNamesEnum } from '../../../../shared/enums/modalNames.enum';
import { useAppDispatch } from '../../../../shared/hooks/redux';
import AvatarContainer from '../../../../components/avatars/AvatarContainer';
import { PhotoEntityTypeEnum } from '../../../../shared/enums/photoEntityType.enum';
import { deleteMedia, uploadMediaPhoto } from '../../../../store/Common/commonThunk';
import { setLoading } from '../../../../store/Common/commonSlice';
import {
  deleteProfileAvatar,
  deleteProfileBackground,
  setProfileAvatar,
  setProfileBackground,
} from '../../../../store/Profile/profile.slice';
import i18next from '../../../../shared/locales/i18n';
import modalObserver from '../../../../shared/utils/observers/modalObserver';

type ProfileHeaderProps = {
  isMobileDisplay: boolean;
  isFriendProfile?: boolean;
  avatar: AvatarModel;
  background: AvatarModel;
  userId: number;
  firstName: string;
  lastName: string;
};

type PhotoEntity = 'avatar' | 'background';
const ProfileHeader: FC<ProfileHeaderProps> = ({
  isMobileDisplay,
  isFriendProfile = false,
  avatar,
  background,
  userId,
  firstName,
  lastName,
}) => {
  const dispatch = useAppDispatch();

  const { t } = useTranslation();
  const avatarInputRef = useRef<HTMLInputElement | null>(null);
  const backgroudInputRef = useRef<HTMLInputElement | null>(null);

  const { getAcceptedFormat, validateMediaFormat } = useValidTypes();
  const handleSavePhoto = useCallback(
    (data: FormData, progressId: string, type: PhotoEntity) => {
      dispatch(setLoading(true));
      dispatch(
        uploadMediaPhoto(
          data,
          () => true,
          (file) => {
            if (type === 'avatar') {
              dispatch(setProfileAvatar(file));
              if (file) {
                NotificationService.success(i18next.t('general.notifications.profileAvatarAdded'));
                dispatch(setProfileAvatar(file));
              }
            } else {
              if (file) {
                dispatch(setProfileBackground(file));
                NotificationService.success(i18next.t('general.notifications.profileBackgroundAdded'));
              }
            }
          },
        ),
      ).finally(() => dispatch(setLoading(false)));
      return { data, progressId };
    },
    [dispatch],
  );

  const handleDeleteFile = (id: number, token: string, type: PhotoEntity) => {
    dispatch(setLoading(true));
    dispatch(deleteMedia(token))
      .then(() => {
        if (type === 'avatar') {
          dispatch(deleteProfileAvatar());
          NotificationService.success(i18next.t('general.notifications.profileAvatarDeleted'));
        } else {
          dispatch(deleteProfileBackground());
          NotificationService.success(i18next.t('general.notifications.profileBackgroundDeleted'));
        }
      })
      .finally(() => dispatch(setLoading(false)));
  };
  const handleUpdateFile = (files: AvatarModel[], type: PhotoEntity) => {
    if (files[0]) {
      if (type === 'avatar') {
        dispatch(setProfileAvatar(files[0]));
        NotificationService.success(i18next.t('general.notifications.profileAvatarUpdated'));
      } else {
        dispatch(setProfileBackground(files[0]));
        NotificationService.success(i18next.t('general.notifications.profileBackgroundUpdated'));
      }
    } else {
      NotificationService.error(i18next.t('general.notifications.defaultError'));
    }
  };
  const handleOpenViewFileModal = (type: PhotoEntity) => {
    modalObserver.addModal(ModalNamesEnum.mediaViewer, {
      props: {
        media: type === 'avatar' ? [avatar] : [background],
        activeMedia: 0,
        entityType: type === 'avatar' ? PhotoEntityTypeEnum.avatar_preview : PhotoEntityTypeEnum.background,
        onDelete: (id: number, token: string) => handleDeleteFile(id, token, type),
        onUpdate: (files: AvatarModel[]) => handleUpdateFile(files, type),
        permission: {
          isDownload: true,
          isDelete: !isFriendProfile,
          isUpdate: !isFriendProfile,
        },
      },
    });
  };

  const handleAddFile = useCallback(
    (inputFile: any, type: PhotoEntity) => {
      if (!validateMediaFormat('photo', inputFile.type)) {
        NotificationService.success(t('mediaGallery.errors.fileTypeItem', { fileName: inputFile.name }));
      } else {
        modalObserver.addModal(ModalNamesEnum.photoCrop, {
          props: {
            img: inputFile,
            handleSavePhoto: (data: FormData, progressId: string) => handleSavePhoto(data, progressId, type),
            entityType:
              type === 'avatar' ? PhotoEntityTypeEnum.avatar_preview : PhotoEntityTypeEnum.background,
            isCropForBackground: type === 'background',
            loadingMediaId: uuidv4() || '',
            cropTitle:
              type === PhotoEntityTypeEnum.background
                ? t('mediaGallery.crop.coverPhotoTitle')
                : t('mediaGallery.crop.profilePhotoTitle'),
          },
        });
      }
    },
    [handleSavePhoto, t, validateMediaFormat],
  );

  return (
    <ProfileHeaderContainer isFriendProfile={isFriendProfile}>
      <ProfileHeaderAvatar isFriendProfile={isFriendProfile}>
        {avatar?.additional_info?.size_urls?.avatar_icon || avatar?.url ? (
          <Box
            sx={{ position: 'relative', zIndex: '4' }}
            onClick={(e) => {
              handleOpenViewFileModal('avatar');
              e.stopPropagation();
              e.preventDefault();
            }}
          >
            <AvatarContainer
              id={userId}
              firstName={firstName}
              lastName={lastName}
              size={isFriendProfile ? 'large' : isMobileDisplay ? 'large' : 'extraLarge'}
              src={avatar?.additional_info?.size_urls?.avatar_profile || avatar?.url || ''}
            />
          </Box>
        ) : (
          <Box>
            <Box
              sx={{ position: 'relative', zIndex: '1' }}
              onClick={() => {
                if (!isFriendProfile && avatarInputRef) {
                  avatarInputRef.current?.click();
                }
              }}
            >
              <AvatarContainer
                id={userId}
                firstName={firstName}
                lastName={lastName}
                size={isFriendProfile ? 'large' : isMobileDisplay ? 'large' : 'extraLarge'}
                src={avatar?.additional_info?.size_urls?.avatar_icon || avatar?.url || ''}
              />
            </Box>
            <input
              ref={avatarInputRef}
              onChange={(e: any) => handleAddFile(e.target.files[0], 'avatar')}
              accept={getAcceptedFormat('photo')}
              type="file"
              max={10}
              name="media"
              hidden
            />
          </Box>
        )}
      </ProfileHeaderAvatar>
      {background ? (
        <Box
          onClick={() => handleOpenViewFileModal('background')}
          sx={{
            position: 'absolute',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            cursor: 'pointer',
          }}
        >
          <img
            src={
              isMobileDisplay
                ? `${background?.additional_info?.size_urls?.background_sm || avatar?.url || ''}`
                : `${background?.additional_info?.size_urls?.background_lg || avatar?.url || ''}`
            }
            alt="bg-img"
            className="profile-bg-img"
          />
        </Box>
      ) : (
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            cursor: 'pointer',
          }}
          onClick={() => {
            if (!isFriendProfile && backgroudInputRef) {
              backgroudInputRef.current?.click();
            }
          }}
        >
          <img
            src={isMobileDisplay ? MobileBackgroundStub : DesktopBackgroundStub}
            alt="bg-img"
            className="profile-bg-stub"
          />
          <input
            ref={backgroudInputRef}
            onChange={(e: any) => handleAddFile(e.target.files[0], 'background')}
            accept={getAcceptedFormat('photo')}
            type="file"
            max={10}
            name="media"
            hidden
          />
        </Box>
      )}
    </ProfileHeaderContainer>
  );
};

export default ProfileHeader;

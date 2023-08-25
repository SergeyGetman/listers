import React, { useEffect, useMemo, useState } from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../shared/hooks/redux';
import { setBreadcrumbs } from '../../store/Common/commonThunk';
import ProfileDesktop from './components/ProfileDesktop';
import ProfileMobile from './components/ProfileMobile';
import ProfileHeader from './components/ProfileHeader';
import { getFullProfileInfo } from '../../store/Profile/profile.actions';
import { AddBottomButtonContainer } from '../../shared/styles/AddBottomButtonContainer';
import PlusActionMenu from '../../components/actionMenus/PlusActionMenu';
import { ModalNamesEnum } from '../../shared/enums/modalNames.enum';
import typeGuardFormActionMenu from '../../shared/functions/typeGuardFormActionMenu';
import ProfileSkeleton from './components/ProfileSkeleton';
import { MediaType } from '../../shared/models/media.model';
import { setProfileGallery } from '../../store/Profile/profile.slice';
import isEmptyObject from '../../shared/functions/isEmptyObject';
import modalObserver from '../../shared/utils/observers/modalObserver';

const Profile = () => {
  const theme = useTheme();
  const [isGetProfileInfo, setIsGetProfileInfo] = useState<boolean>(false);
  const isMobileDisplay = useMediaQuery(theme.breakpoints.down('sm'));
  const profileData = useAppSelector(({ profile }) => profile.data);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const isShowBodyArtActionBtn = profileData?.bodyArts?.length <= 5;
  const isOpenRightSidebar = useAppSelector(({ rightSidebar }) => rightSidebar.isOpenRightSidebar);

  const isShowAppearanceActionBtn = useMemo(() => {
    return isEmptyObject(profileData?.appearance);
  }, [profileData?.appearance]);

  useEffect(() => {
    dispatch(setBreadcrumbs([{ title: t('general.breadcrumbs.profile') }]));
  }, [dispatch, t]);

  useEffect(() => {
    setIsGetProfileInfo(false);
    dispatch(getFullProfileInfo()).then((result) => {
      if (getFullProfileInfo.fulfilled.match(result)) {
        setIsGetProfileInfo(true);
      }
    });
  }, [dispatch]);

  const menuList = useMemo(() => {
    return [
      isShowBodyArtActionBtn && {
        label: t('general.actionMenus.bodyArt'),
        callback: () => modalObserver.addModal(ModalNamesEnum.bodyArts, {}),
        isDisabled: false,
      },
      isShowAppearanceActionBtn && {
        label: t('general.actionMenus.appearance'),
        callback: () => modalObserver.addModal(ModalNamesEnum.profileAppearance, {}),
        isDisabled: false,
      },
    ].filter(typeGuardFormActionMenu);
  }, [isShowBodyArtActionBtn, isShowAppearanceActionBtn, t]);

  const handleUpdateProfileGallery = (newMedia: MediaType[]) => {
    dispatch(setProfileGallery(newMedia));
  };

  return (
    <>
      {isGetProfileInfo ? (
        <Box>
          <ProfileHeader
            isMobileDisplay={isMobileDisplay}
            avatar={profileData.avatar}
            background={profileData.background}
            userId={profileData.id}
            firstName={profileData.first_name}
            lastName={profileData.last_name}
          />
          {isMobileDisplay ? (
            <ProfileMobile
              handleUpdateProfileGallery={handleUpdateProfileGallery}
              isShowAppearanceActionBtn={isShowAppearanceActionBtn}
              profileData={profileData}
            />
          ) : (
            <ProfileDesktop
              handleUpdateProfileGallery={handleUpdateProfileGallery}
              isShowAppearanceActionBtn={isShowAppearanceActionBtn}
              profileData={profileData}
            />
          )}
        </Box>
      ) : (
        <ProfileSkeleton isMobileDisplay={isMobileDisplay} />
      )}
      {(isShowBodyArtActionBtn || isShowAppearanceActionBtn) && (
        <AddBottomButtonContainer isOpenRightSidebar={isOpenRightSidebar}>
          <PlusActionMenu menuList={menuList} />
        </AddBottomButtonContainer>
      )}
    </>
  );
};

export default Profile;

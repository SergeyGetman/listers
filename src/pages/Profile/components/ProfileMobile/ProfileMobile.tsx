/* eslint-disable @typescript-eslint/naming-convention */

import React, { FC } from 'react';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ProfileModel } from '../../../../shared/models/profile/profile.model';
import ProfileContactsContainer from '../../../../components/viewContainers/ProfileContactsContainer';
import ProfileGeneralInformationContainer from '../../../../components/viewContainers/ProfileGeneralInformationContainer';
import ProfileAppearanceContainer from '../../../../components/viewContainers/ProfileAppearanceContainer';
import ProfileBodyArtContainer from '../../../../components/viewContainers/ProfileBodyArtContainer';
import { MediaType } from '../../../../shared/models/media.model';
import Gallery from '../../../../components/media/Gallery';
import { PhotoEntityTypeEnum } from '../../../../shared/enums/photoEntityType.enum';
import MuiBaseMobileAccordion from '../../../../components/accordions/MuiBaseMobileAccordion';
type ProfileMobileProps = {
  profileData: ProfileModel;
  isShowAppearanceActionBtn: boolean;
  handleUpdateProfileGallery: (photos: MediaType[]) => void;
};
const ProfileMobile: FC<ProfileMobileProps> = ({
  profileData,
  isShowAppearanceActionBtn,
  handleUpdateProfileGallery,
}) => {
  const {
    first_name,
    middle_name,
    last_name,
    relationship_status,
    birth_day,
    gender,
    appearance,
    contacts,
    bodyArts,
    documents,
    gallery,
  } = profileData;
  const { t } = useTranslation();

  return (
    <Box sx={{ pb: '100px' }}>
      <ProfileGeneralInformationContainer
        isMobileDisplay
        relationship={relationship_status}
        gender={gender}
        fullName={`${first_name} ${!!middle_name ? middle_name : ''} ${last_name}`}
        birthday={birth_day}
        documents={documents}
        isEdit
      />
      {contacts && (
        <Box sx={{ mt: '16px' }}>
          <ProfileContactsContainer isMobileDisplay contacts={contacts} isEdit />
        </Box>
      )}

      <Box sx={{ mt: '16px' }}>
        <MuiBaseMobileAccordion
          title={t('general.containers.gallery')}
          subtitleText={t('general.containerInfo.photos')}
        >
          <Box sx={{ padding: '0 10px 16px 10px' }}>
            <Gallery
              entityType={PhotoEntityTypeEnum.gallery}
              isCanAddMediaFromClipboard={false}
              media={gallery}
              placeholder={t('general.placeholders.add_profile_photos')}
              permission={{ isDelete: true, isDownload: true, isUpdate: false }}
              onAddMedia={(newMedia: MediaType[]) => handleUpdateProfileGallery(newMedia)}
            />
          </Box>
        </MuiBaseMobileAccordion>
      </Box>

      {!isShowAppearanceActionBtn && (
        <Box sx={{ mt: '16px' }}>
          <ProfileAppearanceContainer isMobileDisplay isEdit gender={gender} appearance={appearance} />
        </Box>
      )}

      {!!bodyArts?.length && (
        <>
          {bodyArts.map((item, index) => (
            <Box key={index} sx={{ mt: '16px' }}>
              <ProfileBodyArtContainer isMobileDisplay isEdit bodyArt={item} />
            </Box>
          ))}
        </>
      )}
    </Box>
  );
};

export default ProfileMobile;

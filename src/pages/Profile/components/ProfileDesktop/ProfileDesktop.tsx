/* eslint-disable @typescript-eslint/naming-convention */

import React, { FC } from 'react';
import { Box, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import MuiBaseAccordion from '../../../../components/accordions/MuiBaseAccordion';
import Gallery from '../../../../components/media/Gallery';
import ProfileGeneralInformationContainer from '../../../../components/viewContainers/ProfileGeneralInformationContainer';
import { ProfileModel } from '../../../../shared/models/profile/profile.model';
import ProfileAppearanceContainer from '../../../../components/viewContainers/ProfileAppearanceContainer';
import ProfileContactsContainer from '../../../../components/viewContainers/ProfileContactsContainer';
import ProfileBodyArtContainer from '../../../../components/viewContainers/ProfileBodyArtContainer';
import { PhotoEntityTypeEnum } from '../../../../shared/enums/photoEntityType.enum';
import { MediaType } from '../../../../shared/models/media.model';

type ProfileDesktopProps = {
  profileData: ProfileModel;
  isShowAppearanceActionBtn: boolean;
  handleUpdateProfileGallery: (photos: MediaType[]) => void;
};
const ProfileDesktop: FC<ProfileDesktopProps> = ({
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
    <Grid container columnSpacing="20px" sx={{ pb: '100px', width: '100%', ml: '0 !important' }}>
      <Grid xs={6} item sx={{ pl: '0 !important' }}>
        <MuiBaseAccordion withHover label={t('general.containers.gallery')} isShowInfoDialog={false}>
          <Gallery
            entityType={PhotoEntityTypeEnum.gallery}
            isCanAddMediaFromClipboard={false}
            media={gallery}
            title={t('general.placeholders.add_profile_photos')}
            isShowSwiper
            permission={{ isDelete: true, isDownload: true, isUpdate: false }}
            onAddMedia={(newMedia: MediaType[]) => handleUpdateProfileGallery(newMedia)}
          />
        </MuiBaseAccordion>
        {!isShowAppearanceActionBtn && contacts && (
          <Box sx={{ mt: '30px' }}>
            <ProfileContactsContainer contacts={contacts} isEdit />
          </Box>
        )}
        {bodyArts[0] && (
          <Box sx={{ mt: '30px' }}>
            <ProfileBodyArtContainer isEdit bodyArt={bodyArts[0]} />
          </Box>
        )}
        {bodyArts[2] && (
          <Box sx={{ mt: '30px' }}>
            <ProfileBodyArtContainer isEdit bodyArt={bodyArts[2]} />
          </Box>
        )}
        {bodyArts[4] && (
          <Box sx={{ mt: '30px' }}>
            <ProfileBodyArtContainer isEdit bodyArt={bodyArts[4]} />
          </Box>
        )}
      </Grid>
      <Grid xs={6} item>
        <ProfileGeneralInformationContainer
          relationship={relationship_status}
          gender={gender}
          fullName={`${first_name} ${!!middle_name ? middle_name : ''} ${last_name}`}
          birthday={birth_day}
          documents={documents}
          isEdit
        />
        {isShowAppearanceActionBtn && contacts && (
          <Box sx={{ mt: '30px' }}>
            <ProfileContactsContainer contacts={contacts} isEdit />
          </Box>
        )}
        {!isShowAppearanceActionBtn && (
          <Box sx={{ mt: '30px' }}>
            <ProfileAppearanceContainer isEdit gender={gender} appearance={appearance} />
          </Box>
        )}

        {bodyArts[1] && (
          <Box sx={{ mt: '30px' }}>
            <ProfileBodyArtContainer isEdit bodyArt={bodyArts[1]} />
          </Box>
        )}
        {bodyArts[3] && (
          <Box sx={{ mt: '30px' }}>
            <ProfileBodyArtContainer isEdit bodyArt={bodyArts[3]} />
          </Box>
        )}
      </Grid>
    </Grid>
  );
};

export default ProfileDesktop;

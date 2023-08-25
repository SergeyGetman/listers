import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Grid, Typography } from '@mui/material';
import { setBreadcrumbs } from '../../store/Common/commonThunk';
import { useAppDispatch } from '../../shared/hooks/redux';
import { getOrganizerConfig, OrganizerItemType } from '../../shared/configs/organizer.config';
import OrganizersItem from './components/OrganizersItem';
import { OrganizerContainer } from './Organizer.style';
import { OrganizersEnum } from '../../shared/enums/organizers.enum';
import modalObserver from '../../shared/utils/observers/modalObserver';
import { ModalNamesEnum } from '../../shared/enums/modalNames.enum';

const Organizer = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  useEffect(() => {
    dispatch(setBreadcrumbs([{ title: t('general.breadcrumbs.organizer') }]));
  }, [dispatch, t]);

  const handleOpenOrganizerInfoModal = (type: OrganizersEnum) => {
    modalObserver.addModal(ModalNamesEnum.featureInfo, {
      props: {
        type,
      },
    });
  };

  return (
    <OrganizerContainer>
      <Box sx={{ marginBottom: '16px' }}>
        <Typography variant="large">{t('organizers.description')}</Typography>
      </Box>
      <Grid container rowSpacing={{ xs: '16px', lg: '16px' }} columnSpacing={{ xs: '16px', lg: '24px' }}>
        {getOrganizerConfig(t).map((item: OrganizerItemType) => (
          <Grid key={item.type} item xl={3} lg={4} md={6} sm={6}>
            <OrganizersItem item={item} handleOpenOrganizerInfoModal={handleOpenOrganizerInfoModal} />
          </Grid>
        ))}
      </Grid>
    </OrganizerContainer>
  );
};

export default Organizer;

import React from 'react';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ReactComponent as GarageIcon } from '../../../../../../assets/Images/newGarage/GarageMainPageForMobile.svg';

import { AddBottomButtonContainer } from '../../../../../../shared/styles/AddBottomButtonContainer';
import { useCreateGarageMainPageList } from '../../../../hooks/useCreateGarageMainPageList';
import GarageCreateActionMenu from '../../../../../../components/actionMenus/GarageCreateActionMenu/GarageCreateActionMenu';

export const GarageMainPageStubMobile = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { t } = useTranslation();

  const garageMobileList = useCreateGarageMainPageList(isMobile);

  return (
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="90%">
      <GarageIcon />
      <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" mt="16px">
        <Typography variant="s2" sx={{ color: theme.palette.case.neutral.n700 }}>
          {t('stubs.garage.noItemsStub.title1')}
        </Typography>
        <Typography variant="s2" sx={{ color: theme.palette.case.neutral.n700 }}>
          {t('stubs.garage.noItemsStub.title2').split('/')[0]}/
        </Typography>
        <Typography variant="s2" sx={{ color: theme.palette.case.neutral.n700 }}>
          {t('stubs.garage.noItemsStub.easyAccess')}
        </Typography>
      </Box>
      <AddBottomButtonContainer isOpenRightSidebar={false}>
        <GarageCreateActionMenu
          menuList={garageMobileList}
          header="Add your vehicle to Garage"
          isMobile={isMobile}
          childrenComponent={null}
        />
      </AddBottomButtonContainer>
    </Box>
  );
};

import React from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { PageStubContainer } from '../../../../../shared/styles/StubContainer';
import StubWithCreateVariants from '../../../../../components/stubs/StubWithCreateVariants';
import { GarageMainPageStubMobile } from './GarageMainPageStubMobile/GarageMainPageStubMobile';
import { useCreateGarageStubList } from '../../../hooks/useCreateGarageStubList';

export const GarageMainPageStub = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const { garageStubMenuList } = useCreateGarageStubList();

  return !isMobile ? (
    <Box>
      <PageStubContainer>
        <StubWithCreateVariants
          createItemList={garageStubMenuList}
          label={null}
          newLabel={[t('stubs.garage.noItemsStub.title1'), t('stubs.garage.noItemsStub.title2')]}
          version="v1"
        />
      </PageStubContainer>
    </Box>
  ) : (
    <GarageMainPageStubMobile />
  );
};

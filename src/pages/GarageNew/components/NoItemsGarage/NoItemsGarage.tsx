import { Typography, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { PageStubContainer } from '../../../../shared/styles/StubContainer';
import { ReactComponent as NoFilterIcon } from '../../../../assets/Images/no-filter-match.svg';
import { NoItemsGarageContainer } from './NoItemsGarage.style';

export const NoItemsGarage = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  return (
    <PageStubContainer>
      <NoItemsGarageContainer>
        <Typography
          sx={{ color: theme.palette.case.neutral.n800, maxWidth: '360px', textAlign: 'center' }}
          variant="h1"
        >
          {t('stubs.garage.noItemsStub.noFilter')}
        </Typography>
        <NoFilterIcon />
      </NoItemsGarageContainer>
    </PageStubContainer>
  );
};

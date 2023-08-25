import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ReactComponent as WifiSlash } from '../../../assets/Images/wifi-slash.svg';
import IconWrapper from './NoInternetConnection.style';

const NoInternetConnection = () => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        height: '100%',
        paddingTop: '15vh',
      }}
    >
      <IconWrapper>
        <WifiSlash />
      </IconWrapper>
      <Typography sx={{ paddingTop: '15px' }} variant="h2">
        {t('stubs.noInternetConnectionStub.title')}
      </Typography>
      <Typography sx={{ paddingTop: '10px' }}>{t('stubs.noInternetConnectionStub.subtitle')}</Typography>
    </Box>
  );
};

export default NoInternetConnection;

import React from 'react';
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import hubmeekError from '../../assets/Images/stub/hubmeek-not-found.svg';
import theme from '../../theme/theme';
import { ErrorNotFoundContainer } from './ErrorNotFound.style';

const ErrorNotFound = () => {
  const { t } = useTranslation();
  return (
    <ErrorNotFoundContainer>
      <Box sx={{ width: '100%', marginBottom: '16px', maxWidth: { sm: '400px', xs: '350px' } }}>
        <img src={hubmeekError} alt="Hubmeek" width="100%" />
      </Box>
      <Typography variant="h2" sx={{ mb: '16px' }}>
        {t('notFoundError.title')}
      </Typography>
      <Typography
        variant="large"
        sx={{
          mb: '16px',
          textAlign: 'center',
        }}
      >
        {t('notFoundError.description')}
      </Typography>
      <Link to="/">
        <Typography
          variant="default"
          sx={{ color: theme.palette.case.main.blue.middle, textDecorationLine: 'underline' }}
        >
          {t('notFoundError.link')}
        </Typography>
      </Link>
    </ErrorNotFoundContainer>
  );
};

export default ErrorNotFound;

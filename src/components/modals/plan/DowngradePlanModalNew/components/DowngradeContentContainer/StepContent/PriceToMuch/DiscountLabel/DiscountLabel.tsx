import { Typography, useMediaQuery, useTheme } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { DiscountLabelContainer } from './DiscountLabel.style';

export const DiscountLabel = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { t } = useTranslation();

  return (
    <DiscountLabelContainer isMobile={isMobile}>
      <Typography component="span" variant="t14r" sx={{ color: theme.palette.case.contrast.white }}>
        {t('plans.downgrade.priceToMuch.content.discountLabel')}
      </Typography>
    </DiscountLabelContainer>
  );
};

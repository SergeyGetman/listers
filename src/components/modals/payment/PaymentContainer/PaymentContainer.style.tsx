import { Box, styled } from '@mui/material';

export const PaymentCardContainer = styled(Box)(({ theme }) => ({
  width: '380px',
  height: '200px',
  borderRadius: '10px',
  boxShadow: theme.palette.case.shadow.small,
  padding: '10px',
}));

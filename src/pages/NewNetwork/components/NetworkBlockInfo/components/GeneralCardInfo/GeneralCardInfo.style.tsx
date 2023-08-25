import { Box, Typography, styled } from '@mui/material';

export const GeneralCardInfoTagContainer = styled(Box)(({ theme }) => ({
  borderRadius: '4px',
  background: theme.palette.case.blue.b50,
  padding: '4px 8px',
}));

export const GeneralCardInfoTagContent = styled(Typography)(({ theme }) => ({
  color: theme.palette.case.blue.b600,
}));

export const GeneralCardInfoTagIcon = styled(Box)(({ theme }) => ({
  width: '24px',
  height: '24px',
  borderRadius: '50%',
  background: theme.palette.case.aquamarine.a100,
  marginRight: '8px',
}));

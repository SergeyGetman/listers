import { Box, styled } from '@mui/material';

export const StyledCreateGarageItemContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.case.neutral.n75,
  height: '100%',
  width: '100%',
}));

export const StyledCreateGarageContentContainer = styled(Box)(() => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  marginTop: '28px',
}));

export const StyledCreateGarageContent = styled(Box)(() => ({
  width: '100%',
  height: '100vh',
  maxWidth: '960px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
}));

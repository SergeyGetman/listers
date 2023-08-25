import { Box, styled, Typography } from '@mui/material';

export const BuisenesCardStyle = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '360px',
  padding: '12px',
  height: '100%',
  background: 'white',
  border: `1px solid ${theme.palette.case.neutral.n200}`,
  borderRadius: '8px',

  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
}));

export const BuisenesCardText = styled(Box)(() => ({
  display: 'flex',
}));

export const DelBlock = styled(Typography)(() => ({
  display: 'flex',
  justifyContent: 'flex-end',
  marginLeft: 'auto',
  '&:hover': {
    cursor: 'pointer',
  },
}));

export const AvatarBox = styled(Box)(() => ({
  display: 'flex',
  padding: '12px',
}));

export const BoxTitle = styled(Typography)(() => ({
  display: 'flex',
  flexDirection: 'column',
  padding: '10px',
}));
export const BoxSubTitle = styled(Typography)(() => ({
  display: 'flex',
}));

export const BuisenesCardInfoText = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  margin: '10px',
  '& a': {
    padding: '6px',
  },
}));

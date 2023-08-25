import { Box, styled, Typography } from '@mui/material';

export const SmallStubContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  height: '100%',
}));

export const SmallStubTitle = styled(Typography)(({ theme }) => ({
  marginBottom: '25px',
  [theme.breakpoints.down('sm')]: {
    marginBottom: '16px',
  },
}));

export const SmallStubDescription = styled(Typography)(() => ({
  width: '100%',
  maxWidth: '406px',
  textAlign: 'center',
}));

export const SmallStubSubDescription = styled(Typography)(({ theme }) => ({
  width: '100%',
  maxWidth: '406px',
  textAlign: 'center',
  marginTop: '30px',
  color: theme.palette.case.neutral.n500,
}));

export const SmallStubButtonContainer = styled(Box)(({ theme }) => ({
  margin: '16px 0 0 0',
  [theme.breakpoints.down('sm')]: {
    padding: '0',
  },
}));

export const SmallStubImageContainer = styled(Box)(({ theme }) => ({
  marginTop: '30px',
  width: '130px',
  [theme.breakpoints.down('sm')]: {
    width: '110px',
  },
}));

import { Box, styled } from '@mui/material';

export const GarageAgencyStyle = styled(Box)(({ theme }) => ({
  padding: '28px 16px',

  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
}));

export const FlexContainerAgency = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
}));

export const EmptyLine = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  height: '2px',
  width: '50%',
  margin: '-10px 45px',
  background: theme.palette.case.neutral.n200,
}));

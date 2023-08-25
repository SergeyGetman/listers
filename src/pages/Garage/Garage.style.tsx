import { Box, styled } from '@mui/material';

export const GarageContainer = styled(Box)(() => ({
  display: 'flex',
  overflow: 'hidden',
  marginBottom: '20px',
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
  '& ::-webkit-scrollbar': {
    width: '0px !important',
  },
}));

export const GarageItemCardContainer = styled(Box)(({ theme }) => ({
  margin: '0  20px 30px 0',

  [theme.breakpoints.down('sm')]: {
    margin: '0  auto 30px auto',
  },
}));

export const GarageNoVehiclesStub = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  img: {
    width: '100% !important',
    maxWidth: '515px',
  },
}));

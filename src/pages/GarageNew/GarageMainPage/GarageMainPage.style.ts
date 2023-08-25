import { Box, styled } from '@mui/material';

export const GaragaPageContainer = styled(Box)(({ theme }) => ({
  msOverflowStyle: 'none',
  '& ::-webkit-scrollbar': {
    width: '0px !important',
  },
  height: '100%',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',

  marginLeft: '16px',
  marginRight: '16px',
  [theme.breakpoints.down('sm')]: {
    marginLeft: '0',
    marginRight: '0',
  },
}));

export const GarageCardItemContainer = styled(Box)(({ theme }) => ({
  width: 'calc(25% - 18px)',

  [theme.breakpoints.down('lg')]: {
    width: 'calc(33% - 14px)',
  },
  [theme.breakpoints.down('md')]: {
    width: 'calc(50% - 8px)',
  },

  [theme.breakpoints.between(1651, 2000)]: {
    width: 'calc(20% - 20px)',
  },
  [theme.breakpoints.between(1500, 1650)]: {
    width: 'calc(25% - 18px);',
  },
  [theme.breakpoints.between(1024, 1270)]: {
    width: 'calc(33% - 14px);',
  },
  [theme.breakpoints.between(1270, 1390)]: {
    width: 'calc(33% - 13px);',
  },
  [theme.breakpoints.between(767, 920)]: {
    width: 'calc(50% - 12px);',
  },
}));

export const GarageSkeletonContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '24px',
  flexWrap: 'wrap',
  width: '100%',
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
  '& ::-webkit-scrollbar': {
    width: '0px !important',
  },

  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
}));

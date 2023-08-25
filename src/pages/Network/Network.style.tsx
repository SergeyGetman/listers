import { Box, styled } from '@mui/material';

export const NetworkNavigationPanel = styled(Box)(({ theme }) => ({
  display: 'flex',
  marginBottom: '14px',
  marginTop: '4px',
  width: '100%',
  zIndex: 6,
  background: theme.palette.case.neutral.n75,
  '& .active': {
    color: `${theme.palette.case.contrast.white} !important`,
    backgroundColor: `${theme.palette.primary.main} !important`,
    borderColor: theme.palette.primary.main,
    boxShadow: 'none',
    svg: {
      path: {
        transition: '0.3s',
        fill: theme.palette.case.contrast.white,
      },
    },
  },
  a: {
    '&:hover': {
      opacity: 1,
    },
  },
}));

export const NetworkNavigationPanelInputContainer = styled(Box)(({ theme }) => ({
  marginRight: '16px',
  width: '100%',
  minWidth: '270px',
  maxWidth: '300px',
  [theme.breakpoints.down('sm')]: { width: '100%' },
}));

export const NetworkCardsContainer = styled(Box)(() => ({
  display: 'flex',
  flexGrow: 1,
  flexDirection: 'column',
  overflow: 'auto',
  scrollbarWidth: 'none',
}));

export const NetworkContainer = styled(Box)(() => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  scrollbarWidth: 'none',
  '& ::-webkit-scrollbar': {
    width: '0px !important',
  },
}));

export const NetworkListItemContainer = styled(Box)(({ theme }) => ({
  padding: '20px 0 16px 1px',
  display: 'grid',
  alignItems: 'center',
  gridTemplateColumns: 'repeat(auto-fill, minmax(228px, 228px))',
  gridRowGap: '28px',
  rowGap: '20px',
  gridColumnGap: '15px',
  columnGap: '15px',
  marginLeft: 'auto',
  marginRight: 'auto',
  [theme.breakpoints.down('sm')]: {
    padding: '15px 0 30px 0',
    gridTemplateColumns: '100%',
    gridRowGap: '15px',
    rowGap: '15px',
  },
}));

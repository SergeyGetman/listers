import { Box, styled, Badge } from '@mui/material';

export const HeaderContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isOpenLeftSidebar' && prop !== 'isShowRightSidebar',
})<{ isOpenLeftSidebar?: boolean }>(({ theme, isOpenLeftSidebar }) => ({
  width: isOpenLeftSidebar ? 'calc(100% - 250px)' : 'calc(100% - 48px)',
  backgroundColor: theme.palette.case.neutral.n75,
  marginLeft: isOpenLeftSidebar ? '226px' : '24px',
  marginRight: isOpenLeftSidebar ? '24px' : '24px',
  zIndex: 10,
  height: '52px',
  borderBottom: `1px solid ${theme.palette.case.neutral.n100}`,
  position: 'fixed',
  transition: theme.transitions.create('all', {
    easing: theme.transitions.easing.sharp,
    duration: '0.4s',
  }),
  left: 0,
  top: 0,
  [theme.breakpoints.down('md')]: {
    height: '48px',
    width: '100%',
    border: `none`,
    marginLeft: 0,
    marginRight: 0,
    backgroundColor: theme.palette.case.contrast.white,
    boxShadow: '0px 4px 8px rgba(38, 44, 74, 0.08)',
  },
}));

export const DefaultHeaderWrapper = styled(Box)(({ theme }) => ({
  alignItems: 'center',
  display: 'flex',
  height: '100%',
  transition: theme.transitions.create('all', {
    easing: theme.transitions.easing.sharp,
    duration: '0.4s',
  }),
  [theme.breakpoints.down('md')]: {
    paddingLeft: '16px',
    paddingRight: '16px',
  },
  [theme.breakpoints.down('sm')]: {
    justifyContent: 'space-between',
  },
}));

export const HeaderRightBtnContainer = styled(Box)(() => ({
  marginLeft: 'auto',
  display: 'flex',
}));

export const HeaderFilterCounterBlock = styled(Box)(({ theme }) => ({
  width: '16px',
  lineHeight: '11px',
  paddingLeft: '1px',
  paddingTop: '1px',
  color: theme.palette.case.contrast.black,
  backgroundColor: theme.palette.case.neutral.n100,
  borderRadius: '50%',
  display: 'flex',
  textAlign: 'center',
  justifyContent: 'center',
  alignItems: 'center',
}));

export const BadgeContainer = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    width: '8px',
    height: '8px',
    border: `1px solid ${theme.palette.case.contrast.white} `,
    borderRadius: '50%',
    right: '3px',
    top: '10px',
  },
}));

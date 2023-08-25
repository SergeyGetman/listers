import { Box, styled } from '@mui/material';

type PrivateRouteLayoutProps = {
  isOpenLeftSidebar: boolean;
  isShowRightSidebar?: boolean;
  isChat: boolean;
  isMessage: boolean;
};

export const PrivateRouteContainerStyles = styled(Box, {
  shouldForwardProp: (prop: string) =>
    !['isChat', 'isOpenLeftSidebar', 'isShowRightSidebar', 'isMessage'].includes(prop),
})<PrivateRouteLayoutProps>(({ theme, isOpenLeftSidebar, isShowRightSidebar, isChat, isMessage }) => ({
  backgroundColor: theme.palette.case.neutral.n75,
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  overflow: 'hidden',
  maxWidth: '1900px',
  overflowY: 'auto',
  overflowX: 'hidden',
  scrollbarWidth: 'none',
  marginLeft: isOpenLeftSidebar ? '226px' : '24px',
  marginRight: isShowRightSidebar ? '82px' : '24px',
  paddingTop: '66px',
  [theme.breakpoints.down('md')]: {
    marginLeft: '24px',
    marginRight: '24px',
    paddingTop: isMessage ? '54px' : '70px',
  },

  [theme.breakpoints.down('sm')]: {
    marginLeft: isMessage ? 0 : '16px',
    marginRight: isMessage ? 0 : '16px',
    paddingTop: isMessage ? '54px' : '70px',
  },

  transition: isChat
    ? 'none'
    : theme.transitions.create('all', {
        easing: theme.transitions.easing.sharp,
        duration: '0.4s',
      }),
  '::-webkit-scrollbar': {
    width: '0',
  },

  a: { color: theme.palette.case.main.blue.high, '&:hover': { opacity: '0.7' } },
}));

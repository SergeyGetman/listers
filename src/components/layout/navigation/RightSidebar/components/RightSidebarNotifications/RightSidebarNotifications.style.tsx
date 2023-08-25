import { Box, styled } from '@mui/material';

export const MenuButtonContainer = styled(Box, {
  shouldForwardProp: (prop: string) => !['isHover'].includes(prop),
})<{ isHover?: boolean }>(({ isHover, theme }) => ({
  width: '24px',
  height: '24px',
  borderRadius: '50%',
  background: isHover ? theme.palette.case.contrast.white : theme.palette.case.neutral.n50,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

export const NewsCardsContainer = styled(Box)(({ theme }) => ({
  height: 'calc(100vh - 145px)',
  paddingBottom: '40px',
  overflowY: 'scroll',
  MsOverflowStyle: 'none',
  scrollbarWidth: 'none',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
  [theme.breakpoints.down('md')]: {
    paddingBottom: '80px',
  },
}));

export const NotificationsHeaderTitleContainer = styled(Box)(() => ({
  width: '100%',
  maxWidth: '359px',
  margin: '16px auto 0 auto',
  display: 'flex',
  justifyContent: 'space-between',
}));

export const NotificationsContainer = styled(Box)(() => ({
  height: '100%',
  overflow: 'hidden',
  width: '100%',
  maxWidth: '375px',
  '@media (max-width: 440px)': {
    padding: '0 8px',
  },
}));

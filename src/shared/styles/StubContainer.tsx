import { Box, styled } from '@mui/material';

export const PageStubContainer = styled(Box, {
  shouldForwardProp: (prop: string) => !['isWelcomeSlider', 'isNoFilterMatch'].includes(prop),
})<{
  isNoFilterMatch?: boolean;
  isWelcomeSlider?: boolean;
  isArchive?: boolean;
}>(({ theme, isNoFilterMatch, isWelcomeSlider }) => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
  paddingTop: isNoFilterMatch ? '85px' : isWelcomeSlider ? '40px' : '155px',
  [theme.breakpoints.down('md')]: {
    alignItems: 'flex-start',
    paddingTop: isWelcomeSlider ? 0 : '60px',
  },
}));

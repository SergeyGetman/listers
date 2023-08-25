import { Box, styled } from '@mui/material';
import { PathMatch } from 'react-router';

type SettingsHeaderItemIconContainerProps = {
  isMatch?: PathMatch<string> | null;
  isComing?: boolean;
};

export const SettingsHeaderItemContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'baseline',
  justifyContent: 'center',
  marginRight: '16px',
  minWidth: '60px',
  paddingLeft: '16px',
  borderLeft: `1px solid ${theme.palette.case.neutral.n100}`,
  ':first-of-type': {
    paddingLeft: 0,
    border: 'none',
  },
  ':last-of-type': {
    marginRight: 0,
  },
}));

export const SettingsHeaderItemFlexContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
}));

export const SettingsHeaderItemIconContainer = styled(Box, {
  shouldForwardProp: (prop: string) => !['isMatch', 'isComing'].includes(prop),
})<SettingsHeaderItemIconContainerProps>(({ theme, isMatch, isComing }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: isMatch ? theme.palette.primary.main : theme.palette.case.background,
  padding: '14px',
  width: 50,
  height: 50,
  border: `1px solid ${isMatch ? theme.palette.primary.main : theme.palette.case.neutral.n100}`,
  borderRadius: '5px',
  marginBottom: '8px',
  svg: {
    width: 24,
    height: 24,
    path: {
      fill: isComing
        ? theme.palette.case.neutral.n400
        : isMatch
        ? theme.palette.case.background
        : theme.palette.primary.main,
    },
  },
  '&:hover': {
    backgroundColor: isComing ? theme.palette.case.background : theme.palette.primary.main,
    border: `1px solid ${isComing ? theme.palette.case.neutral.n100 : theme.palette.primary.main}`,
    transition: ' all .2s ease-in-out',
    svg: {
      path: {
        fill: isComing ? theme.palette.case.neutral.n400 : theme.palette.case.background,
      },
    },
  },
}));

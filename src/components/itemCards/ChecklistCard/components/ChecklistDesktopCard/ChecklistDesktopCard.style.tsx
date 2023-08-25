import { Box, styled } from '@mui/material';

// TODO add new color
export const Container = styled(Box)<{ isNotAcceptedItem: boolean }>(({ theme, isNotAcceptedItem }) => ({
  width: '100%',
  minWidth: '300px',
  maxWidth: '650px',
  height: '348px',
  background: theme.palette.case.neutral.n0,
  border: `1px solid ${isNotAcceptedItem ? '#2F861D' : theme.palette.case.neutral.n300}`,
  borderRadius: '8px',
  [theme.breakpoints.down('lg')]: {
    height: '348px',
  },
}));

export const Header = styled(Box)<{ isNotAcceptedItem: boolean }>(({ theme, isNotAcceptedItem }) => ({
  opacity: isNotAcceptedItem ? 0.7 : 1,
  display: 'flex',
  position: 'relative',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  height: '48px',
  padding: '0 12px',
  borderRadius: '5px 5px 0px 0px',
  borderBottom: `1px solid ${theme.palette.case.neutral.n300}`,
}));

export const HeaderIconContainer = styled(Box)(() => ({
  marginRight: '8px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '24px',
  flexShrink: 0,
  height: '24px',
  // TODO add new color
  background: '#EFF1FB',
  borderRadius: '4px',
  svg: {
    // TODO add new color
    width: '16px',
    height: '16px',
    path: { fill: '#2B324F' },
  },
}));

import { Box, styled } from '@mui/material';

// TODO add new color
export const Container = styled(Box)<{ isNotAcceptedItem: boolean }>(({ theme, isNotAcceptedItem }) => ({
  width: '100%',
  minWidth: '300px',
  maxWidth: '650px',
  height: '291px',
  background: theme.palette.case.neutral.n0,
  // TODO add new color
  border: `1px solid ${theme.palette.case.neutral.n300}`,
  borderColor: isNotAcceptedItem ? '#2F861D' : theme.palette.case.neutral.n300,
  borderRadius: '8px',

  [theme.breakpoints.down('sm')]: {
    width: '100%',
    height: isNotAcceptedItem ? '291px' : '230px',
  },
}));

export const Header = styled(Box)<{ isNotAcceptedItem: boolean }>(({ theme, isNotAcceptedItem }) => ({
  opacity: isNotAcceptedItem ? 0.7 : 1,
  pointerEvents: isNotAcceptedItem ? 'none' : 'auto',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  height: '48px',
  padding: '0 12px',
  borderRadius: '5px 5px 0px 0px',
  borderBottom: `1px solid ${theme.palette.case.neutral.n300}`,
}));

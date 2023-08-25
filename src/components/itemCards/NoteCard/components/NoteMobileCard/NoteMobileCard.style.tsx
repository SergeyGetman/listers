import { Box, styled } from '@mui/material';

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

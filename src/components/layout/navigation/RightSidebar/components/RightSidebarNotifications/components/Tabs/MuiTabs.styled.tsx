import { Box, styled } from '@mui/material';

export const MuiTabsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  maxWidth: '360px',
  width: '100%',
  flexDirection: 'row',
  border: `1px solid ${theme.palette.case.neutral.n100}`,
  borderRadius: '5px',
  margin: 'auto',
}));

export const MuiTabContainer = styled(Box)<{ selected?: boolean }>(({ selected, theme }) => ({
  width: '100%',
  padding: '8px 0',
  textAlign: 'center',
  borderRadius: '5px',
  background: selected ? theme.palette.case.primary.p500 : 'initial',
  color: selected ? 'white' : theme.palette.case.neutral.n700,
  cursor: 'pointer',
  transition: 'all 0.3s',
}));

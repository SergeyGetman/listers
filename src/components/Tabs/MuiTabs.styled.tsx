import { Box, styled } from '@mui/material';

export const MuiTabsContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'row',
  background: '#FFFFFF',
  borderRadius: '8px',
}));

export const MuiTabContainer = styled(Box)<{ selected?: boolean; isDisabled?: boolean }>(
  ({ selected, theme, isDisabled }) => ({
    minWidth: '110px',
    padding: '12px 0',
    textAlign: 'center',
    borderRadius: '8px',
    background: selected
      ? theme.palette.case.primary.p500
      : isDisabled
      ? theme.palette.case.neutral.n400
      : theme.palette.case.neutral.n50,
    color: selected ? 'white' : theme.palette.case.neutral.n700,
    cursor: isDisabled ? 'default' : 'pointer',
    boxShadow: selected ? '0px 4px 8px rgba(38, 44, 74, 0.16)' : 'none',
    transition: 'all 0.3s',
  }),
);

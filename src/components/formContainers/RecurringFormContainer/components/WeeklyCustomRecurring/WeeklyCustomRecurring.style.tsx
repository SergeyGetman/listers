import { Box, styled } from '@mui/material';

export const WeeklyRecurringCheckbox = styled(Box)<{ isSelected?: boolean }>(({ theme, isSelected }) => ({
  width: '40px',
  height: '40px',
  borderRadius: '5px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: isSelected
    ? `1px solid ${theme.palette.primary.main}`
    : `1px solid ${theme.palette.case.neutral.n200}`,
  backgroundColor: isSelected ? theme.palette.primary.main : 'transparent',
  color: isSelected ? theme.palette.case.contrast.white : theme.palette.case.neutral.n700,
  '&:hover': {
    color: `${theme.palette.case.contrast.white} !important`,
    backgroundColor: `${theme.palette.primary.main} !important`,
  },
}));

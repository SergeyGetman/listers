import { styled, Box } from '@mui/material';

export const PlannerDayBox = styled(Box)(({ theme }) => ({
  position: 'sticky',
  top: '0',
  zIndex: 3,
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  paddingBottom: '5px',
  marginBottom: '11px',
  backgroundColor: theme.palette.case.neutral.n75,
}));

import { Box, styled } from '@mui/material';

export const PlannerItemModalNotesItemContainer = styled(Box)(() => ({
  marginBottom: '12px ',
  width: '100%',
  maxWidth: '281px',
  height: '156px',
}));

export const PlannerItemModalNotesScrollableBlock = styled(Box)(() => ({
  marginTop: '16px',
  height: '100%',
  overflowX: 'auto',
  width: '100%',
}));

export const PlannerItemModalSkeletonBlock = styled(Box)(() => ({
  marginTop: '16px',
  width: '100%',
  display: 'flex',
  flexWrap: 'wrap',
  height: '100%',
  overflowX: 'auto',
  paddingBottom: '150px',
}));

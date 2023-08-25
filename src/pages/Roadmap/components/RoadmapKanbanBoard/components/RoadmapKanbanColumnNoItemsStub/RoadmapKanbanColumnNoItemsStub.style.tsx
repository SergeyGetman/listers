import { Box, styled, Typography } from '@mui/material';

export const RoadmapKanbanColumnNoItemsStubContainer = styled(Box)(({ theme }) => ({
  width: 320,
  height: 257,
  backgroundColor: theme.palette.case.contrast.white,
  borderRadius: '5px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
}));

export const RoadmapKanbanColumnNoItemsStubTitle = styled(Typography)(() => ({
  width: '200px',
  marginTop: '20px',
}));

export const RoadmapKanbanColumnNoItemsStubSubTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.case.neutral.n500,
  width: '240px',
  marginTop: '20px',
}));

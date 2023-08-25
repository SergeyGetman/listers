import { Box, styled } from '@mui/material';

export const TaskKanbanCardDraggable = styled(Box)(() => ({
  width: '320px',
  cursor: 'pointer',
  position: 'relative',
  zIndex: 2,
  paddingBottom: '20px',
  margin: '0 auto',
}));

export const TaskKanbanCardContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.case.contrast.white,
  boxShadow: `0px 0px 3px ${theme.palette.case.neutral.n200}`,
  borderRadius: '5px',
  padding: '10px',
  display: 'flex',
  flexDirection: 'column',
  cursor: 'pointer',
  width: '100%',
  height: '100%',
  transition: 'all 0.3',
  '& .kanban-card-dnd-btn': {
    opacity: 0,
  },
  '&:hover': {
    boxShadow: theme.palette.case.shadow.big,
    '& .kanban-card-dnd-btn': {
      opacity: 1,
      transition: 'opacity 0.3s',
    },
  },
}));

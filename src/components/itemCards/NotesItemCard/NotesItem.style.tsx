import { Box, Typography, styled } from '@mui/material';

export const NotesItemContainer = styled(Box)(({ theme }) => ({
  maxWidth: '320px',
  minWidth: '266px',
  height: '203px',
  border: `1px solid ${theme.palette.case.neutral.n100}`,
  borderRadius: '5px',
  display: 'flex',
  flexDirection: 'column',
  '&:hover': {
    boxShadow: theme.palette.case.shadow.big,
    '& .notes-item-remove-btn': {
      opacity: '1',
    },
  },

  '& .notes-item-remove-btn': {
    opacity: '0',
    transition: 'opacity 0.3s',
  },

  [theme.breakpoints.down('md')]: {
    '& .notes-item-remove-btn': {
      opacity: '1',
    },
  },
}));

export const NotesTitle = styled(Typography)(() => ({
  marginLeft: '5px',
  wordBreak: 'break-word',
  overflow: 'hidden',
  display: '-webkit-box',
  maxHeight: '39px',
  WebkitLineClamp: '2',
  WebkitBoxOrient: 'vertical',
}));

export const NotesBodyContainer = styled(Box)(() => ({
  height: '109px',
  marginBottom: '5px',
  overflowY: 'auto',
  '&::-webkit-scrollbar': {
    width: '6px',
  },
}));

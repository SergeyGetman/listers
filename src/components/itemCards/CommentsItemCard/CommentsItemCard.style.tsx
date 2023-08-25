import { Box, styled } from '@mui/material';

export const CommentsItemCardContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  width: '100%',
  marginBottom: '12px',
  paddingBottom: '12px',
  borderBottom: `1px solid ${theme.palette.case.neutral.n100}`,
  '&:hover': {
    '& .comments-item-remove-btn': {
      opacity: '1',
    },
  },

  '& .comments-item-remove-btn': {
    opacity: '0',
    transition: 'opacity 0.3s',
  },

  [theme.breakpoints.down('md')]: {
    '& .comments-item-remove-btn': {
      opacity: '1',
    },
  },
}));

export const CommentsItemCardMainInfo = styled(Box)(({ theme }) => ({
  display: 'flex',
  borderLeft: `2px solid ${theme.palette.case.neutral.n100}`,
  height: '100%',
  minHeight: '66px',
  width: '100%',
}));

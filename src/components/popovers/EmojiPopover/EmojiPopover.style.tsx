import { Box, Popover, styled } from '@mui/material';

export const EmojiPopoverContainer = styled(Popover)(({ theme }) => ({
  '& .MuiBackdrop-root': {
    backgroundColor: 'transparent',
  },
  '& .MuiPaper-root': {
    padding: '10px',
    boxSizing: 'border-box',
    boxShadow: theme.palette.case.shadow.big,
    display: 'flex',
    alignItems: 'center',
  },
}));

export const EmojiPopoverItem = styled(Box)(() => ({
  marginRight: '10px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  '.emoji-mart-emoji': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  '&:last-of-type': {
    marginRight: '0',
  },
}));

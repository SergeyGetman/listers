import { Box, Popover, styled, Typography } from '@mui/material';

export const EmojiHoverCountPopover = styled(Popover)(({ theme }) => ({
  '& .MuiBackdrop-root': {
    backgroundColor: 'transparent',
  },
  '& .MuiPaper-root': {
    padding: '10px',
    height: '156px',
    minWidth: '138px',
    boxShadow: theme.palette.case.shadow.big,
  },
}));

export const EmojiHoverCountPopoverContainer = styled(Box)(() => ({
  width: '138px',
  height: '30px',
  marginBottom: '10px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  '&:last-of-type': {
    marginBottom: 0,
  },
}));

export const EmojiHoverCountPopoverInfo = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  marginLeft: '10px',
}));

export const EmojiHoverCountPopoverRole = styled(Typography)(({ theme }) => ({
  color: theme.palette.case.neutral.n400,
}));

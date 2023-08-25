import { Box, Popover, styled } from '@mui/material';

export const InfoPopover = styled(Popover)(({ theme }) => ({
  '& .MuiBackdrop-root': {
    backgroundColor: 'transparent',
  },
  '& .MuiPaper-root': {
    height: '157px',
    padding: '10px',
    boxSizing: 'border-box',
    minWidth: '247px',
    boxShadow: theme.palette.case.shadow.big,
  },
}));

export const InfoPopoverContainer = styled(Box)(() => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
}));

export const InfoPopoverHeader = styled(Box)(() => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

export const InfoPopoverHeaderInfo = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  marginLeft: '5px',
  width: '150px',
}));

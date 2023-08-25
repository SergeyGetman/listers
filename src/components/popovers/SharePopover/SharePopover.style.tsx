import { Popover, styled } from '@mui/material';

export const SharePopoverStyle = styled(Popover)(({ theme }) => ({
  '& .MuiBackdrop-root': {
    backgroundColor: 'transparent',
  },
  '& .MuiPaper-root': {
    height: '400px',
    width: '400px',
    padding: '0px',
    borderRad: '8px',
    border: `1px solid ${theme.palette.case.neutral.n200}`,
    boxSizing: 'border-box',
    minWidth: '120px',
    overflow: 'hidden',
    boxShadow: '0px 2px 8px 0px rgba(38, 44, 74, 0.08)',
  },
}));

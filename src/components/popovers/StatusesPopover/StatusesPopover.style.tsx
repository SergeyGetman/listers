import { Popover, styled } from '@mui/material';

export const StatusesPopoverStyle = styled(Popover)(({ theme }) => ({
  '& .MuiBackdrop-root': {
    backgroundColor: 'transparent',
  },
  '& .MuiPaper-root': {
    minHeight: '100px',
    maxHeight: '176px',
    padding: '4px',
    borderRad: '8px',
    border: `1px solid ${theme.palette.case.neutral.n200}`,
    boxSizing: 'border-box',
    minWidth: '120px',
    width: '208px',
    boxShadow: '0px 2px 8px 0px rgba(38, 44, 74, 0.08)',
  },
}));

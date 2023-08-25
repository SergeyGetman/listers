import { Box, styled } from '@mui/material';

export const ChecklistItemContainer = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: '36px',
  margin: '4px 0 0 0 ',

  '&:hover': {
    // TODO  add new color
    background: '#EFF1FB',
  },
}));

import { Box, styled } from '@mui/material';

export const ChecklistItemContainer = styled(Box)(() => ({
  display: 'flex',
  position: 'relative',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  minHeight: '36px',
  padding: '4px 12px',
  // TODO  add new color
  borderBottom: '1px solid #F6F8FD',
  '&:hover': {
    // TODO  add new color
    background: '#EFF1FB',
  },
}));

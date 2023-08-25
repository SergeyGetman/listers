import { Box, styled } from '@mui/material';

export const HubsItemInfo = styled(Box)(({ theme }) => ({
  padding: '2px 10px',
  borderRadius: '50px',
  backgroundColor: theme.palette.primary.light,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

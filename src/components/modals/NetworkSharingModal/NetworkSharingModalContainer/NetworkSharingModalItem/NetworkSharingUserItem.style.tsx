import { Box, styled } from '@mui/material';

export const NetworkSharingItemContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '15px 5px',
  borderBottom: `1px solid ${theme.palette.case.neutral.n200}`,
}));

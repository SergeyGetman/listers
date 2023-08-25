import { Box, styled } from '@mui/material';

export const CreateItemModalHeaderContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '66px',
  display: 'flex',
  justifyContent: 'center',
  backgroundColor: theme.palette.case.neutral.n0,
  padding: '16px 0',
  borderBottom: `1px solid ${theme.palette.case.neutral.n300}`,
  boxShadow: theme.palette.case.shadow.default,
}));

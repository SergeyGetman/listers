import { Box, styled } from '@mui/material';

export const NoMessagesStubContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  maxWidth: '555px',
  height: '100%',
  margin: '0 auto',
});

export const StubLine = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '1px',
  background: theme.palette.case.neutral.n200,
  margin: '25px 0 15px',
}));

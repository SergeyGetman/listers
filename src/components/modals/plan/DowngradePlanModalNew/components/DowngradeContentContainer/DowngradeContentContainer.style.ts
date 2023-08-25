import { Box, styled } from '@mui/material';

export const HeaderDowngradeContentContainer = styled(Box, {
  shouldForwardProp: (prop: string) => !['isMobile'].includes(prop),
})<{ isMobile: boolean }>(({ isMobile }) => ({
  display: 'flex',
  justifyContent: 'center',
  flexWrap: 'wrap',
  width: '321px',
  textAlign: 'center',
  margin: '0 auto',
  padding: isMobile ? '16px 0 0 0' : '12px 0 16px 0',
}));

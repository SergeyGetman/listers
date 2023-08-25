import { Box, styled } from '@mui/material';

export const DiscountContainer = styled(Box, {
  shouldForwardProp: (prop: string) => !['isMobile'].includes(prop),
})<{ isMobile: boolean }>(({ isMobile }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  padding: isMobile ? '0 16px' : '0 24px',
  flexDirection: isMobile ? 'column' : 'row',
}));

export const TextContainer = styled(Box, {
  shouldForwardProp: (prop: string) => !['isMobile'].includes(prop),
})<{ isMobile: boolean }>(({ isMobile }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
  marginTop: isMobile ? '32px' : '0',
}));

export const DiscountBlock = styled(Box)(() => ({
  padding: '34px 0',
  marginTop: '24px',
  position: 'relative',
  background: `linear-gradient(146deg, #7FEA64 0%, #0DCDF7 100%)`,
  height: '100%',
  boxShadow: '0px 10px 30px 0px rgba(0, 0, 0, 0.04)',
  borderRadius: '8px',
}));

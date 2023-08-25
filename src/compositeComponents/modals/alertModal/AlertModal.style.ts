import { Box, styled } from '@mui/material';

export const ContentContainerAlertModal = styled(Box, {
  shouldForwardProp: (prop: string) => !['isMobile'].includes(prop),
})<{ isMobile: boolean }>(({ isMobile }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: isMobile ? '16px 0' : '24px 0',
}));

export const TextContainerAlertModal = styled(Box, {
  shouldForwardProp: (prop: string) => !['isMobile'].includes(prop),
})<{ isMobile: boolean }>(({ isMobile }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '4px',
  marginTop: '16px',
  padding: isMobile ? '0 24px' : '0',
  whiteSpace: 'pre-wrap',
}));

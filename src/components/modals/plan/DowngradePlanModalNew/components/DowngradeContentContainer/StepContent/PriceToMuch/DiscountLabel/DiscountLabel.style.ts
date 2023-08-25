import { Box, styled } from '@mui/material';

export const DiscountLabelContainer = styled(Box, {
  shouldForwardProp: (prop: string) => !['isMobile'].includes(prop),
})<{ isMobile: boolean }>(({ isMobile, theme }) => ({
  display: 'flex',
  position: 'absolute',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '0px 4px 4px 0px',
  height: '36px',
  maxWidth: '122px',
  top: isMobile ? '16px' : '24px',
  width: '100%',
  background: theme.palette.case.red.r500,
}));

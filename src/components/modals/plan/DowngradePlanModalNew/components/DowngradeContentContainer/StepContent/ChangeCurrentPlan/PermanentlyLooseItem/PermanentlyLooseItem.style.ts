import { Box, styled } from '@mui/material';

export const LooseItemBlock = styled(Box, {
  shouldForwardProp: (prop: string) => !['isMobile'].includes(prop),
})<{ isMobile: boolean }>(({ theme, isMobile }) => ({
  borderRadius: '8px',
  border: `1px solid ${theme.palette.case.neutral.n100}`,
  boxShadow: theme.palette.case.shadow.big,
  maxWidth: '180px',
  width: '100%',
  padding: '12px 16px',
  marginTop: isMobile ? '40px' : '0',
}));

export const LooseItem = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItem: 'flex-start',
  padding: '8px 0',
  gap: '6px',
}));

export const content_wrapper = {
  display: 'flex',
  flexDirection: 'column',
};
export const looseItemSubscriptionTitle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: '4px',
  alignItems: 'center',
};

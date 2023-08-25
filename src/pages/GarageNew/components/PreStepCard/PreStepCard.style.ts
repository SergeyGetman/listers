import { Box, styled } from '@mui/material';

export const IconContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '8px',
  border: `1px solid ${theme.palette.case.neutral.n200}`,
  width: '48px',
  height: '48px',
  backgroundColor: theme.palette.case.neutral.n0,
  marginRight: '16px',
}));

export const PreStepWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  borderRadius: '8px',
  border: `1px solid ${theme.palette.case.neutral.n200}`,
  background: theme.palette.background.paper,
}));

export const PreStepContentContainer = styled(Box, {
  shouldForwardProp: (prop: string) => !['isMobile'].includes(prop),
})<{ isMobile: boolean }>(({ isMobile, theme }) => ({
  display: 'flex',
  padding: isMobile ? '12px 16px' : '12px 24px',
  borderBottom: `1px solid ${theme.palette.case.neutral.n100}`,
}));

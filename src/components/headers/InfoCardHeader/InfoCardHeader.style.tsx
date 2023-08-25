import { Box, styled } from '@mui/material';

export const InfoCardHeaderContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'subTitle',
})<{ subTitle?: string }>(({ theme, subTitle }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: subTitle ? '92px' : '68px',
  width: '100%',
  borderRadius: '8px 8px 0px 0px',
  backgroundColor: 'white',
  padding: '20px 24px',
  borderBottom: `1px solid ${theme.palette.case.neutral.n200}`,
}));

import { Box, styled } from '@mui/material';

export const TextBlockContainer = styled(Box, {
  shouldForwardProp: (prop: string) => !['width'].includes(prop),
})<{ width: string }>(({ width }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: width,
}));

export const TextWrapper = styled(Box, {
  shouldForwardProp: (prop: string) => !['width'].includes(prop),
})<{ width: string }>(({ width }) => ({
  wordBreak: 'break-all',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  width: width,
}));

export const ItemContainer = styled(Box, {
  shouldForwardProp: (prop: string) => !['isMobile'].includes(prop),
})<{ isMobile: boolean }>(({ theme, isMobile }) => ({
  display: 'flex',
  alignItems: 'center',
  borderBottom: `1px solid ${theme.palette.case.neutral.n100}`,
  '&:last-child': {
    borderBottom: 'none',
  },
  padding: !isMobile ? '12px 24px' : '12px',
  gap: '24px',
}));

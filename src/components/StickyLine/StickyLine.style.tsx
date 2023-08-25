import { Box, styled } from '@mui/material';

export const StickyLineContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  background: theme.palette.case.neutral.n75,
  position: 'sticky',
  top: '-1px',
  zIndex: 5,
  width: '100%',
  height: '20px',
  svg: {
    width: '16px',
  },
}));

export const StickyDashedLine = styled(Box)(({ theme }) => ({
  borderTop: `1px dashed ${theme.palette.case.neutral.n300}`,
  width: '100%',
  marginRight: '8px',
}));

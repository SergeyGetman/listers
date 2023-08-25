import { Box, styled } from '@mui/material';

export const SliderViewContainerWithoutDoc = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '104px',
  height: '76px',
  padding: '12px 0',
  border: `1px dashed ${theme.palette.case.neutral.n200}`,
  borderRadius: '6px',
}));

export const SliderViewContentContainerWithoutDoc = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  gap: '6px',
}));

export const SliderViewContainerWithDoc = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  width: '104px',
  position: 'relative',
}));

export const SliderViewContentContainerWithDoc = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  width: '104px',
  position: 'relative',
}));

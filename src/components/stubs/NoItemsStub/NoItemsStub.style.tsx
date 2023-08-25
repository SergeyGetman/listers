import { Box, Typography, styled } from '@mui/material';

export const StubContainer = styled(Box)(({ theme }) => ({
  width: '343px',
  height: '256px',
  margin: 'auto',
  background: theme.palette.case.neutral.n0,
  border: `1px solid ${theme.palette.case.neutral.n300}`,
  borderRadius: '8px',
  textAlign: 'center',
}));

export const ImageMobileContainer = styled(Box)(() => ({
  width: '100%',
  maxWidth: '80px',
  margin: '54px auto 32px auto',
}));

export const TitleContainer = styled(Typography)(() => ({
  width: '280px',
  margin: 'auto',
}));

export const FirstTextWrap = styled(Typography)(() => ({
  // TODO add new color
  color: '#5A6384',
  fontWeight: 500,
}));

export const SecondTextWrap = styled(Typography)(() => ({
  // TODO add new color
  color: '#787F9D',
  fontWeight: 500,
}));

export const ImageContainer = styled(Box)(() => ({
  width: '120px',
  height: '120px',
  margin: 'auto',
}));

import { Box, styled, Typography } from '@mui/material';

export const PlannerBottomStubContainer = styled(Box)(() => ({
  width: '100%',
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));
export const PlannerBottomStubBox = styled(Box)(() => ({
  width: '260px',
  display: 'flex',
  justifyContent: 'flex-end',
  position: 'relative',
}));
export const PlannerBottomStubDescription = styled(Typography)(() => ({
  width: '182px',
  textAlign: 'center',
  position: 'absolute',
  top: '-10px',
  right: '80px',
}));

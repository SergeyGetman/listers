import { Box, styled } from '@mui/material';

export const RecurringFormContainerOverlay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  zIndex: '10',
  top: -3,
  width: ' 100%',
  height: '102%',
  backgroundColor: `${theme.palette.case.contrast.white}4D`,
}));

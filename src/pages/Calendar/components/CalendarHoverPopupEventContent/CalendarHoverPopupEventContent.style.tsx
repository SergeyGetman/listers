import { Box, styled } from '@mui/material';

export const CalendarHoverPopupEventContentBox = styled(Box)<{ color: string }>(({ theme, color }) => ({
  width: '100%',
  height: '32px',
  backgroundColor: color,
  display: 'flex',
  padding: '0 10px',
  alignItems: 'center',
  justifyContent: 'space-between',
  svg: {
    path: {
      fill: theme.palette.case.contrast.white,
    },
  },
}));

export const CalendarHoverPopupEventContentBoxTitle = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  maxWidth: '85%',
  svg: {
    width: '16px',
    marginRight: '10px',
    height: '16px',
    path: {
      fill: theme.palette.case.contrast.white,
    },
    rect: {
      stroke: theme.palette.case.contrast.white,
    },
  },
}));

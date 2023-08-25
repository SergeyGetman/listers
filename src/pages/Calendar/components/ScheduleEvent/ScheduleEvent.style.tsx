import { Box, styled } from '@mui/material';

export const ScheduleEventOllDay = styled(Box, {
  shouldForwardProp: (prop: string) => !['color', 'isPending'].includes(prop),
})<{ color: string; isPending: boolean }>(({ color, isPending, theme }) => ({
  padding: '2px 5px',
  background: isPending
    ? `repeating-linear-gradient(-45deg, ${theme.palette.case.contrast.gray1}4D, ${theme.palette.case.contrast.gray1}4D 4px, ${color}4D 4px, ${color}4D 14px )`
    : `${color}`,
  overflow: 'hidden',
  backgroundColor: color,
  borderRadius: '5px',
  width: '100%',
  height: '100%',
  '&:hover': {
    opacity: '0.7',
  },
}));
export const ScheduleEventContainer = styled(Box, {
  shouldForwardProp: (prop: string) => !['color', 'isPending', 'isMeybe'].includes(prop),
})<{ color: string; isPending: boolean; isMeybe: boolean }>(({ color, isPending, isMeybe, theme }) => ({
  padding: '0 3px',
  overflow: 'hidden',
  borderLeft: `5px solid ${color}`,
  borderRadius: '5px',
  background: isPending
    ? `repeating-linear-gradient(-45deg, ${theme.palette.case.contrast.gray1}, ${theme.palette.case.contrast.gray1} 12px, ${theme.palette.case.neutral.n100} 12px, ${theme.palette.case.neutral.n100} 25px )`
    : isMeybe
    ? `repeating-linear-gradient(-45deg, ${theme.palette.case.contrast.gray1}, ${theme.palette.case.contrast.gray1} 12px, ${color}33 12px, ${color}33 25px )`
    : `${color}33`,
  width: '100%',
  height: '100%',
  '&:hover': {
    opacity: '0.7',
  },
}));

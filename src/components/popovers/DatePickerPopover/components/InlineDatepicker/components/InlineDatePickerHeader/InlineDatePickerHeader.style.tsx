import { Box, styled } from '@mui/material';
import theme from '../../../../../../../theme/theme';

export const InlineDatepickerHeaderContainer = styled(Box)(() => ({
  display: 'flex',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'space-between',
  '& .mbsc-button': {
    padding: '0 !important',
  },
  '& .mbsc-calendar-title': {
    fontSize: '14px',
    lineHeight: '20px',
    fontWeight: '500',
    color: `${theme.palette.case.neutral.n600} !important`,
  },
  '& .mbsc-button-flat': {
    fontSize: '14px',
    lineHeight: '20px',
    color: theme.palette.case.neutral.n600,
  },
  '& .mbsc-calendar-button-today': {
    color: `${theme.palette.case.neutral.n600} !important`,
  },
  '& .mbsc-icon-button': {
    width: '20px',
    height: '20px',
    padding: '0px',
    svg: {
      path: {
        fill: theme.palette.case.neutral.n500,
      },
    },
  },
}));

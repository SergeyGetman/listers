import { Box, styled } from '@mui/material';
import theme from '../../../../../theme/theme';

export const InlineDatepickerContainer = styled(Box)(() => ({
  '& .mbsc-calendar-slide': {
    padding: '0 !important',
  },
  '& .mbsc-ios.mbsc-datepicker-inline': {
    border: 'none',
  },
  '& .mbsc-datepicker .mbsc-calendar': {
    padding: '0',
  },
  '& .mbsc-ios.mbsc-hover .mbsc-calendar-cell-text': {
    backgroundColor: `${theme.palette.case.neutral.n100} !important`,
    opacity: '1',
  },
  '& .mbsc-ios.mbsc-hover.mbsc-selected .mbsc-calendar-cell-text ': {
    backgroundColor: `${theme.palette.case.primary.p600} !important`,
  },
  '& .mbsc-range-day-start .mbsc-calendar-cell-inner': {
    backgroundColor: `${theme.palette.case.primary.p600} !important`,
    borderRadius: '5px 0px 0px 5px',
    '& .mbsc-calendar-cell-text': {
      backgroundColor: `${theme.palette.case.primary.p600} !important`,
      borderColor: `${theme.palette.case.primary.p600} !important`,
    },
  },

  '& .mbsc-range-day-end .mbsc-calendar-cell-inner': {
    backgroundColor: `${theme.palette.case.primary.p600} !important`,
    borderRadius: '0px 5px 5px 0px',
    '& .mbsc-calendar-cell-text': {
      backgroundColor: `${theme.palette.case.primary.p600} !important`,
      borderColor: `${theme.palette.case.primary.p600} !important`,
    },
  },
  '& .mbsc-range-day-start.mbsc-range-day-end .mbsc-calendar-cell-inner': {
    backgroundColor: `transparent !important`,
    borderRadius: 'none !important',
    '& .mbsc-calendar-cell-text': {
      backgroundColor: `${theme.palette.case.primary.p600} !important`,
      borderColor: `${theme.palette.case.primary.p600} !important`,
    },
  },
  '& .mbsc-ios.mbsc-range-day:after': {
    backgroundColor: `${theme.palette.case.primary.p50} !important`,
    height: '32px',
    top: '0px',
  },
  '& .mbsc-range-hover:before': {
    left: '0px',
    right: '0px',
    height: '32px !important',
    top: '0px !important',
  },
  '& .mbsc-ios.mbsc-calendar-today': {
    color: theme.palette.case.primary.p600,
  },
  '& .mbsc-ios.mbsc-range-hover-end.mbsc-ltr:before': {
    right: '57% !important',
  },
  '& .mbsc-calendar-cell-text': {
    fontSize: '14px !important',
  },
  '& .mbsc-selected .mbsc-calendar-cell-text': {
    backgroundColor: `${theme.palette.case.primary.p600} !important`,
  },
  '& .mbsc-calendar-cell': {
    width: '40px !important',
    height: '32px !important',
    border: 'none !important',
  },
  '& .mbsc-calendar-day-text': {
    width: '30px !important',
    height: '30px !important',
    border: 'none !important',
    margin: '0 !important',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  '& .mbsc-calendar-row': {
    height: '40px',
    padding: '4px 0',
    borderBottom: `1px solid ${theme.palette.case.neutral.n100}`,
    '&:last-child': {
      border: 'none !important',
    },
  },
  '& .mbsc-calendar-cell-inner': {
    display: 'flex',
    justifyContent: 'center',
  },
  '& .mbsc-ios.mbsc-calendar-week-day': {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '32px',
    fontSize: '14px !important',
    color: theme.palette.case.neutral.n500,
    fontWeight: 400,
  },
  '& .mbsc-calendar-week-days': {
    borderBottom: `1px solid ${theme.palette.case.neutral.n100}`,
  },
}));

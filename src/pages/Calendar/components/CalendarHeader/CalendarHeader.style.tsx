import { Box, styled } from '@mui/material';

export const CalendarHeaderContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',

  '& .calendar-header-filter-btn': {
    marginLeft: '16px',
  },

  '& .mbsc-calendar-button': {
    padding: '0',
    display: 'flex',
    alignItems: 'baseline',
  },
  '& .mbsc-calendar-title': {
    paddingLeft: '0',
  },
  '& .mbsc-calendar-month, .mbsc-calendar-title': {
    color: theme.palette.case.neutral.n700,
    fontSize: `${theme.typography.h2.fontSize} !important`,
    lineHeight: `${theme.typography.h2.lineHeight} !important`,
    fontWeight: `${theme.typography.h2.fontWeight} !important`,
  },
  '& .mbsc-calendar-year': {
    color: theme.palette.case.neutral.n700,
    fontSize: `${theme.typography.h3.fontSize} !important`,
    lineHeight: `${theme.typography.h3.lineHeight} !important`,
    fontWeight: `${theme.typography.h3.fontWeight} !important`,
  },
  '& .header-bottom-container': {
    alignItems: 'baseline',
  },
  [theme.breakpoints.down('sm')]: {
    '& .header-bottom-container': {
      alignItems: 'flex-start',
    },
    '& .calendar-header-filter-btn': {
      marginLeft: '0',
    },
    '& .mbsc-calendar-month, .mbsc-calendar-title': {
      fontSize: `${theme.typography.large.fontSize} !important`,
      lineHeight: `${theme.typography.large.lineHeight} !important`,
    },
    '& .mbsc-calendar-year': {
      fontSize: `${theme.typography.default.fontSize} !important`,
      fontWeight: `${theme.typography.default.fontWeight} !important`,
    },
  },
}));

export const CalendarHeaderControlsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',

  '& .arrow-btn': {
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '36px',
    width: ' 28px',
    border: `1px solid ${theme.palette.case.neutral.n200}`,
    borderRadius: '5px',
    svg: {
      path: {
        fill: theme.palette.case.neutral.n700,
      },
    },
    '&:hover': {
      opacity: 0.6,
    },
    [theme.breakpoints.down('sm')]: {
      height: '26px',
      width: ' 26px',
    },
  },

  '& .md-custom-header-today': {
    cursor: 'pointer',
    color: `${theme.palette.case.neutral.n700} !important`,
    display: 'flex',
    alignItems: 'center !important',
    padding: '0 10px !important',
    height: '36px',
    borderRadius: '5px',
    border: `1px solid ${theme.palette.case.neutral.n200} !important`,

    backgroundColor: 'transparent',
    fontSize: theme.typography.small_bolt.fontSize,
    '&:hover': {
      opacity: 0.7,
      border: `1px solid ${theme.palette.case.neutral.n200} !important`,
    },
    [theme.breakpoints.down('sm')]: {
      height: '26px',
    },
  },
}));

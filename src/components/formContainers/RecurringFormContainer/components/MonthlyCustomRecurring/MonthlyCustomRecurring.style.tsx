import { Box, styled } from '@mui/material';

export const MonthlyCustomRecurringCalendar = styled(Box)(({ theme }) => ({
  marginTop: '16px',
  '& .react-datepicker__navigation, .react-datepicker__header ': {
    display: 'none',
  },
  '& .react-datepicker__month-container, .react-datepicker': {
    width: '100%',
    backgroundColor: 'transparent',
    boxShadow: 'none',
  },
  '& .react-datepicker__week': {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  '& .react-datepicker__day': {
    borderRadius: '50%',
    color: theme.palette.case.neutral.n700,
    fontSize: theme.typography.default.fontSize,
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.case.contrast.white,
    },
  },
  '& .react-datepicker__day--outside-month': {
    opacity: '0',
    cursor: 'default',
    pointerEvents: 'none',
  },
}));

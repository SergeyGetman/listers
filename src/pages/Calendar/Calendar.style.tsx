import { Box, styled } from '@mui/material';

export const CalendarContainer = styled(Box)(({ theme }) => ({
  fontFamily: 'Archivo !important',
  height: '100%',
  paddingBottom: '5px',
  paddingLeft: '3px',

  '& .mbsc-schedule-time-indicator-time': {
    backgroundColor: 'transparent !important',
  },

  '& .mbsc-popup-content': {
    '& .mbsc-calendar-button': {
      color: `${theme.palette.primary.main} !important`,
    },
    '& .mbsc-selected': {
      '.mbsc-calendar-cell-text': {
        color: theme.palette.case.contrast.white,
        borderColor: `${theme.palette.primary.main} !important`,
        backgroundColor: `${theme.palette.primary.main} !important`,
      },
    },
    '.mbsc-hover': {
      '.mbsc-calendar-cell-text': {
        color: theme.palette.case.contrast.white,
        background: `${theme.palette.primary.main} !important`,
        borderColor: `${theme.palette.primary.main} !important`,
      },
    },
    '.mbsc-list-item': {
      borderColor: `${theme.palette.case.neutral.n400} !important`,
      backgroundColor: `${theme.palette.case.neutral.n50} !important`,
      paddingTop: ' 8px',
      paddingBottom: '8px',
      '&:before': {
        borderTop: `1px solid ${theme.palette.case.neutral.n400} !important`,
      },
    },
  },

  '& .mbsc-ios.mbsc-calendar': {
    backgroundColor: 'transparent !important',
  },
  '& .mbsc-calendar-header': {
    backgroundColor: 'transparent !important',
  },
  '& .mbsc-ios.mbsc-calendar-controls': {
    padding: '0',
  },
  '& .mbsc-calendar-wrapper': {
    borderColor: theme.palette.case.neutral.n200,
  },
  '& .mbsc-calendar-label-hover': {
    '& .mbsc-calendar-label-background': {
      opacity: '0.7 !important',
    },
  },

  '& .desktop-month-container': {
    '& .mbsc-calendar-table': {
      borderLeft: `1px solid ${theme.palette.case.neutral.n200}`,
    },
    '& .mbsc-calendar-day-inner': {
      border: 'none !important',
    },
    '& .mbsc-calendar-week-days': {
      backgroundColor: theme.palette.case.neutral.n50,

      '& .mbsc-ltr': {
        textAlign: 'left !important',
        fontSize: theme.typography.default_bolt.fontSize,
        lineHeight: theme.typography.default_bolt.lineHeight,
        fontWeight: theme.typography.default_bolt.fontWeight,
        color: theme.palette.case.neutral.n700,
      },
      '& .mbsc-calendar-week-day': {
        height: '30px',
        border: 'none !important',
        verticalAlign: 'middle',
      },
    },
    '& .mbsc-calendar-cell': {
      border: `1px solid ${theme.palette.case.neutral.n100} !important`,
    },
    '& .mbsc-calendar-cell-inner': {
      paddingTop: '4px',
      '& .mbsc-calendar-month-name': {
        color: theme.palette.case.neutral.n700,
        fontSize: '16px',
        marginLeft: '9px',
      },
      '& .mbsc-calendar-day-text': {
        display: 'inline-block',
        fontSize: '14px',
      },

      '& .mbsc-calendar-label-start': {
        borderRadius: '5px 0 0 5px',
        '& .multi-day-event': {
          borderTopLeftRadius: '5px !important',
          borderBottomLeftRadius: ' 5px !important',
        },
      },
      '& .mbsc-calendar-label-end': {
        '& .multi-day-event': {
          borderTopRightRadius: '5px !important',
          borderBottomRightRadius: '5px !important',
        },
      },

      '& .mbsc-calendar-label-hover': {
        '& .mbsc-calendar-label-text': {
          fontSize: theme.typography.small.fontSize,
          color: theme.palette.primary.main,
        },
        '&:before': {
          backgroundColor: 'transparent',
        },

        '& .multi-day-event': {
          opacity: '0.8 !important',
        },
        '& .custom-single-day-item': {
          opacity: '0.8 !important',
        },
      },

      '& .mbsc-calendar-labels': {
        marginTop: '4px',
        '& .mbsc-calendar-label-text': {
          fontSize: theme.typography.small.fontSize,
          fontWeight: theme.typography.small.fontWeight,
          color: theme.palette.case.contrast.white,
        },
      },
      '& .mbsc-calendar-text-more': {
        '& .mbsc-calendar-label-text': {
          fontSize: theme.typography.small.fontSize,
          fontWeight: theme.typography.small.fontWeight,
          color: theme.palette.case.contrast.black,
          '&:hover': {
            color: `${theme.palette.primary.main} !important`,
          },
        },
      },
      '& .mbsc-calendar-label-active:before': {
        backgroundColor: 'transparent !important',
      },
    },
    '& .mbsc-calendar-today': {
      color: theme.palette.primary.main,
    },
    '& .mbsc-hover': {
      '& .mbsc-calendar-cell-text': {
        background: `${theme.palette.case.main.yellow.light}   !important`,
        borderColor: `${theme.palette.case.main.yellow.light}  !important`,
        color: theme.palette.case.contrast.black,
      },
    },
    '& .mbsc-selected': {
      '& .mbsc-calendar-cell-text': {
        background: `${theme.palette.case.main.yellow.high} !important`,
        borderColor: `${theme.palette.case.main.yellow.high} !important`,
        color: theme.palette.case.contrast.white,
      },
    },
    '& .mbsc-calendar-day': {
      '&:after': {
        borderColor: 'transparent !important',
      },
      textAlign: 'left !important',
    },
    ' & .mbsc-calendar-day-outer': {
      backgroundColor: `${theme.palette.case.neutral.n50} !important`,
      '& .mbsc-calendar': {
        backgroundColor: `${theme.palette.case.neutral.n50} !important`,
      },
      '& .mbsc-calendar-cell': {
        backgroundColor: `${theme.palette.case.neutral.n50} !important`,
      },
    },

    '& .multi-day-event': {
      fontSize: theme.typography.small.fontSize,
      fontWeight: theme.typography.small.fontWeight,
      padding: '0 7px',
      color: theme.palette.case.contrast.white,
      fontFamily: theme.typography.fontFamily,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    '.custom-single-day-item': {
      fontSize: theme.typography.small.fontSize,
      fontWeight: theme.typography.small.fontWeight,
      width: '100%',
      display: 'flex',
      padding: '0 4px 0 7px',
      alignItems: 'center',

      '& .single-day-event-dot': {
        flexShrink: '0',
        width: '9px',
        height: '9px',
        borderRadius: '50%',
        marginRight: '5px',
      },

      '& .single-day-event': {
        width: '100%',
        color: theme.palette.error.main,
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
      },
      '& .single-day-event-time': {
        fontSize: theme.typography.extra_small.fontSize,
        fontWeight: theme.typography.extra_small.fontWeight,
        color: theme.palette.case.neutral.n400,
        marginLeft: '5px',
        paddingTop: '1px',
      },
    },

    '.mbsc-calendar-label-hover': {
      '.mbsc-calendar-label-background': {
        opacity: '0.6 !important',
      },
    },
  },
  '& .desktop-week-container': {
    '.mbsc-schedule-event-inner': {
      paddingTop: 0,
    },
    '.mbsc-schedule-event-range': {
      display: 'none',
    },
    '.mbsc-schedule-events': {
      '.mbsc-schedule-event-background': {
        opacity: 0.2,
      },
      '.mbsc-schedule-event-title': {
        color: `${theme.palette.case.neutral.n50} !important`,
        fontSize: theme.typography.extra_small.fontSize,
        fontWeight: theme.typography.extra_small.fontWeight,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      },
      '.mbsc-schedule-event-range': {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        color: `${theme.palette.case.neutral.n700} !important`,
        fontSize: theme.typography.extra_small.fontSize,
        fontWeight: theme.typography.extra_small.fontWeight,
      },

      '.mbsc-schedule-event': {
        paddingTop: '5px',
        minHeight: '20px',
      },
    },

    '.mbsc-schedule-all-day-group-wrapper': {
      overflowY: 'scroll',
      scrollbarWidth: 'none',
    },
    '.mbsc-schedule-all-day-wrapper': {
      maxHeight: ' 300px !important',
      minHeight: '40px',
      overflow: 'auto',
    },
    '.mbsc-schedule-all-day': {
      overflow: 'auto',
      paddingRight: '3px',
      resize: 'vertical',
      maxHeight: '300px',
      minHeight: '40px',
      height: ' 40px',
    },
    '.mbsc-schedule-header-item': {
      borderLeft: 'none !important',
      borderRight: `1px solid ${theme.palette.case.neutral.n200} !important`,

      '& .mbsc-schedule-header-dayname, .mbsc-schedule-header-day': {
        display: 'inline-block',
        textTransform: 'capitalize',
        color: theme.palette.case.neutral.n700,
        fontSize: theme.typography.default_bolt.fontSize,
        fontWeight: theme.typography.default_bolt.fontWeight,
      },
      '.mbsc-schedule-header-dayname:': {
        marginRight: '5px',
        padding: 0,
      },
    },
    '& .mbsc-selected': {
      '.mbsc-schedule-header-day': {
        background: `${theme.palette.case.main.yellow.high} !important`,
        borderColor: `${theme.palette.case.main.yellow.high} !important`,
        color: theme.palette.case.contrast.white,
      },
    },

    '.mbsc-schedule-header': {
      borderColor: `${theme.palette.case.neutral.n100} !important`,
      backgroundColor: `${theme.palette.case.neutral.n50}  !important`,
    },

    '& .mbsc-schedule-all-day-wrapper, .mbsc-schedule-column, .mbsc-schedule-resource-group, .mbsc-schedule-item':
      {
        borderColor: `${theme.palette.case.neutral.n100} !important`,
      },
    '.mbsc-schedule-time-col': {
      borderRight: 'none !important',
    },
    '& .mbsc-schedule-time-wrapper:after': {
      borderColor: `${theme.palette.case.neutral.n100} !important`,
    },
    '.mbsc-schedule-all-day-item:after': {
      borderColor: `${theme.palette.case.neutral.n100} !important`,
    },
    '.mbsc-schedule-grid-wrapper': {
      backgroundColor: theme.palette.case.neutral.n50,
    },
    '& .mbsc-schedule-time, .mbsc-schedule-all-day-text': {
      textAlign: 'center',
      fontSize: theme.typography.extra_small_bolt.fontSize,
      color: theme.palette.case.contrast.black,
    },
    '.mbsc-schedule-time': {
      fontSize: theme.typography.extra_small_bolt.fontSize,
    },
    '.mbsc-schedule-all-day-text': {
      fontSize: `${theme.typography.extra_small.fontSize} !important`,
      textTransform: 'none !important',
    },

    '.mbsc-schedule-event-all-day-title': {
      fontSize: theme.typography.small.fontSize,
      fontWeight: theme.typography.small.fontWeight,
      fontFamily: theme.typography.small.fontFamily,

      color: `${theme.palette.case.contrast.white} !important`,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    '.mbsc-schedule-event-all-day-background': {
      opacity: 1,
    },
  },
  '& .desktop-year-container, .mobile-year-container': {
    '.mbsc-calendar-grid-item': {
      marginTop: '0px !important',
    },
    '.mbsc-calendar-cell-text': {
      color: theme.palette.case.neutral.n700,
    },
    '.md-custom-header-controls': {
      height: '30px',
    },
    '.mbsc-calendar-grid': {
      border: 'none',
      backgroundColor: theme.palette.case.neutral.n50,
    },
    '.mbsc-calendar-month-title': {
      textAlign: 'center',
      color: theme.palette.case.contrast.black,
      fontSize: theme.typography.large.fontSize,
    },
    '.mbsc-calendar-week-day': {
      color: theme.palette.case.neutral.n700,
      fontWeight: theme.typography.default_bolt.fontWeight,
      fontSize: theme.typography.default_bolt.fontSize,
    },
    '.mbsc-calendar-day-text': {
      fontSize: theme.typography.default_bolt.fontSize,
    },
    '.mbsc-calendar-cell': {
      position: 'relative',
      backgroundColor: `${theme.palette.case.neutral.n50} !important`,
    },

    '.mbsc-calendar-mark': {
      backgroundColor: `${theme.palette.primary.main} !important`,
    },

    '.mbsc-calendar-today': {
      color: `${theme.palette.primary.main} !important`,
    },
    '.mbsc-hover': {
      '.mbsc-calendar-cell-text': {
        background: `${theme.palette.case.main.yellow.middle} !important`,
        borderColor: `${theme.palette.case.main.yellow.middle} !important`,
        color: `${theme.palette.case.contrast.white} !important`,
      },
    },
    '.mbsc-selected': {
      '.mbsc-calendar-cell-text': {
        background: `${theme.palette.case.main.yellow.high} !important`,
        borderColor: `${theme.palette.case.main.yellow.high} !important`,
        color: `${theme.palette.case.contrast.white} !important`,
      },
    },
  },

  '& .mobile-week-container': {
    padding: '0px !important',
    '& .mbsc-schedule-event-inner': {
      paddingTop: 0,
    },

    '.mobile-calendar-header': {
      padding: '0 10px',
    },
    '.mbsc-schedule-grid-wrapper': {
      paddingBottom: '5px',
    },
    '.mbsc-calendar-day-marked': {
      paddingBottom: '10px !important',
    },
    '.mbsc-schedule-time-col, .mbsc-timeline-resource-col': {
      width: '4em !important',
    },
    '.mbsc-schedule-all-day-text': {
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },

    '.mbsc-schedule-item': {
      height: '2.525em !important',
      backgroundColor: `${theme.palette.case.neutral.n50} !important`,
      borderColor: `${theme.palette.case.neutral.n100} !important`,
    },
  },

  '& .mobile-week-container, .mobile-month-container': {
    '.mbsc-eventcalendar-schedule, .mbsc-calendar-day': {
      backgroundColor: `${theme.palette.case.neutral.n50} !important`,
    },
    '.mbsc-schedule-all-day-group-wrapper': {
      overflowY: 'scroll',
    },
    '.mbsc-schedule-all-day-wrapper': {
      maxHeight: '80px !important',
      overflow: 'auto',
      borderBottom: `1px solid ${theme.palette.case.neutral.n100} !important`,
      backgroundColor: theme.palette.case.neutral.n50,
    },
    '.mbsc-schedule-all-day': {
      overflow: 'auto',
      maxHeight: '80px',
      minHeight: '40px',
    },

    '.mbsc-schedule-header': {
      display: 'none',
      borderColor: `${theme.palette.case.neutral.n100} !important`,
      backgroundColor: `${theme.palette.case.neutral.n50} !important`,
    },

    '.mbsc-schedule-column, .mbsc-schedule-resource-group': {
      height: ' 2.525em !important',
      backgroundColor: `${theme.palette.case.neutral.n50} !important`,
      borderColor: `${theme.palette.case.neutral.n100} !important`,
    },
    '.mbsc-schedule-time-col': {
      borderRight: `none !important`,
    },
    '.mbsc-schedule-time-wrapper': {
      '&:after': {
        borderColor: `${theme.palette.case.neutral.n100} !important`,
      },
      height: '2.525em',
    },

    '.mbsc-schedule-all-day-item:after': {
      borderColor: `${theme.palette.case.neutral.n100} !important`,
    },
    '.mbsc-schedule-grid-wrapper': {
      backgroundColor: theme.palette.case.neutral.n50,
    },
    '.mbsc-schedule-time, .mbsc-schedule-all-day-text': {
      textAlign: 'center',
      fontSize: '11px !important',
      color: theme.palette.case.contrast.black,
    },
    '.mbsc-schedule-time': {
      fontSize: theme.typography.extra_small.fontSize,
    },
    '.mbsc-schedule-all-day-text': {
      fontSize: theme.typography.extra_small.fontSize,
      textTransform: 'none !important',
    },

    '.mbsc-schedule-event-all-day-title ': {
      color: `${theme.palette.case.contrast.white}!important`,
      fontFamily: theme.typography.extra_small.fontFamily,
      fontSize: theme.typography.extra_small.fontSize,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    '.mbsc-schedule-event-all-day-background': {
      opacity: 1,
    },
    '.mbsc-schedule-events': {
      '.mbsc-schedule-event': {
        paddingTop: '5px',
        minHeight: '20px',
      },
      '.mbsc-schedule-event-background': {
        opacity: 0.2,
      },
      '.mbsc-schedule-event-title': {
        color: `${theme.palette.case.contrast.black}!important`,
        fontSize: theme.typography.extra_small.fontSize,
        fontWeight: theme.typography.extra_small.fontWeight,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      },
      '.mbsc-schedule-event-range': {
        display: 'none',
      },
    },

    '& .mbsc-calendar-wrapper': {
      borderColor: theme.palette.case.neutral.n200,
    },
    '.mbsc-focus': {
      backgroundColor: `#fff !important`,
    },
    '.mbsc-calendar': {
      backgroundColor: `${theme.palette.case.neutral.n50}!important`,
    },
    '.mbsc-hover': {
      borderColor: `${theme.palette.case.neutral.n400}!important`,
      backgroundColor: `${theme.palette.case.neutral.n50}!important`,
      '.mbsc-calendar-cell-text ': {
        background: `${theme.palette.case.main.yellow.high}   !important`,
        borderColor: `${theme.palette.case.main.yellow.high}  !important`,
        color: theme.palette.case.contrast.white,
      },
    },
    '.mbsc-calendar-week-days': {
      backgroundColor: `${theme.palette.case.neutral.n50}!important`,
      border: 'none',
      color: `${theme.palette.case.contrast.black}!important`,
      '.mbsc-calendar-week-day': {
        fontSize: theme.typography.extra_small.fontSize,
        fontWeight: theme.typography.extra_small.fontWeight,
        '&:nth-of-type(6)': {
          color: `${theme.palette.case.neutral.n400}!important`,
        },
        '&:last-of-type': {
          color: `${theme.palette.case.neutral.n400}!important`,
        },
      },
    },
    '.mbsc-schedule-all-day-wrapper, .mbsc-schedule-all-day-item,': {
      boxShadow: '0px 47px 40px -59px rgba(34, 60, 80, 0.1) inset',
    },
    '.mbsc-schedule-all-day-cont:after': {
      bottom: '-12px !important',
      background: 'linear-gradient(360deg, rgb(255 255 255 / 17%) 0%, rgba(0, 0, 0, 0.08) 100%)',
      height: '12px',
      boxShadow: 'none',
    },

    '.mbsc-event-color, .mbsc-event-time': {
      display: 'none',
    },

    '.mbsc-list-item': {
      borderColor: `${theme.palette.case.neutral.n200} !important`,
      backgroundColor: `${theme.palette.case.neutral.n50} !important`,
      paddingTop: ' 8px',
      paddingBottom: '8px',
      '&:before': {
        borderTop: `1px solid ${theme.palette.case.neutral.n200} !important`,
        left: 0,
      },
    },
    '.mbsc-ios.mbsc-list-item:before': {
      borderTop: `1px solid ${theme.palette.case.neutral.n200} !important`,
    },
    '.mbsc-ios.mbsc-list-item:after': {
      borderTop: `1px solid ${theme.palette.case.neutral.n200} !important`,
    },

    '.header-container': {
      display: 'flex',
      alignItems: 'center',
      '.single-day-event-dot': {
        flexShrink: 0,
        width: '6px',
        height: '6px',
        borderRadius: '50%',
        marginRight: '5px',
      },

      '.single-day-event': {
        color: `${theme.palette.case.contrast.black}!important`,
        fontSize: theme.typography.small.fontSize,
        fontWeight: theme.typography.small.fontWeight,
      },
    },

    '.single-day-event-time ': {
      color: `${theme.palette.case.neutral.n700}!important`,
      fontSize: theme.typography.extra_small.fontSize,
      fontWeight: theme.typography.extra_small.fontWeight,
      display: 'flex',
      maxWidth: '200px',
      paddingLeft: '10px',
    },

    '.mbsc-calendar-cell': {
      border: 'none',
      backgroundColor: `${theme.palette.case.neutral.n50}!important`,
    },
    '.mbsc-calendar-day-text': {
      color: `${theme.palette.case.neutral.n700}!important`,
      fontSize: theme.typography.default.fontSize,
    },

    '.mbsc-calendar-mark': {
      backgroundColor: `${theme.palette.primary.main}   !important`,
    },

    '.mbsc-calendar-today': {
      color: `${theme.palette.primary.main}   !important`,
    },

    '.mbsc-selected': {
      '.mbsc-calendar-cell-text': {
        background: `${theme.palette.case.main.yellow.high}   !important`,
        borderColor: `${theme.palette.case.main.yellow.high}  !important`,
        color: ` ${theme.palette.case.contrast.white} !important`,
      },
    },
    '.mbsc-schedule-date-header': {
      display: 'none',
    },
  },
}));

export const CalendarContentWrap = styled(Box)(() => ({
  height: '100%',
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
  '& ::-webkit-scrollbar': {
    width: '0px !important',
  },
}));

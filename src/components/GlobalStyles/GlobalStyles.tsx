import Global from '@mui/material/GlobalStyles';
import theme from '../../theme/theme';
import { palette } from '../../theme/palette';

const GlobalStyles = (
  <Global
    styles={{
      body: {
        fontFamily: theme.typography.fontFamily,
        backgroundColor: theme.palette.case.neutral.n75,
        lineHeight: '10px !important',
        padding: '0',
        margin: '0',

        '& input[type=number]::-webkit-inner-spin-button': {
          WebkitAppearance: 'none',
          margin: 0,
        },

        '& input[type=number]::-webkit-outer-spin-button': {
          WebkitAppearance: 'none',
          margin: 0,
        },

        a: {
          textDecoration: 'none',
          color: theme.palette.case.main.blue.high,
          '&:hover': { opacity: '0.7' },
        },

        '& ::-webkit-scrollbar': {
          width: '4px !important',
          borderRadius: '8px',
        },
        '& ::-webkit-scrollbar-track': {
          backgroundColor: theme.palette.case.neutral.n100,
          width: '4px !important',
          margin: '2px',
          borderRadius: '8px',
        },
        '& ::-webkit-scrollbar-thumb': {
          backgroundColor: theme.palette.case.neutral.n300,
          width: '4px !important',
          borderRadius: '8px',
        },

        '.react-datepicker': {
          fontFamily: theme.typography.fontFamily,
          border: 'none',
          boxShadow: theme.palette.case.shadow.big,
        },

        '.react-datepicker__portal': {
          width: '100%',
          height: '50%',
          fontFamily: theme.typography.fontFamily,
        },

        '.react-datepicker__input-container': {
          width: '100%',
        },
        '.react-datepicker__day--outside-month': {
          color: `${theme.palette.case.neutral.n500} !important`,
          '&:hover': {
            color: `${theme.palette.case.contrast.white} !important`,
          },
        },

        '.react-datepicker__header': {
          color: 'white',
          border: '0',
          borderRadius: '4px 4px 0 0',
          backgroundColor: theme.palette.primary.main,
        },

        '.react-datepicker__triangle': {
          borderBottomColor: theme.palette.primary.main,
          '&:before': {
            borderBottomColor: theme.palette.primary.main,
          },
        },

        '.react-datepicker__current-month': {
          fontFamily: theme.typography.fontFamily,
          fontWeight: theme.typography.default_bolt.fontWeight,
          fontSize: theme.typography.default_bolt.fontSize,
          lineHeight: theme.typography.default_bolt.lineHeight,
          color: theme.palette.case.contrast.white,
        },

        '.react-datepicker-time__header': {
          fontFamily: theme.typography.fontFamily,
          fontWeight: theme.typography.default_bolt.fontWeight,
          fontSize: theme.typography.default_bolt.fontSize,
          lineHeight: theme.typography.default_bolt.lineHeight,
        },

        '.react-datepicker-wrapper': {
          display: 'block',
          width: '100%',

          '.react-datepicker__input-container': {
            display: 'block',
            width: '100%',
          },
        },

        '.react-datepicker__day--today': {
          backgroundColor: theme.palette.primary.light,
          color: theme.palette.case.contrast.black,
          borderRadius: '100%',
        },

        '.reactDatepicker__day-name': {
          margin: '0.1rem',

          '&:hover': {
            borderRadius: '100%',
          },
        },

        '.reactDatepicker__day': {
          margin: '0.1rem',

          '&:hover': {
            borderRadius: '100%',
          },
        },

        '.react-datepicker__close-icon': {
          opacity: '1',
          paddingRight: '11px !important',
          paddingTop: '0px !important',
          bottom: 0,
          top: 'initial',
          height: '38px',
          '&:hover': {
            transition: 'all 0.15s ease',
            opacity: '0.7',
          },
        },

        '.react-datepicker__close-icon::after': {
          color: theme.palette.case.neutral.n700,
          backgroundColor: 'transparent',
          fontSize: 22,
          paddingTop: '4px',
          top: '38%',
        },

        '.reactDatepicker': {
          fontFamily: theme.typography.fontFamily,
          border: '0px',
          borderRadius: '5px',
          boxShadow: theme.palette.case.shadow.big,

          '.react-datepicker__triangle': {
            transform: 'translate(17px, 0px) !important',
            borderBottomColor: `${theme.palette.primary.main} !important`,

            '&:before': {
              top: '0px !important',
              borderBottomColor: `${theme.palette.primary.main} !important`,
            },
          },
        },

        '.react-datepicker__month-dropdown-container--select': {
          position: 'relative',
          maxHeight: '100px !important',

          '&:before': {
            content: "''",
            position: 'absolute',
            top: '50%',
            right: '4px',
            zIndex: '1',
            width: '0',
            height: ' 0',
            borderTop: `6px solid ${theme.palette.primary.main}`,
            borderRight: '3px solid transparent',
            borderLeft: '3px solid transparent',
            transform: 'translate(0, -50%)',
            pointerEvents: 'none',
          },
        },

        '.react-pdf__Document': {
          height: '96%',
        },
        '.mbsc-font': {
          fontFamily: `${theme.typography.fontFamily} !important`,
        },
        '.mbsc-popup-header-no-buttons': {
          borderColor: theme.palette.case.neutral.n300,
        },
        '.mbsc-popup-overlay': {
          backgroundColor: `${palette.case.neutral.n800}99`,
        },

        '.react-datepicker__year-dropdown-container--select': {
          position: 'relative',
          maxHeight: '100px !important',

          '&:before': {
            content: "''",
            position: 'absolute',
            top: '50%',
            right: '4px',
            zIndex: '1',
            width: '0',
            height: ' 0',
            borderTop: `6px solid ${theme.palette.primary.main}`,
            borderRight: '3px solid transparent',
            borderLeft: '3px solid transparent',
            transform: 'translate(0, -50%)',
            pointerEvents: 'none',
          },
        },

        '.react-datepicker__month-select': {
          position: 'relative',
          display: 'inline-block',
          width: '100%',
          padding: '0 10px 0 5px',
          fontFamily: theme.typography.fontFamily,
          fontWeight: theme.typography.default.fontWeight,
          fontSize: theme.typography.default.fontSize,
          lineHeight: theme.typography.default.lineHeight,
          color: theme.palette.case.neutral.n700,
          verticalAlign: 'middle',
          border: `1px solid ${theme.palette.primary.main}`,
          borderRadius: '10px',
          outline: 'none',
          backgroundColor: 'white',
          backgroundImage: 'none',
          boxShadow: 'none',
          transition: 'all 0.15s ease',
          cursor: 'pointer',
        },

        '.react-datepicker__year-select': {
          position: 'relative',
          display: 'inline-block',
          width: '100%',
          padding: '0 10px 0 5px',
          fontFamily: theme.typography.fontFamily,
          fontWeight: theme.typography.default.fontWeight,
          fontSize: theme.typography.default.fontSize,
          lineHeight: theme.typography.default.lineHeight,
          color: theme.palette.case.neutral.n700,
          verticalAlign: 'middle',
          border: `1px solid ${theme.palette.primary.main}`,
          borderRadius: '10px',
          outline: 'none',
          backgroundColor: 'white',
          backgroundImage: 'none',
          boxShadow: 'none',
          transition: 'all 0.15s ease',
          cursor: 'pointer',
        },

        '.react-datepicker__current-month:': {
          color: 'white',
        },

        '.react-datepicker__navigation--previous': {
          transition: 'all 0.15s ease',
        },

        '.react-datepicker__navigation--next': {
          transition: 'all 0.15s ease',
        },

        '.react-datepicker__navigation-icon::before': {
          borderColor: theme.palette.case.neutral.n200,
        },

        '.react-datepicker__day-names': {
          color: theme.palette.case.contrast.white,

          '.react-datepicker__day-name': {
            color: theme.palette.case.contrast.white,
          },
        },

        '.react-datepicker__day--keyboard-selected': {
          color: theme.palette.case.contrast.white,
          borderRadius: '100%',
          backgroundColor: theme.palette.primary.main,
        },

        '.react-datepicker__day--selected': {
          color: `${theme.palette.case.contrast.white} !important`,
          borderRadius: '100%',
          backgroundColor: theme.palette.primary.main,

          '&:hover': {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.case.contrast.white,
          },
        },

        '.react-datepicker__day--in-selecting-range': {
          color: theme.palette.case.contrast.white,
          borderRadius: '100%',
          backgroundColor: theme.palette.primary.main,
        },

        '.react-datepicker__day--in-range': {
          color: theme.palette.case.contrast.white,
          borderRadius: '100%',
          backgroundColor: theme.palette.primary.main,
        },

        '.react-datepicker-popper': {
          zIndex: '15',
          minWidth: '220px !important',
          '.react-datepicker__triangle': {
            borderBottomColor: theme.palette.primary.main,
            '&: after': {
              borderBottomColor: `${theme.palette.primary.main} !important`,
            },
            '&:before': {
              borderBottomColor: theme.palette.primary.main,
            },
          },

          '.react-datepicker__day': {
            margin: '1px',
            color: theme.palette.case.contrast.black,

            '&:hover': {
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.case.contrast.white,
            },
          },
        },

        '.react-datepicker__day--disabled': {
          color: `${theme.palette.case.neutral.n400} !important`,
        },

        select: {
          textIndent: '1px',
          textOverflow: '',
          WebkitAppearance: 'none',
          MozAppearance: 'none',
        },

        '.react-datepicker__monthPicker': {
          margin: '0.4rem',
          textAlign: 'center',
          '.react-datepicker__month-wrapper': {
            width: '100%',
            '.react-datepicker__month-text': {
              display: 'inline-block',
              minWidth: '57px',
              padding: '7px 0',
              cursor: 'pointer',
              borderRadius: '7px',
              transition: 'all 0.15s ease',
              fontWeight: theme.typography.small.fontWeight,
              '&:hover': {
                backgroundColor: theme.palette.case.main.yellow.light,
                color: theme.palette.case.contrast.black,
              },
            },

            '.react-datepicker__month--disabled': {
              opacity: '0.5',
            },
            '.react-datepicker__month-text--today': {
              backgroundColor: theme.palette.primary.light,
              color: theme.palette.case.contrast.black,
            },
            '.react-datepicker__month-text--keyboard-selected': {
              color: theme.palette.case.contrast.white,
              backgroundColor: theme.palette.primary.main,
            },
          },
        },

        '.react-datepicker-year-header': {
          padding: '11px 0',
          fontWeight: theme.typography.small.fontWeight,
        },

        '.rc-time-picker-panel': {
          zIndex: '1300',
        },
        '.mbsc-popup-body-round': {
          boxShadow: `${theme.palette.case.shadow.medium} !important`,
        },
        '.mbsc-scroller-wheel-line': {
          backgroundColor: `${theme.palette.case.neutral.n900} !important`,
          opacity: 0.1,
        },
        '.mbsc-scroller-wheel-item.mbsc-selected': {
          color: `${theme.palette.case.neutral.n900} !important`,
        },
        '.mbsc-scroller-wheel-item': {
          color: `${theme.palette.case.neutral.n700} !important`,
        },
        '.mbsc-ios.mbsc-scroller-wheel-header.mbsc-focus, .mbsc-ios.mbsc-scroller-wheel-item.mbsc-active, .mbsc-ios.mbsc-scroller-wheel-item.mbsc-focus, .mbsc-ios.mbsc-scroller-wheel-item.mbsc-hover':
          {
            background: `${theme.palette.case.primary.p500}1A !important`,
          },
        '.mbsc-scroller-bar-cont': {
          borderRadius: '6px',
          background: `${theme.palette.case.neutral.n50} !important`,
        },
        '.mbsc-scroller-bar:after': {
          background: `${theme.palette.case.neutral.n400} !important`,
        },
        '.mbsc-popup-buttons, .mbsc-ios.mbsc-popup-header-center, .mbsc-ios.mbsc-popup-header-no-buttons': {
          borderColor: `${theme.palette.case.neutral.n200} !important`,
        },
        '.mbsc-button-flat': {
          color: `${theme.palette.case.neutral.n900} !important`,
          fontWeight: '500 !important',
          fontSize: '18px',
        },

        '.mbsc-popup-content': {
          '.custom-single-day-item': {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            '.headerContainer': {
              width: 'calc(100% - 55px)',
              overflow: 'hidden',
              '.single-day-event': {
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
              },
            },
          },

          '.mbsc-ios.mbsc-list-item:before': {
            borderTop: `1px solid ${theme.palette.case.neutral.n200} !important`,
          },
          '.mbsc-ios.mbsc-list-item:after': {
            borderTop: `1px solid ${theme.palette.case.neutral.n200} !important`,
          },
          '.mbsc-list-item': {
            borderColor: `${theme.palette.case.neutral.n200} !important`,
            backgroundColor: `${theme.palette.case.neutral.n50} !important`,
            paddingTop: ' 8px',
            zIndex: '3',
            left: '0',
            width: '100%',
            paddingBottom: '8px',
            '&:after': {
              borderColor: `${theme.palette.case.neutral.n400} !important`,
            },
            '&:before': {
              left: 0,
              borderColor: `${theme.palette.case.neutral.n400} !important`,
            },
          },

          '.header-container': {
            display: 'flex',
            alignItems: 'center',
            width: '100%',

            '.single-day-event': {
              color: `${theme.palette.case.contrast.black} !important`,
              fontSize: theme.typography.small.fontSize,
              fontWeight: theme.typography.small.fontWeight,
            },
          },

          '.single-day-event-time': {
            color: theme.palette.case.neutral.n700,
            fontSize: theme.typography.extra_small.fontSize,
            paddingLeft: '10px',
            display: 'flex',
            width: '200px',
            justifyContent: 'flex-end',
          },

          '.mbsc-calendar-cell': {
            border: 'none',
            backgroundColor: theme.palette.case.neutral.n50,
          },
          '.mbsc-calendar-day-text': {
            color: theme.palette.case.neutral.n700,
            fontSize: theme.typography.default.fontSize,
          },

          '.mbsc-calendar-mark': {
            display: 'none',
          },

          '.mbsc-event-colore': {
            display: 'none',
          },
          '.mbsc-event-time': {
            display: 'none',
          },

          '.mbsc-calendar-button': {
            color: `${theme.palette.primary.main} !important`,
          },
          '.mbsc-selected': {
            '.mbsc-calendar-cell-text': {
              color: theme.palette.case.contrast.white,
              borderColor: theme.palette.primary.main,
              backgroundColor: theme.palette.primary.main,
            },
          },
          '.mbsc-hover': {
            '.mbsc-calendar-cell-text': {
              color: theme.palette.case.contrast.white,
              background: `${theme.palette.primary.main}80 !important`,
              borderColor: `${theme.palette.primary.main}80 !important`,
            },
          },
        },

        '.mbsc-popup-wrapper': {
          zIndex: '1301',
        },

        '.mbsc-popup-arrow-wrapper-top': {
          height: '1.6rem !important',
        },

        '.mbsc-popup-body': {
          background: `${theme.palette.case.contrast.white} !important`,
        },

        '.mbsc-popup-arrow': {
          background: `${theme.palette.case.contrast.white} !important`,
        },
        '.mbsc-picker': {
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
        },
      },
    }}
  />
);

export default GlobalStyles;

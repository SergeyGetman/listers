import { Box, styled } from '@mui/material';
import theme from '../../../theme/theme';
import { palette } from '../../../theme/palette';

export const setSelectStyle = (
  isError: boolean,
  size: string,
  isStartIcon: boolean,
  isClearable: boolean,
) => ({
  option: (provided: any, state: any) => ({
    ...provided,
    marginBottom: '5px',
    fontFamily: theme.typography.fontFamily,
    display: 'flex',
    alignItems: 'center',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: '400',
    lineHeight: '19px',
    backgroundColor: state.isSelected ? theme.palette.case.neutral.n200 : theme.palette.case.contrast.white,
    '&:active': {
      backgroundColor: state.isSelected ? theme.palette.case.neutral.n200 : theme.palette.case.contrast.white,
    },
    color: state.isDisabled
      ? theme.palette.case.neutral.n400
      : state.isSelected
      ? theme.palette.case.neutral.n900
      : theme.palette.case.neutral.n600,
    '&:hover': {
      backgroundColor: state.isDisabled
        ? 'none'
        : state.isSelected
        ? theme.palette.case.neutral.n200
        : theme.palette.case.neutral.n100,
      color: state.isDisabled
        ? theme.palette.case.neutral.n400
        : state.isSelected
        ? theme.palette.case.neutral.n900
        : theme.palette.case.neutral.n700,
      cursor: state.isDisabled ? 'default' : 'pointer',
      transition: 'all 0.3s',
    },
  }),
  multiValue: (provided: any) => ({
    ...provided,
    backgroundColor: theme.palette.case.neutral.n100,
    fontSize: '14px',
  }),
  multiValueRemove: (provided: any) => ({
    ...provided,
    display: 'none',
  }),
  container: (provided: any) => ({
    ...provided,
    padding: '0px',
  }),
  dropdownIndicator: (provided: any, state: any) => {
    return {
      ...provided,
      cursor: 'pointer',
      display: state.hasValue && isClearable ? 'none' : 'flex',
      transform: state.selectProps.menuIsOpen ? 'rotate(-180deg)' : 'rotate(0)',
      color: state.isDisabled ? theme.palette.case.neutral.n200 : 'initial',
    };
  },
  clearIndicator: (provided: any) => {
    return {
      ...provided,
      cursor: 'pointer',
    };
  },

  input: (provided: any) => ({
    ...provided,
    margin: 0,
  }),
  control: (provided: any, state: any) => {
    let backgroundColor = theme.palette.case.neutral.n50;
    let borderColor = theme.palette.case.neutral.n200;
    let color = theme.palette.case.neutral.n700;
    if (state.isDisabled) {
      backgroundColor = theme.palette.case.neutral.n75;
      color = theme.palette.case.neutral.n300;
    } else if (isError) {
      borderColor = theme.palette.case.red.r500;
      backgroundColor = state.isFocused ? theme.palette.case.neutral.n0 : theme.palette.case.neutral.n50;
    } else if (state.hasValue) {
      backgroundColor = theme.palette.case.neutral.n0;
    } else if (state.isFocused) {
      backgroundColor = theme.palette.case.neutral.n0;
      borderColor = theme.palette.case.primary.p500;
    }

    return {
      ...provided,
      height: size === 'small' ? 35 : 36,
      cursor: state.isDisabled ? 'not-allowed' : 'text',
      borderRadius: '4px',
      fontSize: '14px',
      fontWeight: '400',
      lineHeight: '20px',
      fontFamily: theme.typography.fontFamily,
      boxShadow: 'none',
      minHeight: 'auto',
      padding: `0 8px 0 ${isStartIcon ? '26px' : '8px'} !important`,
      color: color,
      backgroundColor: backgroundColor,
      borderColor: borderColor,
      '&:hover': {
        borderColor: state.isDisabled || state.isFocused ? borderColor : theme.palette.case.neutral.n300,
        backgroundColor:
          state.isDisabled || state.isFocused ? backgroundColor : theme.palette.case.neutral.n0,
        transition: 'all 0.3s',
      },
    };
  },
  indicatorContainer: (provided: any, state: any) => ({
    ...provided,
    transform: state.isOpened ? '' : '',
  }),
  valueContainer: (provided: any) => ({
    ...provided,
    display: 'flex',
    flexWrap: 'nowrap',
    paddingLeft: isStartIcon ? '3px !important' : '0px',
  }),
  indicatorSeparator: () => ({}),
  noOptionsMessage: (provided: any) => ({
    ...provided,
    fontSize: theme.typography.small.fontSize,
    fontWeight: theme.typography.small.fontWeight,
    fontFamily: theme.typography.fontFamily,
  }),
  menuList: (provided: any) => ({
    ...provided,
    padding: '10px',
    maxHeight: '175px',
    border: `1px solid ${theme.palette.case.neutral.n100}`,
  }),

  menu: (provided: any) => ({
    ...provided,
    boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.04)',
    border: `1px solid ${theme.palette.case.neutral.n100}`,
    borderRadius: 5,
    zIndex: 30,
  }),
  placeholder: (provided: any) => ({
    ...provided,
    transition: 'opacity 200ms',
    color: palette.case.neutral.n400,
    position: 'absolute',
    whiteSpace: 'nowrap',
  }),
  singleValue: (provided: any, state: any) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';
    const padding = 0;

    return { ...provided, opacity, transition, padding };
  },
});

export const ReactSelectStartIconContainer = styled(Box)<{ label: boolean }>(({ label }) => ({
  position: 'absolute',
  top: label ? '30px' : '9px',
  left: 8,
  svg: {
    width: '16px',
    height: '16px',
    //   TODO fix icon color in create event modal type select
  },
}));

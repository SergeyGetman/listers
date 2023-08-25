import React, { FC } from 'react';
import { DropdownIndicatorProps } from 'react-select';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import theme from '../../../theme/theme';
import { OptionType } from './types';

export const DropdownIndicator: FC<DropdownIndicatorProps<OptionType>> = ({
  hasValue,
  isFocused,
  selectProps: { menuIsOpen, isClearable, isDisabled },
}) => {
  return (
    <KeyboardArrowDownRoundedIcon
      sx={{
        width: '20px',
        height: '20px',
        display: hasValue && isFocused && isClearable ? 'none' : 'flex',
        transform: menuIsOpen ? 'rotate(-180deg)' : 'rotate(0)',
        cursor: 'pointer',
        svg: {
          path: {
            fill: isDisabled ? theme.palette.case.neutral.n500 : theme.palette.case.neutral.n700,
          },
        },
      }}
    />
  );
};

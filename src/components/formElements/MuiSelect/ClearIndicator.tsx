import React, { FC } from 'react';
import { ClearIndicatorProps } from 'react-select';
import ClearIcon from '@mui/icons-material/Clear';
import theme from '../../../theme/theme';
import { OptionType } from './types';

export const ClearIndicator: FC<ClearIndicatorProps<OptionType>> = ({
  clearValue,
  isFocused,
  selectProps: { isDisabled },
}) => {
  const onClear = () => clearValue();

  return (
    <ClearIcon
      onClick={onClear}
      onTouchStart={onClear}
      sx={{
        position: 'relative',
        zIndex: '100',
        width: '20px',
        height: '16px',
        display: isFocused ? 'flex' : 'none',
        cursor: 'pointer !important',
        '&:hover': {
          opacity: '0.7',
        },

        color: `${isDisabled ? theme.palette.case.neutral.n500 : theme.palette.case.neutral.n700} !important`,
      }}
    />
  );
};

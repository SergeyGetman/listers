import React, { forwardRef, useCallback } from 'react';
import { FormControlLabel, Checkbox } from '@mui/material';

type MuiCheckboxProps = {
  isDisabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: boolean;
  label?: string;
  [x: string]: any;
};

const MuiCheckbox = forwardRef<HTMLHeadingElement, MuiCheckboxProps>((props, ref) => {
  const { isDisabled, onChange, value, label, ...args } = props;
  const onClickOpenInfoModal = useCallback(
    (e: any) => {
      e.stopPropagation();
      if (onChange) {
        onChange(e);
      }
    },
    [onChange],
  );
  return (
    <FormControlLabel
      ref={ref}
      control={
        <Checkbox
          {...args}
          disabled={isDisabled}
          checked={value}
          onChange={onClickOpenInfoModal}
          indeterminate={!value && isDisabled}
        />
      }
      label={label}
    />
  );
});

export default MuiCheckbox;

import React, { forwardRef } from 'react';
import { FormControlLabel, Radio } from '@mui/material';
import { RadioButtonCheckedIcon, RadioButtonIcon } from './MuiRadioButton.style';

type MuiRadioButtonProps = {
  isDisabled?: boolean;
  onChange?: () => void;
  checked?: boolean;
  value?: string | boolean;
  label?: string;
  [x: string]: any;
};

const MuiRadioButton = forwardRef<HTMLHeadingElement, MuiRadioButtonProps>((props, ref) => {
  const { isDisabled, onChange, checked, label, ...args } = props;

  return (
    <FormControlLabel
      sx={{ '&:hover': { opacity: '0.7' }, transition: 'all 0.3s' }}
      ref={ref}
      control={
        <Radio
          {...args}
          checked={checked}
          onChange={onChange}
          disabled={isDisabled}
          color="default"
          checkedIcon={<RadioButtonCheckedIcon />}
          icon={<RadioButtonIcon />}
        />
      }
      label={label}
    />
  );
});

export default MuiRadioButton;

import React, { forwardRef } from 'react';
import { Box, TextField, Typography } from '@mui/material';
import ErrorMessage from '../ErrorMessage';

type MuiSmallNumberTextFiledProps = {
  leftLabel?: string;
  rightLabel?: string;
  isError?: boolean;
  errorMessage?: string;
  onChange?: (val: React.ChangeEvent<HTMLInputElement>) => void;
  [x: string]: any;
};

const MuiSmallNumberTextFiled = forwardRef<HTMLHeadingElement, MuiSmallNumberTextFiledProps>((props, ref) => {
  const { leftLabel, rightLabel, onChange, isError, errorMessage, ...args } = props;
  const handleChange = (value: React.ChangeEvent<HTMLInputElement>) => {
    const regex = /^[1-9]\d{0,1}$/;
    if (value.target.value === '' || regex.test(value.target.value)) {
      if (onChange) {
        onChange(value);
      }
    }
  };
  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {leftLabel && <Typography sx={{ mr: '10px' }}>{leftLabel}</Typography>}
        <TextField
          {...args}
          inputRef={ref}
          sx={{
            '& input': {
              textAlign: 'center',
            },
            width: '40px',
          }}
          type="text"
          error={isError}
          onChange={handleChange}
          inputProps={{ maxLength: 2 }}
        />
        {rightLabel && <Typography sx={{ ml: '10px' }}>{rightLabel}</Typography>}
      </Box>
      <ErrorMessage isShow={isError} message={errorMessage} />
    </Box>
  );
});

export default MuiSmallNumberTextFiled;

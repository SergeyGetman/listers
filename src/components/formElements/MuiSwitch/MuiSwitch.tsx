import React, { forwardRef } from 'react';
import { Grid, FormControlLabel, Switch, Box, Typography } from '@mui/material';
import { SwitchBox } from './MuiSwitch.style';

export type MuiSwitchProps = {
  isDisabled?: boolean;
  onChange?: () => void;
  checked?: boolean;
  label?: string;
  labelLeft?: string;
  labelRight?: string;

  color?: 'primary' | 'secondary';
  isContainTwoLabel?: boolean;
  secondLabel?: string;
  [x: string]: any;
};

const MuiSwitch = forwardRef<HTMLHeadingElement, MuiSwitchProps>((props, ref) => {
  const { isDisabled, onChange, checked, color, label, labelLeft, labelRight, isContainTwoLabel, ...args } =
    props;

  return isContainTwoLabel ? (
    <Box>
      <Grid component="label" container alignItems="center" spacing={1}>
        <Grid item>
          {' '}
          <Typography>{labelLeft} </Typography>
        </Grid>
        <Grid item>
          <SwitchBox {...args} checked={checked} disabled={isDisabled} onChange={onChange} />
        </Grid>
        <Grid item>
          {' '}
          <Typography>{labelRight} </Typography>
        </Grid>
      </Grid>
    </Box>
  ) : (
    <FormControlLabel
      ref={ref}
      color={color}
      control={<Switch {...args} checked={checked} disabled={isDisabled} onChange={onChange} />}
      label={label}
    />
  );
});

export default MuiSwitch;

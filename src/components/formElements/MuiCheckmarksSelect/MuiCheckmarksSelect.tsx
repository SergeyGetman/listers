import React, { forwardRef, useMemo } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import { useTheme, Typography } from '@mui/material';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import { OptionType } from '../MuiSelect/types';
const ITEM_HEIGHT = 35;
const ITEM_PADDING_TOP = 14;

type MuiCheckmarksSelectProps = {
  value: string[];
  options: OptionType[];
  label?: string;
  size?: 'small' | 'medium';
  isDisabled?: boolean;
  [x: string]: any;
};
const MuiCheckmarksSelect = forwardRef<HTMLHeadingElement, MuiCheckmarksSelectProps>((props, ref) => {
  const theme = useTheme();
  const { value, size = 'medium', options = [], label, isDisabled, ...args } = props;

  const MenuProps = useMemo(() => {
    return {
      sx: {
        top: '5px',
        msOverflowStyle: 'none',
        '& ::-webkit-scrollbar': {
          width: '0px !important',
        },
        '& .MuiBackdrop-root': {
          backgroundColor: 'transparent',
        },
      },
      PaperProps: {
        style: {
          border: `1px solid ${theme.palette.case.neutral.n100}`,
          borderTop: 'none',
          borderRadius: '0 0 5px 5px',
          maxHeight: ITEM_HEIGHT * 7 + ITEM_PADDING_TOP,
          padding: '0 10px',
          boxShadow: 'none',
        },
      },
    };
  }, [theme]);
  return (
    <FormControl
      sx={{
        width: '100%',
      }}
    >
      <InputLabel
        sx={{ transform: size === 'small' ? 'translate(14px, 7px) scale(0.7)' : '' }}
        id="demo-multiple-checkbox-label"
      >
        {label}
      </InputLabel>
      <Select
        {...args}
        labelId="demo-multiple-checkbox-label"
        id="demo-multiple-name"
        multiple
        ref={ref}
        disabled={isDisabled}
        IconComponent={KeyboardArrowDownRoundedIcon}
        value={value}
        displayEmpty
        input={<OutlinedInput size={size} label={label} />}
        renderValue={(selected) =>
          selected.length ? (
            selected
              .map((selectedItem) => options.find((item) => item.value === selectedItem)?.label)
              .join(', ')
          ) : (
            <Typography sx={{ color: '#C1C4D6' }}>{args.placeholder}</Typography>
          )
        }
        MenuProps={MenuProps}
      >
        {options.map((item) => (
          <MenuItem
            sx={{
              padding: '8px',
              pointerEvents: item.isDisabled ? 'none' : 'initial',
              minHeight: '35px',
              marginTop: '5px',
              borderRadius: '5px',
              backgroundColor: item.isDisabled ? theme.palette.case.neutral.n100 : 'initial',
              color: item.isDisabled ? theme.palette.case.contrast.black : 'initial',
              opacity: item.isDisabled ? 0.6 : 'initial',
              '&:hover': {
                backgroundColor: theme.palette.case.neutral.n100,
                color: theme.palette.case.contrast.black,
              },
              '&.Mui-selected': {
                backgroundColor: theme.palette.case.neutral.n100,
                color: theme.palette.case.contrast.black,
                '& .MuiCheckbox-root': {
                  color: theme.palette.primary.main,
                },

                '&:hover': { backgroundColor: theme.palette.case.neutral.n100 },
              },
            }}
            key={item.value}
            value={item.value}
          >
            <Checkbox
              sx={{ marginRight: '15px' }}
              checked={item.isDisabled || value.indexOf(item.value) > -1}
            />
            <ListItemText primary={item.label} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
});

export default MuiCheckmarksSelect;

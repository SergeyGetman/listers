import React, { FC } from 'react';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import { Typography, useTheme } from '@mui/material';
import { ActionMenuItemSelect, ItemSelectContainer } from './IconTextSelect.style';

type RequestStatusItem = {
  label: string;
  icon: any;
  value: string;
};

type IconTextSelectProps = {
  name: string;
  items: RequestStatusItem[];
  value: RequestStatusItem;
  onChange: (value: RequestStatusItem | null) => void;
};

const IconTextSelect: FC<IconTextSelectProps> = ({ name, items, value, onChange }) => {
  const theme = useTheme();

  const MenuProps = {
    sx: {
      top: '5px',
      left: '6px',
      [theme.breakpoints.down('sm')]: {
        left: 0,
      },
      '@media (max-width: 400px)': {
        left: '-6px',
      },

      '& .MuiBackdrop-root': {
        backgroundColor: 'transparent',
      },
    },
    PaperProps: {
      sx: {
        minWidth: '380px !important',

        [theme.breakpoints.down('sm')]: {
          minWidth: '355px !important',
        },

        boxShadow: 'none',
        border: `1px solid ${theme.palette.case.neutral.n100}`,
        borderTop: 'none',
        borderRadius: '0 0 5px 5px',
      },
    },
  };

  return (
    <Select
      labelId={`${name}-label`}
      id={name}
      value={value}
      sx={{ width: '100%' }}
      onChange={(selectValue) =>
        onChange(items.find((item) => item.value === selectValue.target.value) as RequestStatusItem)
      }
      IconComponent={KeyboardArrowDownRoundedIcon}
      input={<OutlinedInput />}
      MenuProps={MenuProps}
      renderValue={(selected) => {
        return (
          <ItemSelectContainer>
            <selected.icon />
            <Typography
              noWrap
              sx={() => ({
                ml: '7px',
              })}
              variant="extra_small"
            >
              {selected.label}
            </Typography>
          </ItemSelectContainer>
        );
      }}
    >
      {items.map((item) => {
        return (
          <ActionMenuItemSelect key={item.value} isSelected={value.label === item.label} value={item.value}>
            <ItemSelectContainer>
              <item.icon />
              <Typography
                noWrap
                sx={() => ({
                  ml: '7px',
                })}
                variant="extra_small"
              >
                {item.label}
              </Typography>
            </ItemSelectContainer>
          </ActionMenuItemSelect>
        );
      })}
    </Select>
  );
};

export default IconTextSelect;

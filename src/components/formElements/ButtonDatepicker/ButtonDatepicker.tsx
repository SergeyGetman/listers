import React, { FC } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import GeneralDatepicker from '../GeneralDatepicker';
import { formatDateForView } from '../../../shared/utils/formatDateForView';
import MuiIconButton from '../../buttons/iconButtons/MuiIconButton';
type ButtonDatepickerProps = {
  value?: any;
  onChange?: (val: any) => void;
  label?: string;
};
const ButtonDatepicker: FC<ButtonDatepickerProps> = ({ value, onChange, label = 'Ends' }) => {
  const theme = useTheme();

  const handleChange = (val: any) => {
    if (onChange) {
      onChange(val);
    }
  };

  return (
    <Box
      display="flex"
      width="max-content"
      alignItems="center"
      ml="-8px"
      sx={{
        '&:hover': {
          '.end-date-close-btn': {
            display: value ? 'block' : 'none',
          },
        },
      }}
    >
      <GeneralDatepicker isButton onChange={handleChange} value={value} />
      <Typography color={theme.palette.case.neutral.n600} lineHeight="21px" variant="t14r">
        {value ? formatDateForView(value) : label}
      </Typography>

      <Box className="end-date-close-btn" sx={{ display: 'none' }}>
        <MuiIconButton
          sx={{ ml: '4px' }}
          onClick={() => handleChange(null)}
          variant="default"
          size="small"
          color="primary"
        >
          <ClearIcon />
        </MuiIconButton>
      </Box>
    </Box>
  );
};

export default ButtonDatepicker;

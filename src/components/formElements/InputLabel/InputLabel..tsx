import React, { FC } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
type InputLabelProps = {
  label?: string;
  isRequired?: boolean;
  isShowHint?: boolean;
  currentHintValue?: number;
  maxHintValue?: number;
};
const InputLabel: FC<InputLabelProps> = ({
  label,
  isRequired,
  isShowHint,
  currentHintValue,
  maxHintValue = 72,
}) => {
  const theme = useTheme();

  return (
    <>
      {label || isShowHint ? (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
          <Typography
            component="div"
            variant="t12r"
            sx={{
              color: theme.palette.case.neutral.n500,
              height: '16px',
              fontWeight: '400',
            }}
          >
            {label}
            {isRequired ? (
              <Box component="span" sx={{ color: theme.palette.case.red.r600 }}>
                {' *'}
              </Box>
            ) : (
              ''
            )}
          </Typography>

          {isShowHint ? (
            <Typography
              component="div"
              variant="default"
              sx={{
                color: theme.palette.case.neutral.n500,
                height: '20px',
                fontWeight: '500',
              }}
            >
              {`${currentHintValue}/${maxHintValue}`}
            </Typography>
          ) : (
            <></>
          )}
        </Box>
      ) : (
        <></>
      )}
    </>
  );
};

export default InputLabel;

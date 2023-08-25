import React, { FC } from 'react';
import { Typography, Collapse, useTheme, Box } from '@mui/material';
type ErrorMessageProps = {
  isShow?: boolean;
  message?: string;
};

const ErrorMessage: FC<ErrorMessageProps> = ({ isShow, message }) => {
  const theme = useTheme();
  return (
    <Collapse in={isShow}>
      <Box
        sx={{
          marginTop: '4px',
          display: 'flex',
          alignItems: 'center',
          textAlign: 'start',
        }}
      >
        <Typography
          variant="badge"
          sx={{
            color: theme.palette.case.red.r500,
            wordWrap: 'break-word',
          }}
        >
          {message}
        </Typography>
      </Box>
    </Collapse>
  );
};

export default ErrorMessage;

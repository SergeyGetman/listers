import React, { FC } from 'react';
import { Box, Typography, useTheme } from '@mui/material';

type Props = {
  text: string;
};

const MuiSnackbar: FC<Props> = ({ text }) => {
  const theme = useTheme();
  return (
    <Box
      p="8px 16px"
      borderRadius="5px"
      sx={{
        backgroundColor: theme.palette.case.warning.light,
      }}
    >
      <Typography
        variant="default"
        sx={{
          color: theme.palette.case.warning.high,
        }}
      >
        {text}
      </Typography>
    </Box>
  );
};

export default MuiSnackbar;

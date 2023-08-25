import React, { FC } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
type BaseFieldViewProps = {
  label?: string;
  value?: string | number;
};
const BaseFieldView: FC<BaseFieldViewProps> = ({ label, value }) => {
  const theme = useTheme();

  return (
    <Box display="flex" flexDirection="column" width="100%">
      <Typography color={theme.palette.case.neutral.n500} variant="t12r">
        {label}
      </Typography>
      <Typography color={theme.palette.case.neutral.n800} variant="t14r">
        {value ? value : '-'}
      </Typography>
    </Box>
  );
};

export default BaseFieldView;

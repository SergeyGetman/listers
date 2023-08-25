import React, { FC } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import NavigationButton from '../../buttons/NavigationButton';
type ConfirmModalHeaderProps = {
  title?: string;
  onClose: () => void;
};
const ModalHeader: FC<ConfirmModalHeaderProps> = ({ title = '', onClose }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        height: '64px',
        alignItems: 'center',
        borderBottom: `1px solid ${theme.palette.case.neutral.n200}`,
        padding: '18px 24px',
      }}
    >
      <Typography sx={{ color: theme.palette.case.neutral.n800 }} variant="h3">
        {title}
      </Typography>
      <NavigationButton size="large" type="close" onClick={onClose} />
    </Box>
  );
};

export default ModalHeader;

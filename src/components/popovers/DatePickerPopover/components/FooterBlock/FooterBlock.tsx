import React, { FC } from 'react';
import { Box, useTheme } from '@mui/material';
import MuiButton from '../../../../buttons/MuiButton';
type FooterBlockProps = {
  handleClose: () => void;
  isShowRecurring?: boolean;
};
const FooterBlock: FC<FooterBlockProps> = ({ handleClose, isShowRecurring }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        marginTop: isShowRecurring ? '0' : '16px',
        padding: '12px',
        borderTop: `1px solid ${theme.palette.case.neutral.n100}`,
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-end',
      }}
    >
      <MuiButton size="small" onClick={handleClose} variant="contained" label="Close" />
    </Box>
  );
};

export default FooterBlock;

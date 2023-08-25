import React, { FC } from 'react';
import { Typography, useTheme } from '@mui/material';
type MuiLinkTextButtonProps = {
  label: string;
  onClick?: () => void;
  [x: string]: any;
};
const MuiLinkTextButton: FC<MuiLinkTextButtonProps> = ({ label, onClick, ...args }) => {
  const theme = useTheme();
  return (
    <Typography
      variant="default"
      onClick={onClick}
      sx={{
        cursor: 'pointer',
        color: `${theme.palette.case.main.blue.high} !important`,
        '&:hover': {
          textDecoration: 'underline !important',
        },
        ...args.sx,
      }}
    >
      {label}
    </Typography>
  );
};

export default MuiLinkTextButton;

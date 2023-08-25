import React, { FC } from 'react';
import { Chip, useTheme } from '@mui/material';

type MuiChipProps = {
  isShow?: boolean;
  label?: string | number;
};

// TODO change to Badge and style

const MuiChip: FC<MuiChipProps> = ({ isShow, label = '' }) => {
  const theme = useTheme();
  return (
    <Chip
      label={+label > 99 ? '+99' : label}
      color="error"
      size="small"
      sx={{
        maxHeight: '16px',
        maxWidth: '26px',
        marginLeft: '3px',
        alignItems: 'center',
        borderRadius: '16px',
        justifyContent: 'center',
        display: isShow ? 'flex' : 'none',
        '& .MuiChip-label': {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          paddingLeft: '5px',
          borderRadius: '16px',
          paddingRight: '5px',
          fontSize: theme.typography.label_bolt.fontSize,
          fontWeight: theme.typography.label_bolt.fontWeight,
          lineHeight: theme.typography.label_bolt.lineHeight,
        },
      }}
    />
  );
};

export default MuiChip;

import React, { FC, useMemo } from 'react';
import { Backdrop, CircularProgress } from '@mui/material';

type MuiPreloaderProps = {
  isShow: boolean;
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | 'inherit';
  size?: 'small' | 'extraSmall' | 'medium';
};

const MuiPreloader: FC<MuiPreloaderProps> = ({ isShow = true, size, color = 'primary' }) => {
  const choseVariant = useMemo(() => {
    switch (size) {
      case 'extraSmall':
        return (
          <CircularProgress
            color={color}
            sx={{
              width: '16px !important',
              height: '16px !important',
            }}
          />
        );
      case 'small':
        return (
          <CircularProgress
            color={color}
            sx={{
              width: '20px !important',
              height: '20px !important',
            }}
          />
        );
      case 'medium':
        return (
          <CircularProgress
            color={color}
            sx={{
              width: '24px !important',
              height: '24px !important',
            }}
          />
        );
      default:
        return (
          <Backdrop sx={{ zIndex: 9999 }} open={isShow}>
            <CircularProgress color={color} />
          </Backdrop>
        );
    }
  }, [color, isShow, size]);
  return <>{choseVariant}</>;
};

export default MuiPreloader;

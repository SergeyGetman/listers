import React, { FC, useCallback } from 'react';
import { Drawer, useTheme } from '@mui/material';

type MuiDrawerProps = {
  isShow: boolean;
  isFullHeight?: boolean;
  position?: 'bottom' | 'left' | 'right' | 'top';
  onClose: () => void;
  isSmall?: boolean;
  backgroundColor?: string;
  children: React.ReactNode;
  isDisabledDefaultClose?: boolean;
};

const MuiDrawer: FC<MuiDrawerProps> = ({
  isShow,
  isFullHeight = false,
  position = 'right',
  onClose,
  backgroundColor,
  isSmall,
  children,
  isDisabledDefaultClose = false,
}) => {
  const theme = useTheme();

  const handleClose = useCallback(() => {
    if (isDisabledDefaultClose) {
      return;
    }
    onClose();
  }, [isDisabledDefaultClose, onClose]);
  return (
    <Drawer
      anchor={position}
      open={isShow}
      ModalProps={{
        disableEnforceFocus: true,
      }}
      onClose={() => handleClose()}
      PaperProps={{
        sx: {
          msOverflowStyle: 'none',
          '& ::-webkit-scrollbar': {
            width: '0px !important',
          },
          backgroundColor: backgroundColor ? backgroundColor : theme.palette.case.background,
          maxWidth: position === 'left' || position === 'right' ? (isSmall ? '400px' : '640px') : 'auto',
          width: '100%',
          minHeight: position === 'bottom' && !isFullHeight ? 'auto' : '100%',
          boxShadow: 'none',
        },
      }}
    >
      {children}
    </Drawer>
  );
};

export default MuiDrawer;

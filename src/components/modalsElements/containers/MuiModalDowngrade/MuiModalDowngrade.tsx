import React, { FC, ReactNode, useCallback } from 'react';
import { Box, Modal, styled, Typography, useMediaQuery, useTheme } from '@mui/material';
import NavigationButton from '../../../buttons/NavigationButton';
import {
  DividerLine,
  headerContainer,
  HeaderNameModal,
  ModalCloseButtonContainer,
  ModalContainer,
} from './MuiModalDowngrade.style';

type MuiDialogProps = {
  isShow: boolean;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl';
  customMaxWith?: string;
  minWidth?: string;
  children?: React.ReactNode;
  isHideCloseBtn?: boolean;
  onClose?: () => void;
  isDisabledDefaultClose?: boolean;
  isFullWidth?: boolean;
  isFullHeight?: boolean;
  headerName?: string | JSX.Element | null;
  headerWithIcon?: {
    title: string;
    subtitle: string;
    icon: ReactNode;
  };
};

const ItemIconContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '8px',
  border: `1px solid ${theme.palette.case.neutral.n100}`,
  width: '48px',
  height: '48px',
  backgroundColor: theme.palette.case.neutral.n0,
  marginRight: '16px',
}));

const MuiModalDowngrade: FC<MuiDialogProps> = ({
  onClose,
  isShow,
  maxWidth = 'sm',
  customMaxWith,
  minWidth,
  children,
  isHideCloseBtn = false,
  isFullWidth = false,
  isFullHeight = false,
  isDisabledDefaultClose = true,
  headerName = null,
  headerWithIcon = null,
}) => {
  const handleClose = useCallback(() => {
    if (isDisabledDefaultClose) {
      return;
    }
    if (onClose) {
      onClose();
    }
  }, [isDisabledDefaultClose, onClose]);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Modal sx={{ zIndex: 1300 }} onClose={handleClose} open={isShow}>
      <ModalContainer
        modalMinWith={minWidth}
        isFullWidth={isFullWidth}
        customMaxWith={customMaxWith}
        modalMaxWith={maxWidth}
        isFullHeight={isFullHeight}
      >
        {headerName !== null && (
          <Box>
            <Box sx={headerContainer}>
              <HeaderNameModal variant="s2">{headerName}</HeaderNameModal>
              {isHideCloseBtn && null}
              {!isHideCloseBtn && (
                <ModalCloseButtonContainer>
                  <NavigationButton size="medium" type="exit" onClick={onClose} background="none" />
                </ModalCloseButtonContainer>
              )}
            </Box>
            <DividerLine variant="middle" />
          </Box>
        )}
        {headerWithIcon !== null && (
          <Box
            display="flex"
            padding={isMobile ? '12px 16px' : '12px 24px'}
            sx={{
              borderBottom: `1px solid ${theme.palette.case.neutral.n100}`,
            }}
          >
            <ItemIconContainer>{headerWithIcon?.icon}</ItemIconContainer>
            <Box display="flex" flexDirection="column" alignItems="flex-start" justifyContent="center">
              <Typography variant={isMobile ? 's3' : 's2'} sx={{ color: theme.palette.case.neutral.n600 }}>
                {headerWithIcon?.title}
              </Typography>

              <Typography
                variant={isMobile ? 't12r' : 't14r'}
                sx={{
                  color: theme.palette.case.neutral.n500,
                  textAlign: 'start',
                  maxWidth: isMobile ? '210px' : '400px',
                  wordBreak: 'break-word',
                }}
              >
                {headerWithIcon?.subtitle}
              </Typography>
            </Box>
            <ModalCloseButtonContainer
              sx={{ position: 'absolute', right: isMobile ? '0' : '12px', top: isMobile ? '0' : '12px' }}
            >
              <NavigationButton size="medium" type="exit" onClick={onClose} background="none" />
            </ModalCloseButtonContainer>
          </Box>
        )}

        <Box sx={{ width: '100%' }}>{children}</Box>
      </ModalContainer>
    </Modal>
  );
};

export default MuiModalDowngrade;

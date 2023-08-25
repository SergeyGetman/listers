import React, { FC, ReactNode } from 'react';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { MuiButtonProps } from '../../../../../buttons/MuiButton/MuiButton';
import MuiTooltip from '../../../../../MuiTooltip';
import MuiLoadingButton from '../../../../../buttons/MuiLoadingButton';
import MuiButton from '../../../../../buttons/MuiButton';
import { HeaderDowngradeContentContainer } from './DowngradeContentContainer.style';
import { DividerLine } from '../../../../../modalsElements/containers/MuiModalDowngrade/MuiModalDowngrade.style';

export type ButtonsType = MuiButtonProps & {
  isShow: boolean;
  isLoadingBtn?: boolean;
  loading?: boolean;
  tooltipText?: string;
};

type PropsType = {
  title: string | ReactNode;
  children: ReactNode;
  rightBtnProps?: ButtonsType;
  leftBtnProps?: ButtonsType;
  onClose?: () => void;
  isShowTitle?: boolean;
};
const DowngradeFormButton = ({ isShow, isLoadingBtn, tooltipText = '', ...rest }: ButtonsType) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  if (!isShow) return null;

  if (isLoadingBtn) {
    return (
      <MuiTooltip title={tooltipText}>
        <Box component="span" sx={{ width: isMobile ? '100%' : null }}>
          <MuiLoadingButton {...rest} />
        </Box>
      </MuiTooltip>
    );
  }

  return (
    <MuiTooltip title={tooltipText}>
      <Box component="span" sx={{ width: isMobile ? '100%' : null }}>
        <MuiButton {...rest} />
      </Box>
    </MuiTooltip>
  );
};

const DowngradeContentContainer: FC<PropsType> = ({
  leftBtnProps,
  rightBtnProps,
  title,
  children,
  isShowTitle = true,
}) => {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      {isShowTitle && (
        <HeaderDowngradeContentContainer isMobile={isMobile}>
          <Typography variant="h2" sx={{ color: theme.palette.case.neutral.n800 }}>
            {title}
          </Typography>
        </HeaderDowngradeContentContainer>
      )}
      {children}

      <Box
        sx={{
          width: '100%',
          paddingTop: '40px',
          position: !isMobile ? 'static' : 'fixed',
          bottom: !isMobile ? 'none' : '0',
        }}
      >
        <DividerLine variant="middle" />
        <Box
          sx={{
            display: 'flex',
            justifyContent: !isMobile ? 'flex-end' : 'center',
            alignItems: 'center',
            gap: '16px',
            p: '16px 24px',
            background: isMobile ? theme.palette.case.contrast.white : 'transparent',
          }}
        >
          {leftBtnProps?.isShow && <DowngradeFormButton {...leftBtnProps} />}
          {rightBtnProps?.isShow && <DowngradeFormButton {...rightBtnProps} />}
        </Box>
      </Box>
    </>
  );
};

export default DowngradeContentContainer;

import React, { FC } from 'react';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import Stepper from '../../../../../../Stepper';
import { MuiButtonProps } from '../../../../../../buttons/MuiButton/MuiButton';
import MuiTooltip from '../../../../../../MuiTooltip';
import MuiLoadingButton from '../../../../../../buttons/MuiLoadingButton';
import MuiButton from '../../../../../../buttons/MuiButton';
import MuiDefaultDrawerHeader from '../../../../../../modalsElements/containers/MuiDrawer/MuiDrawersHeders/MuiDefaultDrawerHeader';
import ModalFooter from '../../../../../../modalsElements/containers/Footer/ModalFooter';

export type ButtonsType = MuiButtonProps & {
  isShow: boolean;
  isLoadingBtn?: boolean;
  loading?: boolean;
  tooltipText?: string;
};

type Props = {
  title: string;
  isStepper?: boolean;
  step?: number;
  countSteps?: number;
  children: React.ReactNode;
  rightBtnProps?: ButtonsType;
  middleBtnProps?: ButtonsType;
  leftBtnProps?: ButtonsType;
  onClose?: () => void;
};

const DowngradeFormButton = ({ isShow, isLoadingBtn, tooltipText = '', ...rest }: ButtonsType) => {
  if (!isShow) return null;

  if (isLoadingBtn) {
    return (
      <MuiTooltip title={tooltipText}>
        <Box component="span">
          <MuiLoadingButton {...rest} />
        </Box>
      </MuiTooltip>
    );
  }

  return (
    <MuiTooltip title={tooltipText}>
      <Box component="span">
        <MuiButton {...rest} />
      </Box>
    </MuiTooltip>
  );
};

const DowngradeFormsContainer: FC<Props> = ({
  title,
  isStepper = true,
  step = 1,
  countSteps = 1,
  rightBtnProps = { isShow: false, label: '' },
  middleBtnProps = { isShow: false, label: '' },
  leftBtnProps = { isShow: false, label: '' },
  onClose,
  children,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return isMobile ? (
    <Box display="flex" height="100%" flexDirection="column">
      <MuiDefaultDrawerHeader
        isShowCloseBtn={false}
        isRoundCloseButton
        onClose={() => (onClose ? onClose() : true)}
        title={title}
      />
      <Box mt="16px" p="0 16px" sx={{ flexGrow: 1 }}>
        <Box mb="16px" display="flex" justifyContent="center">
          {isStepper ? <Stepper count={countSteps} selected={step} /> : null}
        </Box>
        {children}
      </Box>
      <ModalFooter isShow rightBtnProps={rightBtnProps} middleBtnProps={middleBtnProps} />
    </Box>
  ) : (
    <Box display="flex" width="100%" flexDirection="column">
      <Box p="24px" flexGrow={1}>
        <Box mb="8px">
          <Typography sx={{ textAlign: 'center' }} variant="h2">
            {title}
          </Typography>
        </Box>
        <Box mb="16px" display="flex" justifyContent="center">
          {isStepper ? <Stepper count={countSteps} selected={step} /> : null}
        </Box>
        <Box>{children}</Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          p: '16px 25px',
          boxShadow: '0px 0px 7px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Box>
          {leftBtnProps.isShow && (
            <Box>
              <DowngradeFormButton {...leftBtnProps} />
            </Box>
          )}
        </Box>
        <Box display="flex">
          {middleBtnProps.isShow && (
            <Box>
              <DowngradeFormButton {...middleBtnProps} />
            </Box>
          )}
          {rightBtnProps.isShow && (
            <Box sx={{ marginLeft: '24px' }}>
              <DowngradeFormButton {...rightBtnProps} />
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default DowngradeFormsContainer;

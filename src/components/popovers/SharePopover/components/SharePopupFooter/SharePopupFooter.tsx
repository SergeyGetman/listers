import React, { FC } from 'react';
import { Box, useTheme } from '@mui/material';
import { MuiButtonProps } from '../../../../buttons/MuiButton/MuiButton';
import MuiLoadingButton from '../../../../buttons/MuiLoadingButton';

type ModalFooterBtnType = MuiButtonProps & {
  isShow: boolean;
  isLoadingBtn?: boolean;
  loading?: boolean;
  tooltipText?: string;
  isFullWidth?: boolean;
};

type SharePopupFooterProps = {
  rightBtnProps?: ModalFooterBtnType;
  middleBtnProps?: ModalFooterBtnType;
};
const SharePopupFooter: FC<SharePopupFooterProps> = ({ rightBtnProps, middleBtnProps }) => {
  const theme = useTheme();
  return (
    <Box sx={{ height: '64px', p: '16px 24px', borderTop: `1px solid ${theme.palette.case.neutral.n100}` }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          [theme.breakpoints.down('sm')]: {
            justifyContent: 'center',
          },
        }}
      >
        {middleBtnProps?.isShow && (
          <Box mr="16px">
            <MuiLoadingButton {...middleBtnProps} />
          </Box>
        )}
        {rightBtnProps?.isShow && <MuiLoadingButton {...rightBtnProps} />}
      </Box>
    </Box>
  );
};

export default SharePopupFooter;

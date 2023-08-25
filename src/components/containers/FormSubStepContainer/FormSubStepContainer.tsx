import React, { FC } from 'react';
import { Box, useTheme } from '@mui/material';
import MuiButton from '../../buttons/MuiButton';
import { MuiButtonProps } from '../../buttons/MuiButton/MuiButton';
import MuiLoadingButton from '../../buttons/MuiLoadingButton';

type ButtonsType = MuiButtonProps & {
  isShow: boolean;
  isLoadingBtn?: boolean;
  loading?: boolean;
  tooltipText?: string;
};

type FormSubStepContainerProps = {
  children?: React.ReactNode;
  skipBtnProps?: ButtonsType;
  backBtnProps?: ButtonsType;
  nextBtnProps?: ButtonsType;
};
const FormSubStepContainer: FC<FormSubStepContainerProps> = ({
  children,
  skipBtnProps,
  backBtnProps,
  nextBtnProps,
}) => {
  const theme = useTheme();
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      {children}
      <Box
        sx={{
          position: 'absolute',
          bottom: '0',
          left: '0',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          padding: '16px 0',
          backgroundColor: theme.palette.case.neutral.n0,
          height: '66px',
          borderTop: `1px solid ${theme.palette.case.neutral.n300}`,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '920px',
          }}
        >
          <Box>
            {skipBtnProps && skipBtnProps.isShow && (
              <MuiButton size="medium" variant="outlined" {...skipBtnProps} />
            )}
          </Box>
          <Box sx={{ display: 'flex' }}>
            {backBtnProps && backBtnProps.isShow && (
              <MuiButton sx={{ mr: '24px' }} size="medium" variant="outlined" {...backBtnProps} />
            )}
            {nextBtnProps && nextBtnProps.isShow && (
              <MuiLoadingButton size="medium" variant="contained" {...nextBtnProps} />
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default FormSubStepContainer;

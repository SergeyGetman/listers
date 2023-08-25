import React, { FC } from 'react';
import { Box } from '@mui/material';
import { IFooterNavigateGarage } from '../types';
import MuiButton from '../../../components/buttons/MuiButton';
import MuiLoadingButton from '../../../components/buttons/MuiLoadingButton';
import { FooterNavigationPanel } from './FooterNavigationPanelGarage.style';

const FooterNavigateGarage: FC<IFooterNavigateGarage> = ({
  children,
  skipBtnProps,
  backBtnProps,
  nextBtnProps,
}) => {
  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        {children}
        <FooterNavigationPanel>
          <Box
            sx={{
              padding: '0 20px',
            }}
          >
            <Box sx={{ display: 'flex' }}>
              {backBtnProps && backBtnProps.isShow && (
                <MuiButton sx={{ mr: '24px' }} size="medium" variant="text" {...backBtnProps} />
              )}
              <Box sx={{ display: 'flex', marginLeft: 'auto' }}>
                <Box sx={{ margin: '0px 20px' }}>
                  {skipBtnProps && skipBtnProps.isShow && (
                    <MuiButton size="medium" variant="outlined" {...skipBtnProps} />
                  )}
                </Box>

                <Box sx={{ marginLeft: 'auto' }}>
                  {nextBtnProps && nextBtnProps.isShow && (
                    <MuiLoadingButton size="medium" variant="contained" {...nextBtnProps} />
                  )}
                </Box>
              </Box>
            </Box>
          </Box>
        </FooterNavigationPanel>
      </Box>
    </>
  );
};

export default FooterNavigateGarage;

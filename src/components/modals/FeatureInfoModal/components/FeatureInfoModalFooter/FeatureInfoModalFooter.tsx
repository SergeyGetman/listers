import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import MuiButton from '../../../../buttons/MuiButton';
import { ModalFooterContainer } from './FeatureInfoModalFooter.style';
import { ModalFooterBtnModel } from '../../footerModalBtn.model';

type OrganizerInfoModalFooterProps = {
  onClose: () => void;
  rightBtnProps: ModalFooterBtnModel;
};
const FeatureInfoModalFooter: FC<OrganizerInfoModalFooterProps> = ({ onClose, rightBtnProps }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobileDisplay = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <ModalFooterContainer>
      {!!rightBtnProps ? (
        <>
          {isMobileDisplay ? (
            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
              <Box sx={{ mr: '16px', width: '100%' }}>
                <MuiButton
                  color="primary"
                  size="small"
                  fullWidth
                  variant="outlined"
                  label={t('general.buttons.close')}
                  onClick={onClose}
                />
              </Box>
              <Box sx={{ width: '100%' }}>
                <MuiButton {...rightBtnProps} size="small" fullWidth />
              </Box>
            </Box>
          ) : (
            <>
              <Box sx={{ mr: '24px' }}>
                <MuiButton
                  color="primary"
                  size="small"
                  variant="outlined"
                  label={t('general.buttons.close')}
                  onClick={onClose}
                />
              </Box>
              <MuiButton {...rightBtnProps} size="small" />
            </>
          )}
        </>
      ) : (
        <MuiButton
          color="primary"
          size="small"
          fullWidth={isMobileDisplay}
          variant="contained"
          label={t('general.buttons.close')}
          onClick={onClose}
        />
      )}
    </ModalFooterContainer>
  );
};

export default FeatureInfoModalFooter;

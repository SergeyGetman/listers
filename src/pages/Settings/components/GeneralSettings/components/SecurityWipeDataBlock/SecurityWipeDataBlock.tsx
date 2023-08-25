import React, { FC, useCallback, useMemo } from 'react';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import MuiBaseAccordion from '../../../../../../components/accordions/MuiBaseAccordion';
import { SecurityWipeDataConfirmLink, SecurityWipeDataContentContainer } from './SecurityWipeDataBlock.style';
import MuiBaseMobileAccordion from '../../../../../../components/accordions/MuiBaseMobileAccordion';
import { ModalNamesEnum } from '../../../../../../shared/enums/modalNames.enum';
import { useAppDispatch } from '../../../../../../shared/hooks/redux';
import { deleteProfile } from '../../../../../../store/Profile/profile.actions';
import { setAuth } from '../../../../../../store/Common/commonSlice';
import modalObserver from '../../../../../../shared/utils/observers/modalObserver';

type SecurityWipeDataBlockProps = {
  isSmallDisplay: boolean;
};
const SecurityWipeDataBlock: FC<SecurityWipeDataBlockProps> = ({ isSmallDisplay }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const handleOpenDeleteAccConfirm = useCallback(() => {
    modalObserver.addModal(ModalNamesEnum.baseConfirmModal, {
      props: {
        title: t('generalSettings.deleteAccountWithoutPassword.containerLabel'),
        text: t('generalSettings.deleteAccountWithoutPassword.contentText'),
        cancelBtnText: t('general.buttons.cancel'),
        confirmBtnText: t('general.buttons.confirm'),
        handleConfirm: () => {
          dispatch(deleteProfile({ password: null })).then((result) => {
            if (deleteProfile.fulfilled.match(result)) {
              localStorage.removeItem('token');
              dispatch(setAuth(false));
            }
          });
        },
        handleCancel: false,
      },
    });
  }, [dispatch, t]);

  const getSecurityWipeDataContent = useMemo(() => {
    return (
      <SecurityWipeDataContentContainer>
        <Typography variant="default">{t('generalSettings.securityWipeData.contentText')}</Typography>
        <SecurityWipeDataConfirmLink noWrap variant="default" onClick={() => handleOpenDeleteAccConfirm()}>
          {t('generalSettings.securityWipeData.contentLink')}
        </SecurityWipeDataConfirmLink>
      </SecurityWipeDataContentContainer>
    );
  }, [t, handleOpenDeleteAccConfirm]);

  return isSmallDisplay ? (
    <Box sx={{ marginTop: '20px', width: '100%' }}>
      <MuiBaseMobileAccordion title={t('generalSettings.securityWipeData.containerLabel')}>
        <Box sx={{ padding: '0 10px 10px 10px' }}>{getSecurityWipeDataContent}</Box>
      </MuiBaseMobileAccordion>
    </Box>
  ) : (
    <Box sx={{ width: '100%', maxWidth: '460px' }}>
      <MuiBaseAccordion
        label={t('generalSettings.securityWipeData.containerLabel')}
        isShowInfoDialog={false}
        isDisabledExpand={false}
        withHover
      >
        {getSecurityWipeDataContent}
      </MuiBaseAccordion>
    </Box>
  );
};

export default SecurityWipeDataBlock;

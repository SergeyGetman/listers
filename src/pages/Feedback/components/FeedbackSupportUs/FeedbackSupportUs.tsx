import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import MuiBaseAccordion from '../../../../components/accordions/MuiBaseAccordion';
import MuiButton from '../../../../components/buttons/MuiButton';
import { getSupportThread } from '../../../../store/chat/chatThunk';
import { useAppDispatch } from '../../../../shared/hooks/redux';
import { setLoading } from '../../../../store/Common/commonSlice';

const FeedbackSupportUs = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const openSupportChat = () => {
    dispatch(setLoading(true));
    dispatch(getSupportThread())
      .then((result) => {
        if (getSupportThread.fulfilled.match(result)) {
          navigate(`/chat/personal/${result.payload.id}`);
        }
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };
  return (
    <Box sx={{ marginTop: '30px' }}>
      <MuiBaseAccordion isShowInfoDialog={false} isDisabledExpand label={t('general.containers.supportUs')}>
        <Typography variant="large">{t('feedback.supportUsInfo.supportUsInfoDescription')}</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: '16px' }}>
          <MuiButton onClick={openSupportChat} label={t('general.buttons.contactSupport')} size="medium" />
        </Box>
      </MuiBaseAccordion>
    </Box>
  );
};

export default FeedbackSupportUs;

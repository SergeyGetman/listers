import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../../shared/hooks/redux';
import { setBreadcrumbs } from '../../store/Common/commonThunk';
import FeedbackRateUs from './components/FeedbackRateUs';
import FeedbackSupportUs from './components/FeedbackSupportUs';

const Feedback = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setBreadcrumbs([{ title: t('general.breadcrumbs.feedback') }]));
  }, [dispatch, t]);
  return (
    <Box sx={{ maxWidth: '620px', pb: '100px' }}>
      <FeedbackRateUs />
      <FeedbackSupportUs />
    </Box>
  );
};

export default Feedback;

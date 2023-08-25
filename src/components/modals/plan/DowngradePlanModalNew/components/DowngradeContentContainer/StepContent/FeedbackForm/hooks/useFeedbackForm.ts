import { useMediaQuery, useTheme } from '@mui/material';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../../../../../../../../../shared/hooks/redux';
import { planRadioText } from '../../../../../../DowngradePlanModal/DowngradePlanContainer/components/DoungradeForm/config';

import { createSubscriptionFeedbackMapper } from '../utils/createSubscriptionFeedbackMapper';
import { createSubscriptionFeedback } from '../../../../../../../../../store/settings/settingsThunk';
import { defaultValuesForFeedback } from '../const/defaultValuesForFeedback';
import { STEP_CASE } from '../../../../DowngradeContainer/enum/stepCaseEnum';
import { setLoading } from '../../../../../../../../../store/Common/commonSlice';

export const useFeedbackForm = (
  setNewStep: (newStep: STEP_CASE, newHeader: string, step: number) => void,
) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    getValues,
  } = useForm({
    mode: 'onSubmit',
    defaultValues: defaultValuesForFeedback,
  });
  const watcherRadioReason = watch('checkbox');
  const IS_RADIO_REASON_OTHER = watcherRadioReason === planRadioText.other;

  const handleChangeStep = (requestStatus: string, radioReason: string): void => {
    if (requestStatus === 'fulfilled' && radioReason === planRadioText.works) {
      setNewStep(STEP_CASE.BOOK_A_DEMO, t('plans.downgrade.header.bookDemo'), 3);
      return;
    }
    setNewStep(STEP_CASE.TOO_MUCH, t('plans.downgrade.header.tooMuchOther'), 3);
  };

  const feedbackFormSubmit: SubmitHandler<FieldValues> = async (data) => {
    dispatch(setLoading(true));

    const feedback = await createSubscriptionFeedbackMapper(data);
    const res = await dispatch(createSubscriptionFeedback({ data: feedback }));

    await handleChangeStep(res?.meta.requestStatus, watcherRadioReason);
    dispatch(setLoading(false));
  };

  return {
    control,
    handleSubmit,
    errors,
    isSubmitting,
    isMobile,
    getValues,
    theme,
    watcherRadioReason,
    feedbackFormSubmit,
    IS_RADIO_REASON_OTHER,
    t,
  };
};

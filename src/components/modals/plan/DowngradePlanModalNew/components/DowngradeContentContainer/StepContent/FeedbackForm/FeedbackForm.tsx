import React, { FC } from 'react';
import { Box, RadioGroup, Typography } from '@mui/material';
import { Controller } from 'react-hook-form';
import DowngradeContentContainer from '../../DowngradeContentContainer';
import MuiRadioButton from '../../../../../../../formElements/MuiRadioButton';
import MuiCustomEditor from '../../../../../../../formElements/MuiCustomEditor';
import { planRadioText } from '../../../../../DowngradePlanModal/DowngradePlanContainer/components/DoungradeForm/config';
import { useFeedbackForm } from './hooks/useFeedbackForm';
import { validateEditor } from './utils/validateEditor';
import { STEP_CASE } from '../../../DowngradeContainer/enum/stepCaseEnum';

type PropsType = {
  onClose: () => void;
  setNewStep: (newStep: STEP_CASE, newHeader: string, step: number, stepIndicator?: boolean) => void;
};

const FeedbackForm: FC<PropsType> = ({ onClose, setNewStep }) => {
  const {
    control,
    handleSubmit,
    feedbackFormSubmit,
    isMobile,
    errors,
    isSubmitting,
    getValues,
    theme,
    IS_RADIO_REASON_OTHER,
    t,
  } = useFeedbackForm(setNewStep);

  return (
    <form noValidate autoComplete="off" onSubmit={handleSubmit(feedbackFormSubmit)} style={{ width: '100%' }}>
      <DowngradeContentContainer
        title={t('plans.downgrade.feedback.title')}
        rightBtnProps={{
          isShow: true,
          label: t('plans.button.keepPlan'),
          onClick: onClose,
          variant: 'contained',
          fullWidth: isMobile,
          type: 'button',
        }}
        leftBtnProps={{
          isShow: true,
          label: t('plans.button.downgrade'),
          variant: 'outlined',
          fullWidth: isMobile,
          isDisabled: isSubmitting,
          type: 'submit',
          isStopPropagation: false,
        }}
      >
        <Box width="100%" px="24px" pt="40px">
          <Box width="100%" display="flex" flexDirection="column">
            <Controller
              name="checkbox"
              control={control}
              rules={{
                required: 'The reason is required',
                validate: {
                  atLeastOneChecked: (value) => {
                    const values = getValues().checkboxes;
                    return values?.some((val) => val.text === value);
                  },
                },
              }}
              render={({ field }) => {
                return (
                  <RadioGroup sx={{ gap: '16px' }} {...field}>
                    <MuiRadioButton
                      sx={{ border: errors.checkbox ? '1px solid #DC2625' : 'none' }}
                      value={planRadioText.works}
                      label={planRadioText.works}
                      checked={field.value === planRadioText.works}
                    />
                    <MuiRadioButton
                      sx={{ border: errors.checkbox ? '1px solid #DC2625' : 'none' }}
                      value={planRadioText.tooMuch}
                      label={planRadioText.tooMuch}
                      checked={field.value === planRadioText.tooMuch}
                    />
                    <MuiRadioButton
                      sx={{ border: errors.checkbox ? '1px solid #DC2625' : 'none' }}
                      value={planRadioText.other}
                      label={planRadioText.other}
                      checked={field.value === planRadioText.other}
                    />
                  </RadioGroup>
                );
              }}
            />
            {errors.checkbox && (
              <Typography mt="8px" variant="t12r" sx={{ color: theme.palette.case.red.r600 }}>
                {errors.checkbox.message}
              </Typography>
            )}
          </Box>
        </Box>
        <Box px="24px" pt="40px">
          <Controller
            name="description"
            control={control}
            rules={{
              validate: IS_RADIO_REASON_OTHER ? validateEditor : undefined,
            }}
            render={({ field }) => {
              return (
                <Box>
                  <MuiCustomEditor
                    {...field}
                    maxHeight={isMobile ? '144px' : '116px'}
                    maxHintValue={5000}
                    placeholder={isMobile ? 'Type here ' : 'Your detailed answer is important to us'}
                    value={field.value}
                    isShowHint
                    label={' '}
                  />
                </Box>
              );
            }}
          />
          {IS_RADIO_REASON_OTHER && errors.description && (
            <Typography mt="8px" variant="t12r" sx={{ color: theme.palette.case.red.r600 }}>
              {errors.description.message}
            </Typography>
          )}
        </Box>
      </DowngradeContentContainer>
    </form>
  );
};

export default FeedbackForm;

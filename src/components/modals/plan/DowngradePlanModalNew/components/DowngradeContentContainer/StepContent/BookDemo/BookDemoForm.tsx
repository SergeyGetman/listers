import React, { FC } from 'react';
import { Avatar, Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Controller, FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Moment from 'moment';
import { useTranslation } from 'react-i18next';
import DowngradeContentContainer from '../../DowngradeContentContainer';
import MuiDatePicker from '../../../../../../../formElements/MuiDatePicker';

import { StyledBadge } from './BookDemoForm.style';
import { useAppDispatch, useAppSelector } from '../../../../../../../../shared/hooks/redux';
import { setSupportTimeBookDemo } from '../../../../../../../../store/settings/settingsThunk';
import { setLoading } from '../../../../../../../../store/Common/commonSlice';
import { STEP_CASE } from '../../../DowngradeContainer/enum/stepCaseEnum';
import { covertToUTCFormat } from '../SuccesBookDemo/utils/covertToUTCFormat';
import Manager from '../../../../../../../../assets/Images/manager.png';
import { isLoadingSelector } from '../../../DowngradeContainer/selector/selectors';

type PropsType = {
  onClose: () => void;
  setNewStep: (newStep: STEP_CASE, newHeader: string, step: number, stepIndicator?: boolean) => void;
  canselSubscription: () => void;
};

const BookDemoForm: FC<PropsType> = ({ setNewStep, canselSubscription }) => {
  const isLoading = useAppSelector(isLoadingSelector);
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: 'onSubmit',
    defaultValues: {
      date: [],
    },
  });

  const submitSupportMeet: SubmitHandler<FieldValues> = async (data) => {
    dispatch(setLoading(true));

    const [startDate, endDate] = data.date;
    const [supportTimeStart, supportTimeEnd] = covertToUTCFormat(startDate, endDate);

    const res = await dispatch(setSupportTimeBookDemo({ supportTimeStart, supportTimeEnd }));
    if (res?.meta.requestStatus === 'fulfilled') {
      await setNewStep(STEP_CASE.SUCCESS_BOOK, t('plans.downgrade.header.successBook'), 3, false);
      dispatch(setLoading(false));
    }
  };

  return (
    <form noValidate autoComplete="off" style={{ width: '100%' }} onSubmit={handleSubmit(submitSupportMeet)}>
      <DowngradeContentContainer
        title={t('plans.downgrade.bookDemo.title')}
        rightBtnProps={{
          isShow: true,
          label: t('plans.button.bookDemo'),
          variant: 'contained',
          fullWidth: isMobile,
          isDisabled: isSubmitting || !!isLoading,
          type: 'submit',
          isStopPropagation: false,
        }}
        leftBtnProps={{
          isShow: true,
          fullWidth: isMobile,
          isDisabled: isSubmitting || !!isLoading,
          label: t('plans.button.downgrade'),
          variant: 'outlined',
          type: 'button',
          onClick: canselSubscription,
          isStopPropagation: false,
        }}
      >
        <Box px={isMobile ? '16px' : '24px'}>
          <Box display="flex" justifyContent="center">
            <Typography
              variant="t12r"
              sx={{ color: theme.palette.case.neutral.n600, width: '261px', textAlign: 'center' }}
            >
              {t('plans.downgrade.bookDemo.content.exclusive')}
            </Typography>
          </Box>

          <Box pt="40px" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box display="flex" alignItems="center" gap="10px">
              <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                variant="dot"
              >
                <Avatar src={Manager} alt="manager" />
              </StyledBadge>
              <Box display="flex" flexDirection="column">
                <Typography variant="t14r">{t('plans.downgrade.bookDemo.content.sophie')}</Typography>
                <Typography variant="t12r" sx={{ color: theme.palette.case.neutral.n400 }}>
                  {t('plans.downgrade.bookDemo.content.service')}
                </Typography>
              </Box>
            </Box>

            <Box maxWidth={isMobile ? '163px' : '185px'} minWidth={isMobile ? '165px' : '0'} width="100%">
              <Typography variant={isMobile ? 't12r' : 't14r'}>
                <Typography
                  mx="4px"
                  variant={isMobile ? 't12r' : 't14r'}
                  sx={{ color: theme.palette.case.primary.p700 }}
                >
                  {t('plans.downgrade.bookDemo.content.hubmee')}
                </Typography>
                {t('plans.downgrade.bookDemo.content.support')}
              </Typography>
            </Box>
          </Box>
          <Box pt="20px" width={isMobile ? '100%' : '315px'}>
            <Controller
              control={control}
              name="date"
              rules={{
                required: 'The date is required',
                validate: (value) => {
                  if (Array.isArray(value) && value.length === 2 && value[1] === null) {
                    return 'Please select both dates';
                  }
                  return true;
                },
              }}
              render={({ field }) => {
                return (
                  <MuiDatePicker
                    {...field}
                    isClearable={false}
                    isFullWidth={isMobile}
                    errorMessage={errors.date?.message}
                    isError={!!errors.date}
                    onChange={(date: Date | [Date | null, Date | null] | null) => {
                      // @ts-ignore
                      field.onChange(date);
                    }}
                    dateFormat="MMM d, yyyy"
                    minDate={Moment(new Date()).toDate()}
                    label="Select a date"
                    size="medium"
                    isRange
                    isShrink
                    isReadOnly={isMobile}
                  />
                );
              }}
            />
          </Box>
        </Box>
      </DowngradeContentContainer>
    </form>
  );
};

export default BookDemoForm;

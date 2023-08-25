import React, { ChangeEvent, FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, RadioGroup } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import Moment from 'moment';
import { setWalletFilters, WalletFilters } from '../../../../../../store/wallet/walletSlice';
import { useAppDispatch } from '../../../../../../shared/hooks/redux';
import { useDebounce } from '../../../../../../shared/hooks/useDebounce';
import MuiDatePicker from '../../../../../../components/formElements/MuiDatePicker';
import MuiRadioButton from '../../../../../../components/formElements/MuiRadioButton';
import MuiBaseTextFiled from '../../../../../../components/formElements/MuiBaseTextFiled';
import { DatePickerBox } from './WalletNavigationPanel.style';
type WalletNavigationPanelProps = {
  filters: WalletFilters;
};
const WalletNavigationPanel: FC<WalletNavigationPanelProps> = ({ filters }) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const initialValues = {
    date_to: [
      filters.date_time_from ? Moment.utc(filters.date_time_from).local().toDate() : null,
      filters.date_time_to ? Moment.utc(filters.date_time_to).local().toDate() : null,
    ],
    query: filters.query ? filters.query : '',
    status: filters.status,
  };

  const { control, watch, setValue } = useForm({
    defaultValues: initialValues,
  });
  const onSubmit = () => {
    const formValues = watch();
    const dateTimeTo = formValues.date_to
      ? formValues.date_to[1] !== null
        ? Moment(
            `${Moment(formValues.date_to[1]).format('MM/DD/YYYY')} ${Moment('23:59:00', 'HH:mm:ss').format(
              'HH:mm:ss',
            )}`,
          )
            .utc()
            .format('YYYY-MM-DD HH:mm:ss')
        : formValues.date_to[0] !== null
        ? Moment(
            `${Moment(formValues.date_to[0]).format('MM/DD/YYYY')} ${Moment('23:59:00', 'HH:mm:ss').format(
              'HH:mm:ss',
            )}`,
          )
            .utc()
            .format('YYYY-MM-DD HH:mm:ss')
        : null
      : null;

    const dateTimeFrom = formValues.date_to
      ? formValues.date_to[0] !== null
        ? Moment(
            `${Moment(formValues.date_to[0]).format('MM/DD/YYYY')} ${Moment('00:00:00', 'HH:mm:ss').format(
              'HH:mm:ss',
            )}`,
          )
            .utc()
            .format('YYYY-MM-DD HH:mm:ss')
        : formValues.date_to[1] !== null
        ? Moment(
            `${Moment(formValues.date_to[1]).format('MM/DD/YYYY')} ${Moment('00:00:00', 'HH:mm:ss').format(
              'HH:mm:ss',
            )}`,
          )
            .utc()
            .format('YYYY-MM-DD HH:mm:ss')
        : null
      : null;
    const submitData = {
      date_time_to: dateTimeTo,
      date_time_from: dateTimeFrom,
      query: formValues.query,
      status: formValues.status,
    };

    dispatch(setWalletFilters(submitData));
  };

  const debounceFilters = useDebounce(() => {
    onSubmit();
  }, 1500);

  return (
    <form noValidate style={{ height: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'inherit' },
          alignItems: { xs: 'flex-start', sm: 'center' },
          width: '100%',
        }}
      >
        <DatePickerBox>
          <Controller
            name="date_to"
            control={control}
            render={({ field }) => (
              <MuiDatePicker
                {...field}
                onChange={(val: [Date | null, Date | null]) => {
                  setValue('date_to', val);
                  debounceFilters();
                }}
                isClearable
                isRange
                placeholder={t('general.placeholders.select_dates')}
              />
            )}
          />
        </DatePickerBox>
        <Box
          sx={{
            maxWidth: '290px',
            width: '100%',
            mr: '20px',
            display: { xs: 'none', sm: 'block' },
          }}
        >
          <Controller
            name="query"
            control={control}
            render={({ field }) => (
              <MuiBaseTextFiled
                {...field}
                onChange={(val: ChangeEvent<HTMLInputElement>) => {
                  setValue('query', val.target.value);
                  debounceFilters();
                }}
                placeholder={t('general.placeholders.search_by_plan_name')}
              />
            )}
          />
        </Box>
        <Box sx={{ mt: { xs: '16px', sm: '0' } }}>
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <RadioGroup
                {...field}
                sx={{ display: 'flex', flexDirection: 'row', flexShrink: '0' }}
                aria-label="quiz"
                onChange={(event: ChangeEvent<HTMLInputElement>, value: string) => {
                  setValue('status', value);
                  debounceFilters();
                }}
              >
                <Box sx={{ mr: '20px' }}>
                  <MuiRadioButton value="all" label={t('general.buttons.all')} />
                </Box>
                <Box sx={{ mr: '20px' }}>
                  <MuiRadioButton
                    value="paid"
                    label={t('wallet.billingHistoryInfo.billingHistoryInfoStatus.paid')}
                  />
                </Box>
                <Box>
                  <MuiRadioButton
                    value="open"
                    label={t('wallet.billingHistoryInfo.billingHistoryInfoStatus.declined')}
                  />
                </Box>
              </RadioGroup>
            )}
          />
        </Box>
      </Box>
      <Box sx={{ width: '100%', mt: '16px', display: { xs: 'block', sm: 'none' } }}>
        <Controller
          name="query"
          control={control}
          render={({ field }) => (
            <MuiBaseTextFiled
              {...field}
              onChange={(val: ChangeEvent<HTMLInputElement>) => {
                setValue('query', val.target.value);
                debounceFilters();
              }}
              label={t('general.fieldNames.searchByText')}
              placeholder={t('general.placeholders.search_by_plan_name')}
              size="medium"
            />
          )}
        />
      </Box>
    </form>
  );
};

export default WalletNavigationPanel;

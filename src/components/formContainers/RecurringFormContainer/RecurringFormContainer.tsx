/* eslint-disable react-hooks/exhaustive-deps */

import React, { FC, useMemo } from 'react';
import { Control, Controller, UseFormSetValue, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Box, Collapse } from '@mui/material';
import MuiDotAccordion from '../../accordions/MuiDotAccordion';
import MuiSelect from '../../formElements/MuiSelect';
import { RecurringTypeConfig } from '../../../shared/configs/selectors/recurringType.config';
import { RecurringTypeEnum } from '../../../shared/enums/recurringType.enum';
import DailyCustomRecurring from './components/DailyCustomRecurring';
import WeeklyCustomRecurring from './components/WeeklyCustomRecurring';
import MonthlyCustomRecurring from './components/MonthlyCustomRecurring';
import CustomRecurringHeader from './components/CustomRecurringHeader';
import { RecurringFormContainerOverlay } from './RecurringFromContainer.style';

type RecurringFormContainerProps = {
  control: Control<any>;
  setValue: UseFormSetValue<any>;
  isContainAccordion?: boolean;
  isDefaultExpand?: boolean;
  placeholder?: string;
  isDisabledRecurring?: boolean;
};

const RecurringFormContainer: FC<RecurringFormContainerProps> = ({
  setValue,
  control,
  isContainAccordion = false,
  isDefaultExpand = false,
  placeholder,
  isDisabledRecurring,
}) => {
  const { t } = useTranslation();
  const frequencyType = useWatch({
    control,
    name: 'recurring_pattern.recurring_type',
  });
  const isShowCustomBlock =
    useWatch({
      control,
      name: 'recurring_pattern.frequency_type',
    })?.value === RecurringTypeEnum.CUSTOM;

  const frequencyTypeOptions = [
    RecurringTypeConfig[RecurringTypeEnum.DAILY],
    RecurringTypeConfig[RecurringTypeEnum.WEEKLY],
    RecurringTypeConfig[RecurringTypeEnum.MONTHLY],
    RecurringTypeConfig[RecurringTypeEnum.CUSTOM],
  ];

  const handleChangeFrequency = (val: { value: string; label: string }) => {
    setValue('recurring_pattern.repeat_interval', '1', { shouldValidate: true });
    setValue('recurring_pattern.frequency_type', val);
  };

  const renderContent = useMemo(() => {
    return (
      <Box sx={{ position: 'relative' }}>
        {isDisabledRecurring && <RecurringFormContainerOverlay />}

        <Box sx={{ width: '50%', mt: '16px' }}>
          <Controller
            name="recurring_pattern.frequency_type"
            control={control}
            render={({ field, fieldState }) => (
              <MuiSelect
                {...field}
                isSearchable
                isClearable
                onChange={handleChangeFrequency}
                isError={!!fieldState?.error?.message}
                helpText={fieldState?.error?.message}
                options={frequencyTypeOptions}
                label={t('general.fieldNames.recurrence')}
                placeholder={placeholder}
              />
            )}
          />
        </Box>

        <Collapse in={isShowCustomBlock}>
          <Box sx={{ mt: '16px' }}>
            <CustomRecurringHeader control={control} />
            <Box sx={{ mt: '16px' }}>
              {frequencyType === RecurringTypeEnum.DAILY && <DailyCustomRecurring control={control} />}
              {frequencyType === RecurringTypeEnum.WEEKLY && (
                <WeeklyCustomRecurring control={control} setValue={setValue} />
              )}
              {frequencyType === RecurringTypeEnum.MONTHLY && <MonthlyCustomRecurring control={control} />}
            </Box>
          </Box>
        </Collapse>
      </Box>
    );
  }, [control, t, isShowCustomBlock, frequencyType, setValue]);

  return isContainAccordion ? (
    <MuiDotAccordion label={t('general.containers.credentials')} isDefaultExpand={isDefaultExpand}>
      {renderContent}
    </MuiDotAccordion>
  ) : (
    <>{renderContent}</>
  );
};

export default RecurringFormContainer;

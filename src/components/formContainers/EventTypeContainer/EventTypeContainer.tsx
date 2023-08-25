import React, { FC, memo, useCallback } from 'react';
import { Control, Controller, UseFormSetValue, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';
import MuiSelect from '../../formElements/MuiSelect';
import { EventTypeConfig } from '../../../shared/configs/eventType.config';
import RowWithTitleContainer from '../../containers/RowWithTitleContainer';
import { EventTypeEnum } from '../../../shared/enums/eventType.enum';
import MuiBaseTextFiled from '../../formElements/MuiBaseTextFiled';
import PhysicalAddressContainer from '../PhysicalAddressContainer';
import MuiPhoneNumberTextFiled from '../../formElements/MuiPhoneNumberTextFiled';
import { ReactComponent as InternetIcon } from '../../../assets/Images/internet-icon.svg';
import { ReactComponent as LocationIcon } from '../../../assets/Images/location-icon.svg';
import { ReactComponent as PhoneIcon } from '../../../assets/Images/phone-icon.svg';
import CopyButton from '../../buttons/CopyButton';

type EventTypeContainerProps = {
  control: Control<any>;
  setValue: UseFormSetValue<any>;
};
const eventTypeSection = [
  EventTypeConfig[EventTypeEnum.online],
  EventTypeConfig[EventTypeEnum.in_person],
  EventTypeConfig[EventTypeEnum.call],
];

const getSelectIcon = (selectType?: EventTypeEnum) => {
  switch (selectType) {
    case EventTypeEnum.online: {
      return <InternetIcon />;
    }
    case EventTypeEnum.in_person: {
      return <LocationIcon />;
    }
    case EventTypeEnum.call: {
      return <PhoneIcon />;
    }
    default: {
      return null;
    }
  }
};

const EventTypeContainer: FC<EventTypeContainerProps> = ({ control, setValue }) => {
  const { t } = useTranslation();

  const handleChangeEventType = (value?: { value: string; label: string }) => {
    setValue('type', value);
    setValue('country', '');
    setValue('physicalAddress', undefined);
    setValue('meeting_id', '');
    setValue('site', '');
    setValue('phone', '');
    setValue('password', '');
  };

  const type = useWatch({
    control,
    name: 'type',
  });

  const handleChangePhoneNumber = useCallback(
    (phone?: string, country?: string) => {
      setValue('phone', phone, { shouldValidate: true });
      setValue('country', country);
    },
    [setValue],
  );

  return (
    <RowWithTitleContainer titlePadding="5" alignItems="flexStart" title="Type">
      <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <Box sx={{ maxWidth: '190px', width: '100%', minWidth: '190px' }}>
          <Controller
            name="type"
            control={control}
            render={({ field, fieldState }) => (
              <MuiSelect
                {...field}
                isSearchable
                isClearable
                options={eventTypeSection}
                isRequired
                startIcon={getSelectIcon(type?.value)}
                isError={!!fieldState?.error?.message}
                helpText={fieldState?.error?.message}
                onChange={handleChangeEventType}
                placeholder={t('general.placeholders.select_type')}
              />
            )}
          />
        </Box>
        {type?.value === EventTypeEnum.online && (
          <Box sx={{ mt: '12px', width: '100%' }}>
            <Controller
              name="site"
              control={control}
              render={({ field, fieldState }) => (
                <MuiBaseTextFiled
                  placeholder="https://link..."
                  isError={!!fieldState?.error?.message}
                  errorMessage={fieldState?.error?.message}
                  type="text"
                  endAdornment={field.value ? <CopyButton content="ssss" /> : null}
                  isFullWidth
                  {...field}
                />
              )}
            />
          </Box>
        )}
        {type?.value === EventTypeEnum.in_person && (
          <Box sx={{ mt: '12px', width: '100%' }}>
            <PhysicalAddressContainer
              isShowLabel={false}
              placeholder={t('general.placeholders.enter_location')}
              control={control}
              isContainAccordion={false}
            />
          </Box>
        )}
        {type?.value === EventTypeEnum.call && (
          <Box sx={{ mt: '12px', width: '100%' }}>
            <Controller
              name="phone"
              control={control}
              render={({ field, fieldState }) => (
                <MuiPhoneNumberTextFiled
                  {...field}
                  placeholder={t('general.placeholders.enter_number')}
                  isError={!!fieldState?.error?.message}
                  onChange={handleChangePhoneNumber}
                  errorMessage={fieldState?.error?.message}
                />
              )}
            />
          </Box>
        )}
      </Box>
    </RowWithTitleContainer>
  );
};

export default memo(EventTypeContainer);

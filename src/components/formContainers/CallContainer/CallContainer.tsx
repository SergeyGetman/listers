import React, { FC, memo, useCallback, useMemo } from 'react';
import { Control, Controller, UseFormSetValue } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import MuiDotAccordion from '../../accordions/MuiDotAccordion';
import MuiPhoneNumberTextFiled from '../../formElements/MuiPhoneNumberTextFiled';
type CallContainerProps = {
  control: Control<any>;
  setValue: UseFormSetValue<any>;
  isContainAccordion?: boolean;
  isDefaultExpand?: boolean;
};
const CallContainer: FC<CallContainerProps> = ({
  control,
  isContainAccordion = true,
  setValue,
  isDefaultExpand = false,
}) => {
  const { t } = useTranslation();

  const handleChangePhoneNumber = useCallback(
    (phone: string | 'undefined', country: string | undefined) => {
      setValue('phone', phone, { shouldValidate: true });
      setValue('country', country);
    },
    [setValue],
  );

  const renderContent = useMemo(() => {
    return (
      <Controller
        name="phone"
        control={control}
        render={({ field, fieldState }) => (
          <MuiPhoneNumberTextFiled
            {...field}
            label={t('general.fieldNames.phone')}
            placeholder={t('general.placeholders.enter_number')}
            isError={!!fieldState?.error?.message}
            onChange={(phone: string | 'undefined', country: string | undefined) =>
              handleChangePhoneNumber(phone, country)
            }
            errorMessage={fieldState?.error?.message}
          />
        )}
      />
    );
  }, [t, control, handleChangePhoneNumber]);

  return isContainAccordion ? (
    <MuiDotAccordion label={t('general.containers.call')} isDefaultExpand={isDefaultExpand}>
      {renderContent}
    </MuiDotAccordion>
  ) : (
    <>{renderContent}</>
  );
};

export default memo(CallContainer);

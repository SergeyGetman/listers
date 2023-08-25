import React, { FC, memo, useMemo } from 'react';
import { Control, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import LocationEdit from '../../locations/LocationEdit';
import MuiDotAccordion from '../../accordions/MuiDotAccordion';

type PhysicalAddressContainerProps = {
  control: Control<any>;
  isContainAccordion?: boolean;
  isDefaultExpand?: boolean;
  isShowCheckbox?: boolean;
  checkboxLabel?: string;
  checkboxName?: string;
  label?: string;
  placeholder?: string;
  locationFiledName?: string;
  isShowLabel?: boolean;
};
const PhysicalAddressContainer: FC<PhysicalAddressContainerProps> = ({
  control,
  isContainAccordion = true,
  isDefaultExpand = false,
  isShowCheckbox,
  checkboxLabel,
  checkboxName,
  label,
  placeholder,
  locationFiledName,
  isShowLabel = true,
}) => {
  const { t } = useTranslation();

  const renderContent = useMemo(() => {
    return (
      <Controller
        name={locationFiledName ? locationFiledName : 'physicalAddress'}
        control={control}
        render={({ field }) => (
          <LocationEdit
            {...field}
            label={isShowLabel ? t('general.fieldNames.location') : ''}
            placeholder={placeholder ? placeholder : t('general.placeholders.enter_location')}
          />
        )}
      />
    );
  }, [locationFiledName, control, isShowLabel, t, placeholder]);

  return isContainAccordion ? (
    <MuiDotAccordion
      control={control}
      isShowCheckbox={isShowCheckbox}
      checkboxName={checkboxName}
      checkboxLabel={checkboxLabel}
      label={label ? label : t('general.containers.physicalAddress')}
      isDefaultExpand={isDefaultExpand}
    >
      {renderContent}
    </MuiDotAccordion>
  ) : (
    <>{renderContent}</>
  );
};

export default memo(PhysicalAddressContainer);

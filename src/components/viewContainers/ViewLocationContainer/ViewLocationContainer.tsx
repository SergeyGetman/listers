import React, { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import MuiDotAccordion from '../../accordions/MuiDotAccordion';
import LocationView from '../../locations/LocationView';

type ViewLocationContainerProps = {
  location: { address: string; map: { lat: number; lng: number } };
  isDefaultExpand?: boolean;
  isDisabledExpand?: boolean;
  label?: string;
  subLabel?: string;
};
// TODO storybook

const ViewLocationContainer: FC<ViewLocationContainerProps> = ({
  isDefaultExpand = true,
  subLabel,
  isDisabledExpand = false,
  location,
  label,
}) => {
  const { t } = useTranslation();

  return (
    <MuiDotAccordion
      label={label ? label : t('general.containers.physicalAddress')}
      isDefaultExpand={isDefaultExpand}
      subLabel={subLabel}
      isDisabledExpand={isDisabledExpand}
    >
      <LocationView location={location?.map} address={location.address} />
    </MuiDotAccordion>
  );
};

export default memo(ViewLocationContainer);

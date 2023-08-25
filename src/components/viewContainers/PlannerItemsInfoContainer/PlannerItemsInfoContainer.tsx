import React, { FC } from 'react';
import { Box } from '@mui/material';
import parse from 'html-react-parser';
import { useTranslation } from 'react-i18next';
import { PlannerItemModelTypeEnum } from '../../../shared/enums/plannerItemModelType.enum';
import MuiBaseInputView from '../../formElements/MuiBaseInputView';

type PlannerItemsInfoContainerProps = {
  modelType: PlannerItemModelTypeEnum;
  site?: string;
  address?: string;
  phone?: string;
  location?: google.maps.LatLng | google.maps.LatLngLiteral;
  description?: string;
};
// TODO storybook

const PlannerItemsInfoContainer: FC<PlannerItemsInfoContainerProps> = ({
  modelType,
  site,
  location,
  address,
  phone,
  description,
}) => {
  const { t } = useTranslation();

  return (
    <Box>
      {modelType !== PlannerItemModelTypeEnum.event ? (
        <>
          {site ? (
            <MuiBaseInputView content={site || 'N/A'} label={t('general.fieldNames.credentials')} />
          ) : address && location?.lat ? (
            <MuiBaseInputView
              content={
                <a
                  target="blank"
                  onClick={(e) => e.stopPropagation()}
                  href={`http://maps.google.com/maps?q=loc:${location?.lat},${location?.lng}`}
                >
                  {address}
                </a>
              }
              label={t('general.fieldNames.location')}
            />
          ) : phone ? (
            <MuiBaseInputView
              content={<a href={`tel:${phone}`}>{phone}</a>}
              label={t('general.fieldNames.phone')}
            />
          ) : (
            <MuiBaseInputView
              content={description ? parse(description) : 'N/A'}
              label={t('general.fieldNames.description')}
            />
          )}
        </>
      ) : (
        <>
          {description ? (
            <MuiBaseInputView
              content={description ? parse(description) : 'N/A'}
              label={t('general.fieldNames.description')}
            />
          ) : address && location?.lat ? (
            <MuiBaseInputView
              content={
                <a
                  target="blank"
                  onClick={(e) => e.stopPropagation()}
                  href={`http://maps.google.com/maps?q=loc:${location?.lat},${location?.lng}`}
                >
                  {address}
                </a>
              }
              label={t('general.fieldNames.location')}
            />
          ) : phone ? (
            <MuiBaseInputView
              content={<a href={`tel:${phone}`}>{phone}</a>}
              label={t('general.fieldNames.phone')}
            />
          ) : site ? (
            <MuiBaseInputView content={site || 'N/A'} label={t('general.fieldNames.credentials')} />
          ) : (
            <MuiBaseInputView
              content={description ? parse(description) : 'N/A'}
              label={t('general.fieldNames.description')}
            />
          )}
        </>
      )}
    </Box>
  );
};

export default PlannerItemsInfoContainer;

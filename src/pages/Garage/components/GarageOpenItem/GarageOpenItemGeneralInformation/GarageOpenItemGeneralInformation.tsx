import React, { FC, useMemo } from 'react';
import { Box, Grid, useMediaQuery, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import MuiBaseAccordion from '../../../../../components/accordions/MuiBaseAccordion';
import MuiBaseInputView from '../../../../../components/formElements/MuiBaseInputView';
import MuiDotAccordion from '../../../../../components/accordions/MuiDotAccordion';
import FileView from '../../../../../components/FilePreView';

import { ActionMenuListModel } from '../../../../../shared/models/actionMenuList.model';
import { TransportItemModel } from '../../../../../shared/models/garage.model';
import { getSelectOptionValue } from '../../../../../shared/utils/generateSelectOptions';
import ViewDescriptionContainer from '../../../../../components/viewContainers/ViewDescriptionContainer';
import MuiBaseMobileAccordion from '../../../../../components/accordions/MuiBaseMobileAccordion';

type Props = {
  menu: ActionMenuListModel;
  data: TransportItemModel;
  isShowMenu: boolean;
};

const GarageOpenItemGeneralInformation: FC<Props> = ({ menu, data, isShowMenu }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobileDisplay = useMediaQuery(theme.breakpoints.down('sm'));

  const renderContent = useMemo(
    () => (
      <>
        <Grid container rowSpacing="16px" columnSpacing="20px">
          <Grid xs={6} item>
            <MuiBaseInputView
              content={getSelectOptionValue(data.transport_type, 'garage.transportType')}
              label={t('general.fieldNames.transportType')}
            />
          </Grid>
          <Grid xs={6} item>
            <MuiBaseInputView content={data.year} label={t('general.fieldNames.year')} />
          </Grid>
          <Grid xs={6} item>
            <MuiBaseInputView content={data.make} label={t('general.fieldNames.make')} />
          </Grid>
          <Grid xs={6} item>
            <MuiBaseInputView content={data.model} label={t('general.fieldNames.model')} />
          </Grid>

          {data.style && (
            <Grid xs={6} item>
              <MuiBaseInputView
                content={getSelectOptionValue(data.style, 'garage.styleType')}
                label={t('general.fieldNames.style')}
              />
            </Grid>
          )}

          {data.body && (
            <Grid xs={6} item>
              <MuiBaseInputView
                content={getSelectOptionValue(data.body, 'garage.bodyType')}
                label={t('general.fieldNames.bodyStyle')}
              />
            </Grid>
          )}
          {data.trim && (
            <Grid xs={6} item>
              <MuiBaseInputView
                content={getSelectOptionValue(data.trim, 'garage.trimType')}
                label={t('general.fieldNames.trim')}
              />
            </Grid>
          )}
          {data.exterior_color && (
            <Grid xs={6} item>
              <MuiBaseInputView
                content={getSelectOptionValue(data.exterior_color, 'garage.colorType')}
                label={t('general.fieldNames.exteriorColor')}
              />
            </Grid>
          )}
          {data.interior_color && (
            <Grid xs={6} item>
              <MuiBaseInputView
                content={getSelectOptionValue(data.interior_color, 'garage.colorType')}
                label={t('general.fieldNames.interiorColor')}
              />
            </Grid>
          )}
          {data.fuel_type && (
            <Grid xs={6} item>
              <MuiBaseInputView
                content={getSelectOptionValue(data.fuel_type, 'garage.fuelType')}
                label={t('general.fieldNames.fuelType')}
              />
            </Grid>
          )}
          {data.hybrid_type && (
            <Grid xs={6} item>
              <MuiBaseInputView
                content={getSelectOptionValue(data.hybrid_type, 'garage.hybridType')}
                label={t('general.fieldNames.fuelType')}
              />
            </Grid>
          )}
          {data.engine_type && (
            <Grid xs={6} item>
              <MuiBaseInputView content={data.engine_type} label={t('general.fieldNames.engineType')} />
            </Grid>
          )}
          {data.transmission && (
            <Grid xs={6} item>
              <MuiBaseInputView
                content={getSelectOptionValue(data.transmission, 'garage.transmissionType')}
                label={t('general.fieldNames.transmission')}
              />
            </Grid>
          )}
          {data.mileage && (
            <Grid xs={6} item>
              <MuiBaseInputView content={data.mileage} label={t('general.fieldNames.mileage')} />
            </Grid>
          )}
          {data.drivetrain && (
            <Grid xs={6} item>
              <MuiBaseInputView content={data.drivetrain} label={t('general.fieldNames.drivetrain')} />
            </Grid>
          )}
          {data.country_of_assembly && (
            <Grid xs={6} item>
              <MuiBaseInputView
                content={data.country_of_assembly}
                label={t('general.fieldNames.countryOfAssembly')}
              />
            </Grid>
          )}
          {data.vin && (
            <Grid xs={6} item>
              <MuiBaseInputView content={data.vin} label={t('general.fieldNames.vinNumber')} />
            </Grid>
          )}
        </Grid>

        {(data.state_on_license_plate || data.license_plate) && (
          <Box sx={{ mt: '20px' }}>
            <MuiDotAccordion label={t('general.containers.licensePlate')} isDisabledExpand>
              <Grid container rowSpacing="16px" columnSpacing="20px">
                {data.state_on_license_plate && (
                  <Grid xs={6} item>
                    <MuiBaseInputView
                      content={data.state_on_license_plate}
                      label={t('general.fieldNames.state')}
                    />
                  </Grid>
                )}
                {data.license_plate && (
                  <Grid xs={6} item>
                    <MuiBaseInputView content={data.license_plate} label={t('general.fieldNames.number')} />
                  </Grid>
                )}
              </Grid>
            </MuiDotAccordion>
          </Box>
        )}

        {data.description && (
          <Box sx={{ mt: '20px' }}>
            <ViewDescriptionContainer description={data.description} />
          </Box>
        )}

        {data.documents.length > 0 && (
          <Box sx={{ mt: '20px' }}>
            <MuiDotAccordion label={t('general.containers.documents')} isDisabledExpand>
              <Grid container rowSpacing="16px" columnSpacing="20px">
                <Grid xs={12} sm={12} item>
                  <FileView files={data.documents} />
                </Grid>
              </Grid>
            </MuiDotAccordion>
          </Box>
        )}
      </>
    ),
    [
      data.body,
      data.country_of_assembly,
      data.description,
      data.documents,
      data.drivetrain,
      data.engine_type,
      data.exterior_color,
      data.fuel_type,
      data.hybrid_type,
      data.interior_color,
      data.license_plate,
      data.make,
      data.mileage,
      data.model,
      data.state_on_license_plate,
      data.style,
      data.transmission,
      data.transport_type,
      data.trim,
      data.vin,
      data.year,
      t,
    ],
  );

  return isMobileDisplay ? (
    <MuiBaseMobileAccordion
      menuList={menu}
      isEdit={isShowMenu}
      isDefaultExpand
      title={t('general.containers.generalInformation')}
      subtitleText={`${getSelectOptionValue(data.transport_type, 'garage.transportType')}, ${data.make}, ${
        data.model
      }, ${data.year}`}
    >
      <Box sx={{ padding: '0 10px 16px 10px' }}> {renderContent}</Box>
    </MuiBaseMobileAccordion>
  ) : (
    <MuiBaseAccordion
      menuList={menu}
      isShowMenu={isShowMenu}
      withHover
      label={t('general.containers.generalInformation')}
      isShowInfoDialog={false}
      isDisabledExpand={false}
    >
      {renderContent}
    </MuiBaseAccordion>
  );
};
export default GarageOpenItemGeneralInformation;

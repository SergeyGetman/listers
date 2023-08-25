import React, { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Grid, useMediaQuery, useTheme } from '@mui/material';
import moment from 'moment';
import MuiBaseAccordion from '../../../../../components/accordions/MuiBaseAccordion';
import PayDateInputView from '../../../../../components/formElements/PayDateInputView';
import MuiDotAccordion from '../../../../../components/accordions/MuiDotAccordion';
import FileView from '../../../../../components/FilePreView';
import MuiBaseInputView from '../../../../../components/formElements/MuiBaseInputView';
import LocationView from '../../../../../components/locations/LocationView';

import { ActionMenuListModel } from '../../../../../shared/models/actionMenuList.model';
import { TransportLicenseModel } from '../../../../../shared/models/garage.model';
import MuiBaseMobileAccordion from '../../../../../components/accordions/MuiBaseMobileAccordion';

type Props = {
  menu: ActionMenuListModel;
  data: TransportLicenseModel;
  isShowMenu: boolean;
};

const GarageOpenItemLicencePlateSticker: FC<Props> = ({ menu, data, isShowMenu }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobileDisplay = useMediaQuery(theme.breakpoints.down('sm'));

  const renderContent = useMemo(
    () => (
      <Grid container rowSpacing="16px" columnSpacing="20px">
        <Grid xs={6} sm={6} item>
          <PayDateInputView
            label={t('general.fieldNames.purchaseDate')}
            date={moment(data.purchase_date).format('MM/DD/YYYY')}
          />
        </Grid>

        <Grid xs={6} sm={6} item>
          <PayDateInputView
            label={t('general.fieldNames.expirationDate')}
            date={moment(data.expiration.date).format('MM/DD/YYYY')}
          />
        </Grid>

        {(data?.registration_id || data.pin_code) && (
          <Grid xs={12} sm={12} item>
            <MuiDotAccordion label={t('general.containers.main')} isDisabledExpand>
              <Grid container rowSpacing="16px" columnSpacing="20px">
                {data?.registration_id && (
                  <Grid xs={6} item>
                    <MuiBaseInputView
                      content={data?.registration_id}
                      label={t('general.fieldNames.registrationID')}
                    />
                  </Grid>
                )}

                {data.pin_code && (
                  <Grid xs={6} item>
                    <MuiBaseInputView
                      content={data.pin_code}
                      isPassword
                      label={t('general.fieldNames.pINCode')}
                      isShowCopyBtn
                    />
                  </Grid>
                )}
              </Grid>
            </MuiDotAccordion>
          </Grid>
        )}
        {(data.renewal_fee !== null ||
          data.late_fee !== null ||
          data.administrative_fee !== null ||
          data.total_amount) && (
          <Grid xs={12} sm={12} item>
            <MuiDotAccordion label={t('general.containers.fee')} isDisabledExpand>
              <Grid container rowSpacing="16px" columnSpacing="20px">
                {data.renewal_fee !== null && (
                  <Grid xs={6} item>
                    <MuiBaseInputView
                      content={`$ ${data.renewal_fee / 100}`}
                      label={t('general.fieldNames.renewalFee')}
                    />
                  </Grid>
                )}
                {data.late_fee !== null && (
                  <Grid xs={6} item>
                    <MuiBaseInputView
                      content={`$ ${data.late_fee / 100}`}
                      label={t('general.fieldNames.lateFee')}
                    />
                  </Grid>
                )}
                {data.administrative_fee !== null && (
                  <Grid xs={6} item>
                    <MuiBaseInputView
                      content={`$ ${data.administrative_fee / 100}`}
                      label={t('general.fieldNames.administrativeFee')}
                    />
                  </Grid>
                )}

                {data.total_amount !== null && (
                  <Grid xs={6} item>
                    <MuiBaseInputView
                      content={`$ ${data.total_amount / 100}`}
                      label={t('general.fieldNames.total')}
                    />
                  </Grid>
                )}
              </Grid>
            </MuiDotAccordion>
          </Grid>
        )}

        {(data.renew || data.login || data.password) && (
          <Grid xs={12} sm={12} item>
            <MuiDotAccordion label={t('general.containers.renewOnline')} isDisabledExpand>
              <Grid container rowSpacing="16px" columnSpacing="20px">
                {data.renew && (
                  <Grid xs={12} sm={12} item>
                    <MuiBaseInputView
                      content={data.renew}
                      label={t('general.fieldNames.website')}
                      isShowCopyBtn
                    />
                  </Grid>
                )}

                {data.login && (
                  <Grid xs={6} item>
                    <MuiBaseInputView
                      content={data.login}
                      label={t('general.fieldNames.login')}
                      isShowCopyBtn
                    />
                  </Grid>
                )}

                {data.password && (
                  <Grid xs={6} item>
                    <MuiBaseInputView
                      content={data.password}
                      label={t('general.fieldNames.password')}
                      isShowCopyBtn
                      isPassword
                    />
                  </Grid>
                )}
              </Grid>
            </MuiDotAccordion>
          </Grid>
        )}

        {(data.name || data.state || data.county || data.address.address) && (
          <Grid xs={12} sm={12} item>
            <MuiDotAccordion label={t('general.containers.resident')} isDisabledExpand>
              <Grid container rowSpacing="16px" columnSpacing="20px">
                {data.name && (
                  <Grid xs={6} item>
                    <MuiBaseInputView content={data.name} label={t('general.fieldNames.name')} />
                  </Grid>
                )}

                {data.state && (
                  <Grid xs={6} item>
                    <MuiBaseInputView content={data.state} label={t('general.fieldNames.state')} />
                  </Grid>
                )}

                {data.county && (
                  <Grid xs={6} item>
                    <MuiBaseInputView content={data.county} label={t('general.fieldNames.county')} />
                  </Grid>
                )}

                {data.address.address && data.address.map && (
                  <Grid xs={12} sm={12} item>
                    <LocationView
                      address={data.address.address}
                      location={data.address.map as { lat: number; lng: number }}
                    />
                  </Grid>
                )}
              </Grid>
            </MuiDotAccordion>
          </Grid>
        )}
        {data.documents.length > 0 && (
          <Grid xs={12} sm={12} item>
            <MuiDotAccordion label={t('general.containers.documents')} isDisabledExpand>
              <Grid container rowSpacing="16px" columnSpacing="20px">
                <Grid xs={12} sm={12} item>
                  <FileView files={data.documents} />
                </Grid>
              </Grid>
            </MuiDotAccordion>
          </Grid>
        )}
      </Grid>
    ),
    [
      data.address.address,
      data.address.map,
      data.administrative_fee,
      data.county,
      data.documents,
      data.expiration.date,
      data.late_fee,
      data.login,
      data.name,
      data.password,
      data.pin_code,
      data.purchase_date,
      data?.registration_id,
      data.renew,
      data.renewal_fee,
      data.state,
      data.total_amount,
      t,
    ],
  );

  return isMobileDisplay ? (
    <MuiBaseMobileAccordion
      menuList={menu}
      isEdit={isShowMenu}
      titleWhiteSpace="normal"
      rightChildren={
        <Box sx={{ maxWidth: '120px', minWidth: '100px', mr: '5px', width: '100%' }}>
          <PayDateInputView
            label={t('general.fieldNames.expirationDate')}
            date={moment(data.expiration.date).format('MM/DD/YY')}
          />
        </Box>
      }
      title={t('general.containers.lPRegistration')}
      subtitleText={`${data.registration_id || ''}`}
    >
      <Box sx={{ padding: '0 10px 16px 10px' }}> {renderContent}</Box>
    </MuiBaseMobileAccordion>
  ) : (
    <MuiBaseAccordion
      menuList={menu}
      withHover
      isShowMenu={isShowMenu}
      isShowInfoDialog={false}
      isDisabledExpand={false}
      label={t('general.containers.licencePlateSticker')}
    >
      {renderContent}
    </MuiBaseAccordion>
  );
};

export default GarageOpenItemLicencePlateSticker;

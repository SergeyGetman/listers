import React, { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Grid, useMediaQuery, useTheme } from '@mui/material';
import moment from 'moment';
import MuiBaseAccordion from '../../../../../components/accordions/MuiBaseAccordion';
import PayDateInputView from '../../../../../components/formElements/PayDateInputView';
import MuiDotAccordion from '../../../../../components/accordions/MuiDotAccordion';
import MuiBaseInputView from '../../../../../components/formElements/MuiBaseInputView';
import LocationView from '../../../../../components/locations/LocationView';
import FileView from '../../../../../components/FilePreView';
import { ActionMenuListModel } from '../../../../../shared/models/actionMenuList.model';
import { TransportStickerModel } from '../../../../../shared/models/garage.model';
import { getSelectOptionValue } from '../../../../../shared/utils/generateSelectOptions';
import { YesNoEnum } from '../../../../../shared/enums/gender.enum';
import MuiBaseMobileAccordion from '../../../../../components/accordions/MuiBaseMobileAccordion';

type Props = {
  menu: ActionMenuListModel;
  data: TransportStickerModel;
  isShowMenu: boolean;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const GarageOpenItemVehicleSticker: FC<Props> = ({ data, menu, isShowMenu }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobileDisplay = useMediaQuery(theme.breakpoints.down('sm'));

  const renderContent = useMemo(
    () => (
      <Grid container rowSpacing="16px" columnSpacing="20px">
        <Grid xs={6} item>
          <PayDateInputView
            label={t('general.fieldNames.purchaseDate')}
            date={moment(data.purchase_date).format('MM/DD/YYYY')}
          />
        </Grid>

        <Grid xs={6} item>
          <PayDateInputView
            label={t('general.fieldNames.expirationDate')}
            date={moment(data.expiration.date).format('MM/DD/YYYY')}
          />
        </Grid>

        {(data.reference || data.number || data.type) && (
          <Grid xs={12} sm={12} item>
            <MuiDotAccordion label={t('general.containers.main')} isDisabledExpand>
              <Grid container rowSpacing="16px" columnSpacing="20px">
                {data.reference && (
                  <Grid xs={6} item>
                    <MuiBaseInputView content={data.reference} label={t('general.fieldNames.reference')} />
                  </Grid>
                )}

                {data.number && (
                  <Grid xs={6} item>
                    <MuiBaseInputView
                      content={data.number}
                      label={t('general.fieldNames.number')}
                      isShowCopyBtn
                    />
                  </Grid>
                )}

                {data.type && (
                  <Grid xs={6} item>
                    <MuiBaseInputView
                      content={getSelectOptionValue(data.type, 'garage.stickerType')}
                      label={t('general.fieldNames.type')}
                    />
                  </Grid>
                )}
              </Grid>
            </MuiDotAccordion>
          </Grid>
        )}

        {(data.zone || data.zone_number) && (
          <Grid xs={12} sm={12} item>
            <MuiDotAccordion label={t('general.containers.zone')} isDisabledExpand>
              <Grid container rowSpacing="16px" columnSpacing="20px">
                <Grid xs={6} item>
                  <MuiBaseInputView
                    content={data.zone ? YesNoEnum.yes : YesNoEnum.no}
                    label={t('general.fieldNames.zone')}
                  />
                </Grid>
                <Grid xs={6} item>
                  <MuiBaseInputView content={data.zone_number} label={t('general.fieldNames.zoneNumber')} />
                </Grid>
              </Grid>
            </MuiDotAccordion>
          </Grid>
        )}
        {(data.sticker_fee !== null ||
          data.late_fee !== null ||
          data.administrative_fee !== null ||
          data.total_amount !== null ||
          data.zone_fee !== null) && (
          <Grid xs={12} sm={12} item>
            <MuiDotAccordion label={t('general.containers.fee')} isDisabledExpand>
              <Grid container rowSpacing="16px" columnSpacing="20px">
                {data.sticker_fee !== null && (
                  <Grid xs={6} item>
                    <MuiBaseInputView
                      content={`$ ${data.sticker_fee / 100}`}
                      label={t('general.fieldNames.stickerFee')}
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
                {data.zone_fee !== null && (
                  <Grid xs={6} item>
                    <MuiBaseInputView
                      content={`$ ${data.zone_fee / 100}`}
                      label={t('general.fieldNames.zoneFee')}
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

        {(data.name || (data.address !== null && data.address.address)) && (
          <Grid xs={12} sm={12} item>
            <MuiDotAccordion label={t('general.containers.resident')} isDisabledExpand>
              <Grid container rowSpacing="16px" columnSpacing="20px">
                {data.name && (
                  <Grid xs={6} item>
                    <MuiBaseInputView content="test" label={t('general.fieldNames.name')} />
                  </Grid>
                )}
                {data.address !== null && data.address.address && data.address.map && (
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
      data.address,
      data.administrative_fee,
      data.documents,
      data.expiration.date,
      data.late_fee,
      data.login,
      data.name,
      data.number,
      data.password,
      data.purchase_date,
      data.reference,
      data.renew,
      data.sticker_fee,
      data.total_amount,
      data.type,
      data.zone,
      data.zone_fee,
      data.zone_number,
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
      title={t('general.containers.vehicleSticker')}
      subtitleText={`${data.reference || ''}`}
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
      label={t('general.containers.vehicleSticker')}
    >
      {renderContent}
    </MuiBaseAccordion>
  );
};

export default GarageOpenItemVehicleSticker;

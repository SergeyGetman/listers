import React, { FC } from 'react';
import { Box, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Controller } from 'react-hook-form';
import { Control, UseFormWatch } from 'react-hook-form/dist/types/form';
import moment from 'moment';
import MuiDotAccordion from '../../../../../../accordions/MuiDotAccordion';
import MuiBaseTextFiled from '../../../../../../formElements/MuiBaseTextFiled';
import MuiDatePicker from '../../../../../../formElements/MuiDatePicker';
import { FormStickerLicenseValues } from '../../LicencePlateStickerContainer';
import MuiCheckbox from '../../../../../../formElements/MuiCheckbox';

type Props = {
  onClose?: () => void;
  control: Control<any>;
  watch: UseFormWatch<FormStickerLicenseValues>;
  handleChangePurchaseDate: () => void;
};

const LicencePlateStickerMainBlock: FC<Props> = ({ control, watch, handleChangePurchaseDate }) => {
  const { t } = useTranslation();

  return (
    <MuiDotAccordion
      isShowInfoDialog
      infoTooltipText={t('garage.tooltips.mainBlock')}
      label={t('general.containers.main')}
      isDisabledExpand
    >
      <Grid container rowSpacing="16px" columnSpacing="20px">
        <Grid xs={6} sm={6} item>
          <Controller
            name="purchase_date"
            control={control}
            render={({ field, fieldState }) => (
              <MuiDatePicker
                {...field}
                isFullWidth={false}
                isRequired
                onChange={(el: any) => {
                  field.onChange(el);
                  handleChangePurchaseDate();
                }}
                label={t('general.fieldNames.purchaseDate')}
                placeholder={t('general.placeholders.select_date')}
                isError={!!fieldState?.error?.message}
                errorMessage={fieldState?.error?.message}
              />
            )}
          />
        </Grid>
        <Grid xs={6} sm={6} item />
        <Grid xs={6} sm={6} item>
          <Controller
            name="expiration.date"
            control={control}
            render={({ field, fieldState }) => (
              <MuiDatePicker
                {...field}
                isFullWidth={false}
                isRequired
                label={t('general.fieldNames.expirationDate')}
                placeholder={t('general.placeholders.select_date')}
                isError={!!fieldState?.error?.message}
                errorMessage={fieldState?.error?.message}
                showMonthYearPicker
                dateFormat="MM/yyyy"
                placeholderText="MM/YY"
                minDate={
                  !!watch('purchase_date')
                    ? moment(watch('purchase_date')).startOf('month').toDate() <
                      moment().startOf('month').toDate()
                      ? moment().toDate()
                      : moment(watch('purchase_date')).format('D')
                      ? moment(watch('purchase_date')).startOf('month').toDate()
                      : moment(watch('purchase_date')).startOf('month').add(1, 'M').toDate()
                    : moment().startOf('month').toDate()
                }
              />
            )}
          />
        </Grid>
        <Grid xs={6} sm={6} item>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', height: '100%', mt: '30px' }}>
            <Controller
              name="expiration.is_notify"
              control={control}
              render={({ field }) => <MuiCheckbox {...field} label={t('general.fieldNames.notifyMe')} />}
            />
          </Box>
        </Grid>
        <Grid xs={12} sm={6} item>
          <Controller
            name="registration_id"
            control={control}
            render={({ field, fieldState }) => (
              <MuiBaseTextFiled
                {...field}
                label={t('general.fieldNames.registrationID')}
                placeholder={t('general.placeholders.enter_id')}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  field.onChange(event.target.value.toUpperCase())
                }
                isError={!!fieldState?.error?.message}
                errorMessage={fieldState?.error?.message}
                type="text"
              />
            )}
          />
        </Grid>
        <Grid xs={12} sm={6} item>
          <Controller
            name="pin_code"
            control={control}
            render={({ field, fieldState }) => (
              <MuiBaseTextFiled
                label={t('general.fieldNames.pin')}
                placeholder={t('general.placeholders.enter_pin')}
                isError={!!fieldState?.error?.message}
                errorMessage={fieldState?.error?.message}
                type="password"
                {...field}
              />
            )}
          />
        </Grid>
      </Grid>
    </MuiDotAccordion>
  );
};

export default LicencePlateStickerMainBlock;

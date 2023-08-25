import React, { FC } from 'react';
import { Box, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Controller } from 'react-hook-form';
import { Control, UseFormWatch } from 'react-hook-form/dist/types/form';
import moment from 'moment';
import MuiDotAccordion from '../../../../../../accordions/MuiDotAccordion';
import MuiBaseTextFiled from '../../../../../../formElements/MuiBaseTextFiled';
import MuiDatePicker from '../../../../../../formElements/MuiDatePicker';
import MuiSelect from '../../../../../../formElements/MuiSelect';
import { FormStickerType } from '../../VehicleStickerContainer';
import { StickerTypeEnum } from '../../../../../../../shared/enums/garage.enums';
import { generateSelectOptions } from '../../../../../../../shared/utils/generateSelectOptions';
import MuiCheckbox from '../../../../../../formElements/MuiCheckbox';

type Props = {
  onClose?: () => void;
  control: Control<FormStickerType, any>;
  watch: UseFormWatch<FormStickerType>;
  handleChangePurchaseDate: () => void;
};

const VehicleStickerMainBlock: FC<Props> = ({ control, watch, handleChangePurchaseDate }) => {
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
            name="reference"
            control={control}
            render={({ field, fieldState }) => (
              <MuiBaseTextFiled
                {...field}
                label={t('general.fieldNames.reference')}
                placeholder={t('general.placeholders.enter_reference')}
                isError={!!fieldState?.error?.message}
                errorMessage={fieldState?.error?.message}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  field.onChange(event.target.value.toUpperCase())
                }
                type="text"
              />
            )}
          />
        </Grid>
        <Grid xs={12} sm={6} item>
          <Controller
            name="number"
            control={control}
            render={({ field, fieldState }) => (
              <MuiBaseTextFiled
                {...field}
                label={t('general.fieldNames.number')}
                placeholder={t('general.placeholders.enter_number')}
                isError={!!fieldState?.error?.message}
                errorMessage={fieldState?.error?.message}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  field.onChange(event.target.value.toUpperCase())
                }
                type="text"
              />
            )}
          />
        </Grid>
        <Grid xs={12} sm={6} item>
          <Controller
            name="type"
            control={control}
            render={({ field, fieldState }) => (
              <MuiSelect
                {...field}
                isClearable
                options={generateSelectOptions(Object.values(StickerTypeEnum), 'garage.stickerType')}
                label={t('general.fieldNames.type')}
                placeholder={t('general.placeholders.select_type')}
                isError={!!fieldState?.error?.message}
                helpText={fieldState?.error?.message}
              />
            )}
          />
        </Grid>
      </Grid>
    </MuiDotAccordion>
  );
};

export default VehicleStickerMainBlock;

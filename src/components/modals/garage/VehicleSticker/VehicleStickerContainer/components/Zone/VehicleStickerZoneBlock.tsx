import React, { FC } from 'react';
import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Controller } from 'react-hook-form';
import { Control, UseFormWatch } from 'react-hook-form/dist/types/form';
import MuiDotAccordion from '../../../../../../accordions/MuiDotAccordion';
import MuiBaseTextFiled from '../../../../../../formElements/MuiBaseTextFiled';
import MuiSelect from '../../../../../../formElements/MuiSelect';
import { YesNoEnum } from '../../../../../../../shared/enums/gender.enum';
import { generateSelectOptions } from '../../../../../../../shared/utils/generateSelectOptions';
import { FormStickerType } from '../../VehicleStickerContainer';

type Props = {
  onClose?: () => void;
  control: Control<FormStickerType, any>;
  watch: UseFormWatch<FormStickerType>;
};

const VehicleStickerZoneBlock: FC<Props> = ({ control, watch }) => {
  const { t } = useTranslation();

  return (
    <MuiDotAccordion label={t('general.containers.zone')} isDisabledExpand>
      <Grid container rowSpacing="16px" columnSpacing="20px">
        <Grid xs={6} sm={6} item>
          <Controller
            name="zone"
            control={control}
            render={({ field, fieldState }) => (
              <MuiSelect
                {...field}
                options={generateSelectOptions(Object.values(YesNoEnum), 'general.buttons')}
                label={t('general.fieldNames.zone')}
                isError={!!fieldState?.error?.message}
                helpText={fieldState?.error?.message}
              />
            )}
          />
        </Grid>
        {watch('zone') !== null && watch('zone')?.value === YesNoEnum.yes && (
          <Grid xs={6} sm={6} item>
            <Controller
              name="zone_number"
              control={control}
              render={({ field, fieldState }) => (
                <MuiBaseTextFiled
                  type="number"
                  label={`${t('general.fieldNames.zoneNumber')}`}
                  placeholder={t('general.placeholders.enter_number')}
                  isError={!!fieldState?.error?.message}
                  errorMessage={fieldState?.error?.message}
                  {...field}
                />
              )}
            />
          </Grid>
        )}
      </Grid>
    </MuiDotAccordion>
  );
};

export default VehicleStickerZoneBlock;

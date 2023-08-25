import React, { FC } from 'react';
import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Controller } from 'react-hook-form';
import { Control } from 'react-hook-form/dist/types/form';
import MuiDotAccordion from '../../../../accordions/MuiDotAccordion';
import MuiBaseTextFiled from '../../../../formElements/MuiBaseTextFiled';

type Props = {
  onClose?: () => void;
  control: Control<any>;
  isDisabledExpand?: boolean;
  isDefaultExpand?: boolean;
};

const StickerRenewOnlineBlock: FC<Props> = ({ control, isDisabledExpand = true, isDefaultExpand = true }) => {
  const { t } = useTranslation();

  return (
    <MuiDotAccordion
      isShowInfoDialog
      infoTooltipText={t('garage.tooltips.renewOnlineBlock')}
      label={t('general.containers.renewOnline')}
      isDisabledExpand={isDisabledExpand}
      isDefaultExpand={isDefaultExpand}
    >
      <Grid container rowSpacing="16px" columnSpacing="20px">
        <Grid xs={12} sm={24} item>
          <Controller
            name="renew"
            control={control}
            render={({ field, fieldState }) => (
              <MuiBaseTextFiled
                label={t('general.fieldNames.website')}
                placeholder={t('general.placeholders.enter_website')}
                isError={!!fieldState?.error?.message}
                errorMessage={fieldState?.error?.message}
                type="text"
                {...field}
              />
            )}
          />
        </Grid>
        <Grid xs={12} sm={6} item>
          <Controller
            name="login"
            control={control}
            render={({ field, fieldState }) => (
              <MuiBaseTextFiled
                {...field}
                label={t('general.fieldNames.login')}
                placeholder={t('general.placeholders.enter_login')}
                isError={!!fieldState?.error?.message}
                errorMessage={fieldState?.error?.message}
                type="text"
              />
            )}
          />
        </Grid>
        <Grid xs={12} sm={6} item>
          <Controller
            name="password"
            control={control}
            render={({ field, fieldState }) => (
              <MuiBaseTextFiled
                label={t('general.fieldNames.password')}
                placeholder={t('general.placeholders.enter_password')}
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

export default StickerRenewOnlineBlock;

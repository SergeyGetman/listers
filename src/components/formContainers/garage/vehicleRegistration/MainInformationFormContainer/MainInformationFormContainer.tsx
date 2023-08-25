import React, { FC } from 'react';
import { Control, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Grid } from '@mui/material';
import MuiBaseTextFiled from '../../../../formElements/MuiBaseTextFiled';
import BaseContainer from '../../../../containers/BaseContainer';
import MuiSelect from '../../../../formElements/MuiSelect';
import { generateSelectOptions } from '../../../../../shared/utils/generateSelectOptions';
import { StickerTypeEnum } from '../../../../../shared/enums/garage.enums';
type MainInformationFormContainerProps = {
  control: Control<any>;
};
const MainInformationFormContainer: FC<MainInformationFormContainerProps> = ({ control }) => {
  const { t } = useTranslation();

  return (
    <BaseContainer title={t('general.containers.mainInformation')}>
      <Grid container rowSpacing="24px" columnSpacing="24px">
        <Grid item md={6} xs={12}>
          <Controller
            name="reference"
            control={control}
            render={({ field, fieldState }) => (
              <MuiBaseTextFiled
                {...field}
                isShowHint
                maxHintValue={72}
                label={t('general.fieldNames.reference')}
                placeholder={t('general.placeholders.reference')}
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
        <Grid item md={6} xs={12}>
          <Controller
            name="number"
            control={control}
            render={({ field, fieldState }) => (
              <MuiBaseTextFiled
                {...field}
                isShowHint
                maxHintValue={72}
                label={t('general.fieldNames.number')}
                placeholder={t('general.placeholders.registrationNumber')}
                isError={!!fieldState?.error?.message}
                errorMessage={fieldState?.error?.message}
                isRequired
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  field.onChange(event.target.value.toUpperCase())
                }
                type="text"
              />
            )}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <Controller
            name="type"
            control={control}
            render={({ field, fieldState }) => (
              <MuiSelect
                {...field}
                isClearable
                options={generateSelectOptions(Object.values(StickerTypeEnum), 'garage.stickerType')}
                label={t('general.fieldNames.type')}
                placeholder={t('general.placeholders.type')}
                isError={!!fieldState?.error?.message}
                helpText={fieldState?.error?.message}
              />
            )}
          />
        </Grid>
      </Grid>
    </BaseContainer>
  );
};

export default MainInformationFormContainer;

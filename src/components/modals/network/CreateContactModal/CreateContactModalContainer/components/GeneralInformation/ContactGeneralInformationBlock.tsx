import React, { FC } from 'react';
import { Grid, Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import { Control } from 'react-hook-form/dist/types/form';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import MuiDatePicker from '../../../../../../formElements/MuiDatePicker';
import MuiSelect from '../../../../../../formElements/MuiSelect';
import { genderSelectData } from '../../config';
import RowWithTitleContainer from '../../../../../../containers/RowWithTitleContainer';

type Props = {
  control: Control<any>;
};

const ContactGeneralInformationBlock: FC<Props> = ({ control }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobileDisplay = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ mt: '40px' }}>
      <Typography variant="h3" color={theme.palette.case.neutral.n800}>
        General Information
      </Typography>
      <Box sx={{ mt: '16px' }}>
        {isMobileDisplay ? (
          <>
            <Box sx={{ mb: '40px' }}>
              <RowWithTitleContainer
                titlePadding="10"
                alignItems="flexStart"
                title={t('general.fieldNames.birthday')}
              >
                <Grid container rowSpacing="16px" columnSpacing="16px">
                  <Grid xs={12} sm={6} item>
                    <Controller
                      name="birth_day"
                      control={control}
                      render={({ field, fieldState }) => (
                        <MuiDatePicker
                          {...field}
                          isFullWidth={false}
                          placeholder={t('general.placeholders.select_date')}
                          isError={!!fieldState?.error?.message}
                          errorMessage={fieldState?.error?.message}
                          maxDate={moment().subtract(13, 'year').subtract(1, 'day').toDate()}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </RowWithTitleContainer>
            </Box>

            <RowWithTitleContainer
              titlePadding="10"
              alignItems="flexStart"
              title={t('general.fieldNames.gender')}
            >
              <Grid container rowSpacing="16px" columnSpacing="16px">
                <Grid xs={12} sm={6} item>
                  <Controller
                    name="gender"
                    control={control}
                    render={({ field, fieldState }) => (
                      <MuiSelect
                        {...field}
                        isClearable
                        startIcon={field?.value?.icon ? <field.value.icon /> : null}
                        options={genderSelectData}
                        placeholder={t('general.placeholders.select_gender')}
                        isError={!!fieldState?.error?.message}
                        helpText={fieldState?.error?.message}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </RowWithTitleContainer>
          </>
        ) : (
          <Grid container rowSpacing="16px" columnSpacing="16px">
            <Grid xs={12} sm={6} item>
              <Controller
                name="birth_day"
                control={control}
                render={({ field, fieldState }) => (
                  <MuiDatePicker
                    {...field}
                    isFullWidth={false}
                    label={t('general.fieldNames.birthday')}
                    placeholder={t('general.placeholders.select_date')}
                    isError={!!fieldState?.error?.message}
                    errorMessage={fieldState?.error?.message}
                    maxDate={moment().subtract(13, 'year').subtract(1, 'day').toDate()}
                  />
                )}
              />
            </Grid>
            <Grid xs={12} sm={6} item>
              <Controller
                name="gender"
                control={control}
                render={({ field, fieldState }) => (
                  <MuiSelect
                    {...field}
                    isClearable
                    startIcon={field?.value?.icon ? <field.value.icon /> : null}
                    options={genderSelectData}
                    label={t('general.fieldNames.gender')}
                    placeholder={t('general.placeholders.select_gender')}
                    isError={!!fieldState?.error?.message}
                    helpText={fieldState?.error?.message}
                  />
                )}
              />
            </Grid>
          </Grid>
        )}
      </Box>
    </Box>
  );
};

export default ContactGeneralInformationBlock;

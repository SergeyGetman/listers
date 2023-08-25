import React, { FC } from 'react';
import { Box, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { FormTypeGeneralInfo, GarageEditorContainerProps } from '../types';
import { rest } from '../GarageMoreDetails/components/rest';
import { validation } from '../../../../components/modals/garage/CreateGarageItemModal/components/steps/GeneralInfoStep/components/FirstSubStep/validation';
import { CreateGarageItemModalContextProvider } from '../../../../components/modals/garage/CreateGarageItemModal/context/CreateGarageItemModalContext';
import { HeaderOnlyTitleGeneralInformation } from '../../../../components/containers/UpdateUiContainer/UpdateUiConteinerGarage.style';
import MuiCustomEditor from '../../../../components/formElements/MuiCustomEditor';

const GarageDescription: FC<GarageEditorContainerProps> = (props) => {
  const { isShowHint = true, placeholder, maxHintValue = 5000 } = props;

  const { t } = useTranslation();
  const { control } = useForm<FormTypeGeneralInfo>({
    defaultValues: rest.initialValue,
    resolver: yupResolver(validation),
  });

  return (
    <>
      <Box sx={{ marginTop: '40px' }}>
        <CreateGarageItemModalContextProvider>
          <Grid container>
            <Grid xs={12} md={2} lg={2} item>
              <HeaderOnlyTitleGeneralInformation variant="s2">
                {t('garageHub.DescriptionBlock.title')}
              </HeaderOnlyTitleGeneralInformation>
            </Grid>

            <Grid item md={12} xs={10} style={{ maxWidth: '600px' }}>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <MuiCustomEditor
                    placeholder={placeholder}
                    isShowHint={isShowHint}
                    maxHintValue={maxHintValue}
                    {...field}
                  />
                )}
              />
            </Grid>
          </Grid>
        </CreateGarageItemModalContextProvider>
      </Box>
    </>
  );
};

export default GarageDescription;

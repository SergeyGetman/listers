import React, { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useNavigate, Navigate } from 'react-router';
import { Controller, FieldValues, SubmitHandler, useForm, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { PreStepCard } from '../../components/PreStepCard/PreStepCard';
import { ReactComponent as HubmeeAI } from '../../../../assets/Images/newGarage/pre-step/hubmee-AI.svg';
import Attachments from '../../../../components/media/Attachemts';
import { DocumentsEntityTypeEnum } from '../../../../shared/enums/documentEntityType.enum';
import { MediaType } from '../../../../shared/models/media.model';
import MuiBaseTextFiled from '../../../../components/formElements/MuiBaseTextFiled';
import MuiSelect from '../../../../components/formElements/MuiSelect';
import { generateSelectOptions } from '../../../../shared/utils/generateSelectOptions';
import { USState } from '../../enum/UsaStateEnum';
import { useAppDispatch, useAppSelector } from '../../../../shared/hooks/redux';
import router from '../../../../shared/services/router';
import { checkingSubmitCurrentAI } from './helpers/checkingSubmitCurrentAI';
import {
  getCurrentSubscriptionSelector,
  getProfileNameSelector,
  getTransportTypeSelector,
} from '../../store/garage-selectors';
import { licensePlateValidate, vinValidate } from '../PreStepCustom/consts/validate';
import { PlanNamePackage } from '../../../../shared/enums/planPeriodEnum';
import { setBreadcrumbs } from '../../../../store/Common/commonThunk';
import { TransportTypeEnum } from '../../../../shared/enums/garage.enums';
import { clearInsuranceRecognitionData, setGarageTransportType } from '../../store/garageSliceV2';
import { validateTextField } from '../../utils/validateTextField';

const PreStepHubmeeAI = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const profileName = useAppSelector(getProfileNameSelector);
  const currentSubscription = useAppSelector(getCurrentSubscriptionSelector);
  const currentTransportType = useAppSelector(getTransportTypeSelector);
  const isPlatinumPackage = currentSubscription === PlanNamePackage.Platinum;

  const [InsuranceAttachment, setInsuranceAttachment] = useState<MediaType[]>([]);
  const handleAddAttachment = useCallback(
    (newMedia: MediaType[]) => {
      if (newMedia.length === 0) dispatch(clearInsuranceRecognitionData());

      setInsuranceAttachment(newMedia);
    },
    [dispatch],
  );

  const usaStateOptions = useMemo(() => {
    return generateSelectOptions(Object.keys(USState), 'general.UsaState');
  }, []);

  const {
    control,
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = useForm({
    mode: 'onSubmit',
    defaultValues: {
      license_plate: '',
      state_on_license_plate: '',
      VIN: '',
    },
  });
  const watchLicensePlate = useWatch({
    control,
    name: ['license_plate', 'state_on_license_plate'],
  });
  const watchVIN = watch('VIN');

  const disabledExceptLicensePlate = !!watchLicensePlate[0] || !!watchLicensePlate[1];
  const disabledWatchVIN = !!watchVIN.length;
  const isDisabledGo =
    watchVIN.length < 17 && (!watchLicensePlate[0] || !watchLicensePlate[1]) && !InsuranceAttachment.length;

  const submitForm: SubmitHandler<FieldValues> = async (data) => {
    await checkingSubmitCurrentAI(data, InsuranceAttachment, profileName)(dispatch, navigate);
  };

  useEffect(() => {
    dispatch(
      setBreadcrumbs([
        { title: t('general.breadcrumbs.garage'), href: router.garageNew.path },
        { title: `Add new ${currentTransportType}` },
      ]),
    );

    if (!!currentTransportType) return;

    const localStorageTransportType = localStorage.getItem('transportType') as TransportTypeEnum;
    dispatch(setGarageTransportType({ transportType: localStorageTransportType }));
  }, [currentTransportType, dispatch, t]);

  if (!isPlatinumPackage) {
    return <Navigate to={`${router.garageNew.path}`} />;
  }
  return (
    <form
      onSubmit={handleSubmit(submitForm)}
      style={{
        maxWidth: '800px',
        height: '100%',
        margin: '0 auto',
        marginTop: isMobile ? '0' : '175px',
      }}
    >
      <PreStepCard
        isShowFooter
        header={t('stubs.garage.preStep.HubmeeAI.header.header')}
        variantItem={{
          icon: <HubmeeAI />,
          title: t('stubs.garage.preStep.HubmeeAI.header.title'),
          subtitle: t('stubs.garage.preStep.HubmeeAI.header.subtitle'),
        }}
        middleBtnProps={{
          variant: 'outlined',
          isShow: true,
          label: t('plans.button.back'),
          type: 'button',
          onClick: () => navigate(`${router.garageNew.path}/${router.garageNew.children.preStep.path}`),
        }}
        rightBtnProps={{
          variant: 'contained',
          isShow: true,
          label: t('plans.button.proceed'),
          type: 'submit',
          isDisabled: isDisabledGo || isSubmitting,
        }}
      >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="flex-start"
          gap="16px"
          flexDirection={isMobile ? 'column' : 'row'}
        >
          <Box display="flex" flexDirection="column" width="100%">
            <Typography sx={{ color: theme.palette.case.neutral.n700 }} variant="t14r">
              {t('stubs.garage.preStep.HubmeeAI.content.scan')}
            </Typography>

            <Box
              mt="8px"
              sx={{
                borderRadius: '12px',
                pointerEvents: disabledExceptLicensePlate || disabledWatchVIN ? 'none' : 'auto',
                backgroundColor:
                  disabledExceptLicensePlate || disabledWatchVIN
                    ? theme.palette.case.neutral.n75
                    : theme.palette.case.neutral.n50,
              }}
            >
              <Attachments
                attachmentCardsGridConfig={{ xs: 12, sm: 12, md: 12, lg: 12 }}
                maxAttachmentsLength={1}
                attachmentType="file"
                attachments={InsuranceAttachment}
                handleAddAttachment={handleAddAttachment}
                entityType={DocumentsEntityTypeEnum.insurance_card_front_document}
              />
            </Box>
          </Box>
          <Box px="10px" alignSelf="center">
            <Typography sx={{ color: theme.palette.case.neutral.n900 }} variant="t16m">
              OR
            </Typography>
          </Box>
          <Box width="100%">
            <Box>
              <Typography sx={{ color: theme.palette.case.neutral.n700 }} variant="t14r">
                {t('stubs.garage.preStep.HubmeeAI.content.licenseOrVin')}
              </Typography>

              <Box
                display="flex"
                mt="8px"
                justifyContent="space-between"
                borderBottom={`1px dashed ${theme.palette.case.neutral.n200}`}
                pb="16px"
                gap={isTablet ? '16px' : '11px'}
              >
                <Box width={isTablet || isMobile ? '50%' : '190px'}>
                  <Controller
                    control={control}
                    name="license_plate"
                    rules={licensePlateValidate}
                    render={({ field, fieldState }) => {
                      return (
                        <MuiBaseTextFiled
                          {...field}
                          onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            const text = e.currentTarget.value;
                            field.onChange(validateTextField(text));
                          }}
                          isDisabled={!!InsuranceAttachment.length || disabledWatchVIN}
                          label={t('general.fieldNames.number')}
                          placeholder={t('general.placeholders.number')}
                          isError={!!fieldState?.error?.message}
                          errorMessage={fieldState?.error?.message}
                        />
                      );
                    }}
                  />
                </Box>
                <Box width={isTablet || isMobile ? '50%' : '132px'}>
                  <Controller
                    name="state_on_license_plate"
                    control={control}
                    render={({ field }) => {
                      return (
                        <MuiSelect
                          {...field}
                          isClearable
                          isSearchable
                          isDisabled={!!InsuranceAttachment.length || disabledWatchVIN}
                          label={t('general.fieldNames.state')}
                          placeholder={t('general.placeholders.select_state')}
                          options={usaStateOptions}
                        />
                      );
                    }}
                  />
                </Box>
              </Box>
            </Box>
            <Box mt="12px">
              <Controller
                control={control}
                name="VIN"
                rules={vinValidate}
                render={({ field, fieldState }) => {
                  return (
                    <MuiBaseTextFiled
                      {...field}
                      maxlength="17"
                      isShowHint
                      maxHintValue={17}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        const text = e.currentTarget.value;
                        field.onChange(validateTextField(text));
                      }}
                      label={t('general.fieldNames.vin')}
                      isError={!!fieldState?.error?.message}
                      errorMessage={fieldState?.error?.message}
                      isDisabled={!!InsuranceAttachment.length || disabledExceptLicensePlate}
                      placeholder={t('general.placeholders.number')}
                    />
                  );
                }}
              />

              <Typography
                sx={{
                  display: 'inline-block',
                  maxWidth: '310px',
                  color: theme.palette.case.neutral.n300,
                  marginTop: '4px',
                }}
                variant="t12r"
              >
                {t('stubs.garage.preStep.HubmeeAI.content.findVehicle')}
              </Typography>
            </Box>
          </Box>
        </Box>
      </PreStepCard>
    </form>
  );
};
export default PreStepHubmeeAI;

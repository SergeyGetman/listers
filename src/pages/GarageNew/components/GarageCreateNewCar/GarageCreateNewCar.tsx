import React, { useMemo, useEffect, memo } from 'react';
import { Box, Stack, Step, StepLabel, Stepper } from '@mui/material';
import { useTranslation } from 'react-i18next';

import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';

import ProgressBarWithLabel from '../../../../components/ProgressBarWithLabel';
import {
  ColorlibConnector,
  CreateNewCarModalHeaderContainer,
  IconBlock,
  MainContainer,
  RangeIndicator,
  RangeIndicatorLine,
  TextStyle,
  TypographyWithBreakpoints,
} from './GarageCreateNewCar.style';
import { setBreadcrumbs } from '../../../../store/Common/commonThunk';
import { useAppDispatch, useAppSelector } from '../../../../shared/hooks/redux';
import { IObjIconData } from './interface';
import GarageNewCarInformation from '../GarageNewCarInfo';
import {
  CreateGarageItemModalContextProvider,
  useCreateGarageItemModalContext,
} from '../../../../components/modals/garage/CreateGarageItemModal/context/CreateGarageItemModalContext';
import GarageMoreDetails from '../GarageMoreDetails';
import GarageLicensePlate from '../GarageLiceence/GarageLicensePlate';
import GarageDescription from '../GarageDescription';
import GarageAttachmentDocument from '../GarageAttachmentDocument/GarageAttachmentDocument';
import GarageFooter from '../GarageFooter/GarageFooter';
import GarageInsurance from '../../GarageInsurense/GarageInsurance';
import GarageInsuranceMaiInformation from '../../GarageInsurense/components/GarageInsurenceMainInfo';
import GarageInsureDeductibles from '../../GarageInsurense/components/GarageInsuranceDeductibles';
import { getTransportTypeSelector } from '../../store/garage-selectors';
import AiNotificationScanInsurance from '../../../../components/modals/AiNotificationScan';
import { FormTypeDudictibles } from '../../GarageInsurense/components/GarageInsuranceDeductibles/types';
import { validation } from '../../../../components/modals/garage/CreateGarageItemModal/components/steps/GeneralInfoStep/components/FirstSubStep/validation';
import GaragePeopleCovered from '../../GarageInsurense/components/GaragePeopleCovered';
import GarageGalery from '../GarageGalery/GarageGalery';
import { getConnections } from '../../../../store/Profile/profile.actions';
import GarageAgent from '../../GarageInsurense/components/GarageAgent';
import GarageAgency from '../../GarageInsurense/components/GarageAgency';
import GarageInshuranceAttach from '../../GarageInsurense/components/GarageInshurenceAttach/GarageInshuranceAttach';
import { ColorlibStepIcon } from './GarageIconTitle';
import { TransportTypeEnum } from '../../../../shared/enums/garage.enums';

const GarageCreateNewCar = () => {
  const { t } = useTranslation();

  const { isVisibleAi } = useAppSelector((state) => state.garageV2);
  const { pageNumber } = useAppSelector((state) => state.garageV2);
  const { isReadyForSubmit } = useAppSelector((state) => state.garageV2);
  const currentTransportType = useAppSelector(getTransportTypeSelector);

  const objIconData: IObjIconData[] = [
    { title: t('garageHub.iconText.IconGeneral') },
    { title: t('garageHub.iconText.Insurance') },
    { title: t('garageHub.iconText.Gallery') },
  ];

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setBreadcrumbs([{ title: t('general.breadcrumbs.createNewCar') }]));
  }, [dispatch, t, pageNumber]);

  useEffect(() => {
    dispatch(getConnections());
  }, [dispatch]);

  const newContext = useCreateGarageItemModalContext();

  const initialValue = {
    collision: null,
    comprehensive: null,
    amount: null,
    people_covered: null,
  };

  const { control } = useForm<FormTypeDudictibles>({
    defaultValues: initialValue,
    resolver: yupResolver(validation),
  });

  const rangeValueIndicatorLabel = useMemo(() => {
    const counterAllBlockLength = 5;
    let currentStep = 100 / counterAllBlockLength;
    currentStep = pageNumber === 1 ? currentStep + currentStep : pageNumber === 2 ? 60 : currentStep;
    return currentStep;
  }, [pageNumber]);

  return (
    <>
      <CreateGarageItemModalContextProvider>
        <MainContainer>
          <CreateNewCarModalHeaderContainer>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                <TypographyWithBreakpoints variant="h3">
                  {t('garageHub.titleHeader')}
                </TypographyWithBreakpoints>
              </Box>
              <RangeIndicator>
                <RangeIndicatorLine>
                  <ProgressBarWithLabel
                    hintText={t('general.completeRate')}
                    value={rangeValueIndicatorLabel}
                  />
                </RangeIndicatorLine>
              </RangeIndicator>
            </Box>
          </CreateNewCarModalHeaderContainer>

          <IconBlock>
            <Stack sx={{ width: '100%' }} spacing={4}>
              <Stepper alternativeLabel activeStep={pageNumber} connector={<ColorlibConnector />}>
                {objIconData.map((label: any, idx: number) => (
                  <Step key={idx}>
                    <StepLabel StepIconComponent={ColorlibStepIcon}>
                      <TextStyle>{label.title}</TextStyle>
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Stack>
          </IconBlock>

          {pageNumber === 0 ? (
            <Box>
              {isVisibleAi && (
                <AiNotificationScanInsurance title={t('garageHub.titleAiNotification')}>
                  <ErrorOutlineIcon />
                </AiNotificationScanInsurance>
              )}

              <GarageNewCarInformation context={newContext} readySubmit={isReadyForSubmit} />
              <GarageMoreDetails
                transportType={TransportTypeEnum.motorcycle}
                readySubmit={isReadyForSubmit}
              />
              <GarageLicensePlate pageNum={pageNumber} readySubmit={isReadyForSubmit} />
              <GarageDescription />
              <GarageAttachmentDocument subtitle={t('garageHub.AttachmentBlock.subTitle')} />
            </Box>
          ) : pageNumber === 1 ? (
            <>
              <Box>
                <GarageInsurance
                  title={t('garageHub.InsuranceBlock.title')}
                  subtitle={t('garageHub.InsuranceBlock.subtitle')}
                />
                <GarageInsuranceMaiInformation />
                <GarageInsureDeductibles control={control} />
                <GaragePeopleCovered control={control} />
                <GarageAgency control={control} />
                <GarageAgent control={control} />

                <GarageInshuranceAttach
                  title={t('garageHub.AttachInshuranceBlock.title')}
                  subtitle={t('garageHub.AttachInshuranceBlock.subtitle')}
                />
              </Box>
            </>
          ) : pageNumber === 2 ? (
            <>
              <GarageGalery subtitle={t('garageHub.GalleryBlock.subtitle')} />
            </>
          ) : (
            <></>
          )}
          <GarageFooter pageNum={pageNumber} />
        </MainContainer>
      </CreateGarageItemModalContextProvider>
    </>
  );
};

export default memo(GarageCreateNewCar);

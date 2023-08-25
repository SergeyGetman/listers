import React from 'react';
import { Box, Grid, useMediaQuery, useTheme } from '@mui/material';
import { useAppSelector } from '../../../../shared/hooks/redux';
import { getCurrentTransportSelector, getIsLoadingGarageSelector } from '../../store/garage-selectors';
import PropertyViewerContainer from '../../../../compositeComponents/containers/PropertyViewerContainer';
import { RootGarageItemsData } from '../../store/types';
import { IPropertyViewerContainerItem } from '../../../../compositeComponents/containers/PropertyViewerContainer/types';
import ViewDescriptionContainer from '../../../../components/viewContainers/ViewDescriptionContainer/ViewDescriptionContainer';
import ModalFooter from '../../../../components/modalsElements/containers/Footer/ModalFooter';
import { ReactComponent as EditIcon } from '../../../../assets/Images/actionsIcons/edit.svg';
import UploadFileContainer from '../../../../components/containers/UploadFileContainer';
import AttachmentsItemCard from '../../../../components/media/Attachemts/components/AttachmentsContainer/components/AttachmentsItemCard';
import modalObserver from '../../../../shared/utils/observers/modalObserver';
import { ModalNamesEnum } from '../../../../shared/enums/modalNames.enum';
import { MediaType } from '../../../../shared/models/media.model';
import { EmptyFileContainer } from './GarageViewGeneralInfo.style';
import { Skeleton } from '../../components/Skeleton/Skeleton';

// TODO i18n

const getMakeInformationPropertyItems = (
  transport: Pick<RootGarageItemsData, 'make' | 'year' | 'model'>,
): IPropertyViewerContainerItem => {
  return [
    { label: 'Year', value: transport.year, gridConfig: { xs: 4, sm: 4, md: 4, lg: 4 } },
    { label: 'Make', value: transport.make, gridConfig: { xs: 4, sm: 4, md: 4, lg: 4 } },
    { label: 'Model', value: transport.model, gridConfig: { xs: 4, sm: 4, md: 4, lg: 4 } },
  ];
};

const getLicensePlatePropertyItems = (
  transport: Pick<RootGarageItemsData, 'state_on_license_plate' | 'license_plate'>,
): IPropertyViewerContainerItem => {
  return [
    { label: 'State', value: transport.state_on_license_plate },
    { label: 'Number', value: transport.license_plate },
  ];
};

const getMoreDetailsPropertyItems = (
  transport: Pick<
    RootGarageItemsData,
    | 'body'
    | 'trim'
    | 'exterior_color'
    | 'interior_color'
    | 'fuel_type'
    | 'engine_type'
    | 'transmission'
    | 'mileage'
    | 'country_of_assembly'
    | 'drivetrain'
  >,
): IPropertyViewerContainerItem => {
  return [
    { label: 'Body / Style', value: transport.body, gridConfig: { xs: 12 } },
    { label: 'Trim', value: transport.trim, gridConfig: { xs: 12 } },
    { label: 'Exterior Color', value: transport.exterior_color },
    { label: 'Interior Color', value: transport.interior_color },
    { label: 'Fuel Type', value: transport.fuel_type },
    { label: 'Engine Type', value: transport.engine_type },
    { label: 'Transmission', value: transport.transmission },
    { label: 'Mileage', value: transport.mileage },
    { label: 'Drivetrain', value: transport.drivetrain },
    { label: 'Country of Assembly', value: transport.country_of_assembly },
  ];
};

const GarageViewGeneralInfo = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const transport = useAppSelector(getCurrentTransportSelector);
  const isLoadingGarage = useAppSelector(getIsLoadingGarageSelector);

  const handleOpenViewModal = (document: MediaType, index?: number | undefined) => {
    modalObserver.addModal(ModalNamesEnum.mediaViewer, {
      props: {
        media: [document],
        activeMedia: index ? index : 0,

        permission: { isDelete: false, isDownload: true, isUpdate: false },
      },
    });
  };

  return (
    <Box mt="24px" display="flex" flexDirection="column" gap="12px">
      <Box width="100%" maxWidth={960}>
        {isLoadingGarage ? (
          <PropertyViewerContainer
            title="Main Information"
            items={getMakeInformationPropertyItems(transport)}
          />
        ) : (
          <Skeleton height="70px" />
        )}
      </Box>
      <Box width="100%" maxWidth={960}>
        {isLoadingGarage ? (
          <PropertyViewerContainer title="More Details" items={getMoreDetailsPropertyItems(transport)} />
        ) : (
          <Skeleton height="332px" />
        )}
      </Box>

      <Box width="100%" maxWidth={960}>
        {isLoadingGarage ? (
          <PropertyViewerContainer title="License Plate" items={getLicensePlatePropertyItems(transport)} />
        ) : (
          <Skeleton height="70px" />
        )}
      </Box>

      <Box width="100%" maxWidth={960}>
        {isLoadingGarage ? (
          <PropertyViewerContainer title="Description" items={[]}>
            <ViewDescriptionContainer
              maxHeight="120px"
              sx={{ maxWidth: '576px' }}
              showMoreButton
              isShowLabel={false}
              description={transport.description ? transport.description : '-'}
            />
          </PropertyViewerContainer>
        ) : (
          <Skeleton height="134px" />
        )}
      </Box>

      <Box width="100%" maxWidth={960}>
        {isLoadingGarage ? (
          <PropertyViewerContainer title="Attachments" items={[]}>
            {!transport.documents.length ? (
              <EmptyFileContainer>
                <UploadFileContainer
                  handleGetDataFromInputChange={() => {}}
                  handleGetDataFromDrop={() => {}}
                  isMultipleInput={false}
                  size="small"
                  acceptedFormat=""
                />
              </EmptyFileContainer>
            ) : (
              <Grid
                container
                gap={isMobile ? '11px' : '24px'}
                justifyContent={isMobile ? 'center' : 'initial'}
              >
                {transport.documents.map((document: MediaType, index) => (
                  <Grid item md={3.5} xs={5.5} lg={3.5} sm={3.5} key={index}>
                    <AttachmentsItemCard
                      onDeleteAttachment={() => {}}
                      handleOpenViewModal={() => handleOpenViewModal(document)}
                      isCanDelete={false}
                      attachmentsItem={document}
                      index={index}
                    />
                  </Grid>
                ))}
              </Grid>
            )}
          </PropertyViewerContainer>
        ) : (
          <Skeleton height="200px" />
        )}
        {isMobile && <Box width="100%" height="100px" maxWidth={960} />}
      </Box>

      <ModalFooter
        rightBtnProps={{
          isShow: true,
          onClick: () => {},
          label: 'Edit',
          variant: 'contained',
          tooltipText: 'This button is still in development, expect changes :)',
          tooltipColor: 'dark',
          fullWidth: isMobile,
          isDisabled: true,
          startIcon: <EditIcon />,
          size: 'medium',
        }}
        isSpaceBetweenBtn={isMobile}
        position={isMobile ? 'fixed' : 'initial'}
      />
    </Box>
  );
};

export default GarageViewGeneralInfo;

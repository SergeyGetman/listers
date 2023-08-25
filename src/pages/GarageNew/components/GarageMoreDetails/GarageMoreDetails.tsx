import React, { useState } from 'react';

import { Box, useMediaQuery } from '@mui/material';
import { CreateGarageItemModalContextProvider } from '../../../../components/modals/garage/CreateGarageItemModal/context/CreateGarageItemModalContext';
import { TransportTypeEnum } from '../../../../shared/enums/garage.enums';

import GarageTypeCar from './components/GarageTypeCar';
import GarageTypeMoto from './components/GarageTypeMoto';
import GarageTypeCustom from './components/GarageTypeCustom';
import theme from '../../../../theme/theme';

interface IGarageMoreDetails {
  transportType?: string;
  readySubmit?: boolean;
}

const GarageMoreDetails: React.FC<IGarageMoreDetails> = ({ transportType, readySubmit }) => {
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [ready] = useState(true);

  return (
    <>
      <Box sx={{ marginTop: isMobile ? '0' : '40px' }}>
        <CreateGarageItemModalContextProvider>
          {transportType === TransportTypeEnum.car ? (
            <GarageTypeCar transportType={transportType} isReady={ready} readySubmit={readySubmit} />
          ) : transportType === TransportTypeEnum.motorcycle ? (
            <GarageTypeMoto readySubmit={readySubmit} />
          ) : (
            <GarageTypeCustom readySubmit={readySubmit} />
          )}
        </CreateGarageItemModalContextProvider>
      </Box>
    </>
  );
};

export default GarageMoreDetails;

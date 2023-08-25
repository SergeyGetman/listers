import { Box, Typography, useTheme } from '@mui/material';
import React, { FC, useState } from 'react';
import { useLoadScript } from '@react-google-maps/api';
import CustomMap from '../CustomMap';
import CopyButton from '../../buttons/CopyButton';
import { ReactComponent as MapIcon } from '../../../assets/Images/map-icon.svg';
import { ReactComponent as OpenEyeIcon } from '../../../assets/Images/open-eye-icon.svg';
import { ReactComponent as LocationIcon } from '../../../assets/Images/location-icon.svg';

import MuiTooltip from '../../MuiTooltip';

type MuiBaseInputViewProps = {
  location: google.maps.LatLng | google.maps.LatLngLiteral;
  isDefaultOpenMap?: boolean;
  address: string;
  isShowHideBlockBtn?: boolean;
  isShowTypeIcon?: boolean;
};

const LocationView: FC<MuiBaseInputViewProps> = ({
  location,
  isDefaultOpenMap,
  address,
  isShowHideBlockBtn = true,
  isShowTypeIcon,
}) => {
  const theme = useTheme();

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyD36amaFsc13wDeoSCnWW89FI2OY2pZtVU',
    libraries: ['drawing', 'places', 'visualization'],
  });
  const [isShowMap, toggleShowMap] = useState(isDefaultOpenMap);

  const handleToggleShowMap = () => {
    toggleShowMap(!isShowMap);
  };

  const handleOpenInGoogleMaps = () => {
    window.open(`http://maps.google.com/maps?q=loc:${location?.lat},${location?.lng}`);
  };

  return (
    <Box display="flex" flexDirection="column">
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {isShowTypeIcon && (
          <Box
            sx={{
              mr: '6px',
              svg: { width: '16px', height: '16px' },
            }}
          >
            <LocationIcon />
          </Box>
        )}
        <Typography color={theme.palette.case.blue.b800} noWrap mr="12px" variant="t14r">
          {address}
        </Typography>
        <CopyButton content={address} />
        <Box
          sx={{
            ml: '6px',
            '&: hover': { opacity: '0.7' },
            cursor: 'pointer',
            svg: { width: '16px', height: '16px' },
          }}
          onClick={() => handleOpenInGoogleMaps()}
        >
          <MuiTooltip color="dark" title="Open in Google maps">
            <MapIcon />
          </MuiTooltip>
        </Box>
        {isShowHideBlockBtn && (
          <Box
            sx={{
              ml: '6px',
              '&: hover': { opacity: '0.7' },
              cursor: 'pointer',
              svg: { width: '16px', height: '16px' },
            }}
            onClick={() => handleToggleShowMap()}
          >
            <MuiTooltip color="dark" title={isShowMap ? 'Hide Map' : 'Show map'}>
              <OpenEyeIcon />
            </MuiTooltip>
          </Box>
        )}
      </Box>

      {isLoaded && (
        <>{isShowMap && !!location?.lat && !!location?.lat && <CustomMap location={location} />}</>
      )}
    </Box>
  );
};

export default LocationView;

/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Typography, useTheme } from '@mui/material';
import React, { FC, forwardRef, useState } from 'react';
import Geocode from 'react-geocode';
import { useLoadScript } from '@react-google-maps/api';
import { geocodeByAddress } from 'react-places-autocomplete';
import MuiLocationInput from '../../formElements/MuiLocationInput';
import CustomMap from '../CustomMap';
import { ReactComponent as LocationIcon } from '../../../assets/Images/location.svg';
import MuiPreloader from '../../MuiPreloader';
import MuiTooltip from '../../MuiTooltip';
import { ReactComponent as MapIcon } from '../../../assets/Images/map-icon.svg';
import { ReactComponent as OpenEyeIcon } from '../../../assets/Images/open-eye-icon.svg';

Geocode.setApiKey('AIzaSyD36amaFsc13wDeoSCnWW89FI2OY2pZtVU');

type MuiLocationInputProps = {
  value?: { address?: string; map?: { lat?: number; lng?: number } };
  name: string;
  onChange: (e: { address?: string; map?: { lat?: number; lng?: number } }) => void;
  placeholder?: string;
  label?: string;
  isError?: boolean;
  errorMessage?: string;
  isShrink?: boolean;
  [x: string]: any;
};
// TODO i18n
const LocationEdit: FC<MuiLocationInputProps> = forwardRef<HTMLHeadingElement, MuiLocationInputProps>(
  (props, ref) => {
    const { onChange, name, value, placeholder, label, isError, errorMessage, isShrink, ...args } = props;
    const { isLoaded } = useLoadScript({
      googleMapsApiKey: 'AIzaSyCFDzfyH7KIIUvgueWOD86mHPxt8uLlQ_c',
      libraries: ['drawing', 'places', 'visualization'],
    });
    const [loading, setLoading] = useState(false);
    const theme = useTheme();
    const [isDisabledGetCurrentLocation, setIsDisabledGetCurrentLocation] = useState<boolean>(false);
    const [isUsedCurrentLocation, setIsUsedCurrentLocation] = useState<boolean>(false);
    const [isShowMap, toggleShowMap] = useState(true);

    const handleOpenInGoogleMaps = () => {
      window.open(`http://maps.google.com/maps?q=loc:${value?.map?.lat},${value?.map?.lng}`);
    };
    const onSearchError = () => {
      onChange({ address: '', map: {} });
    };

    const handleChangeInput = (e: string) => {
      setIsUsedCurrentLocation(false);

      if (e?.length === 0) {
        onChange({ address: e, map: {} });
      } else {
        onChange({ ...value, address: e });
      }
    };

    const getLocation = (lat?: number, lng?: number) => {
      Geocode.fromLatLng(String(lat), String(lng)).then((response) => {
        const selectedAddress = response?.results[0]?.formatted_address;
        onChange({ address: selectedAddress, map: { lat, lng } });
      });
    };

    const handleSelect = (address: string) => {
      geocodeByAddress(address).then((response) => {
        if (
          response &&
          response?.length === 1 &&
          response[0] &&
          response[0]?.geometry &&
          response[0]?.geometry?.location
        ) {
          onChange({
            address,
            map: {
              lat: response[0]?.geometry?.location.lat(),
              lng: response[0]?.geometry?.location.lng(),
            },
          });
        } else {
          onChange({ address: '', map: {} });
        }
      });
    };

    const handleSetCurrentLocation = () => {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          getLocation(latitude, longitude);
          setLoading(false);
          setIsUsedCurrentLocation(true);
        },
        () => {
          setLoading(false);
          setIsDisabledGetCurrentLocation(true);
        },
      );
    };

    return (
      <Box>
        {isLoaded && (
          <Box>
            <MuiLocationInput
              {...args}
              value={value?.address || ''}
              name={name}
              onChange={(e) => handleChangeInput(e)}
              handleSelect={handleSelect}
              onSearchError={onSearchError}
              placeholder={placeholder}
              label={label}
              isError={isError}
              errorMessage={errorMessage}
              isShrink={isShrink}
              ref={ref}
            />
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: '8px' }}>
              {isDisabledGetCurrentLocation || isUsedCurrentLocation ? (
                <Box
                  sx={{
                    width: 'content-width',
                    display: 'flex',
                    alignItems: 'center',
                    svg: {
                      path: {
                        fill: theme.palette.case.neutral.n400,
                      },
                    },
                  }}
                >
                  <MuiTooltip
                    color="dark"
                    title={isDisabledGetCurrentLocation ? 'Cannot access your location' : 'Is already used'}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      {loading ? <MuiPreloader size="small" isShow /> : <LocationIcon />}

                      <Typography ml="8px" variant="t14r" color={theme.palette.case.neutral.n400}>
                        Use my current location
                      </Typography>
                    </Box>
                  </MuiTooltip>
                </Box>
              ) : (
                <Box
                  sx={{
                    cursor: loading ? 'default' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    svg: {
                      path: {
                        fill: theme.palette.case.neutral.n500,
                      },
                    },
                  }}
                  onClick={() => (loading ? true : handleSetCurrentLocation())}
                >
                  {loading ? <MuiPreloader size="small" isShow /> : <LocationIcon />}

                  <Typography ml="8px" variant="t14r" color={theme.palette.case.neutral.n600}>
                    Use my current location
                  </Typography>
                </Box>
              )}
              {value?.map?.lat && (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
                  </Box>{' '}
                  <Box
                    sx={{
                      ml: '6px',
                      '&: hover': { opacity: '0.7' },
                      cursor: 'pointer',
                      svg: { width: '16px', height: '16px' },
                    }}
                    onClick={() => toggleShowMap(!isShowMap)}
                  >
                    <MuiTooltip color="dark" title={isShowMap ? 'Hide Map' : 'Show map'}>
                      <OpenEyeIcon />
                    </MuiTooltip>
                  </Box>
                </Box>
              )}
            </Box>

            {isShowMap && value?.map?.lat && value?.map?.lng && (
              <CustomMap
                isDraggableMarker
                location={{ ...value.map } as google.maps.LatLngLiteral}
                getLocation={(lat, lng) => getLocation(lat, lng)}
              />
            )}
          </Box>
        )}
      </Box>
    );
  },
);

export default LocationEdit;

import React, { FC } from 'react';
import { GoogleMap, MarkerF } from '@react-google-maps/api';
import { Box } from '@mui/material';
import { styleMap } from './styleConfig';
import scrMarker from '../../../assets/Images/marker.png';
type CustomMapProps = {
  location: google.maps.LatLng | google.maps.LatLngLiteral;
  isDraggableMarker?: boolean;
  getLocation?: (lat: number, lng: number) => void;
};

const CustomMap: FC<CustomMapProps> = ({ location, isDraggableMarker, getLocation }) => {
  return (
    <Box sx={{ width: '100%', height: '100%', marginTop: '16px' }}>
      <GoogleMap
        options={styleMap}
        center={location}
        zoom={11}
        mapContainerStyle={{ height: '300px', width: '100%' }}
      >
        <MarkerF
          icon={{ url: scrMarker }}
          draggable={isDraggableMarker}
          position={location}
          onDragEnd={({ latLng }: any) => (getLocation ? getLocation(latLng.lat(), latLng.lng()) : true)}
        />
      </GoogleMap>
    </Box>
  );
};

export default CustomMap;

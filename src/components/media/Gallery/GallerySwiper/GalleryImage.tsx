import React, { FC } from 'react';
import { Box } from '@mui/material';
import { MediaType } from '../../../../shared/models/media.model';

type GalleryImageProps = {
  image: MediaType;
  height?: string;
};

const GalleryImage: FC<GalleryImageProps> = ({ image, height = '256px' }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        height,
      }}
    >
      <img
        className="swiper-lazy"
        style={{
          borderRadius: '5px',
          maxWidth: '460px',
          width: 'auto',
          maxHeight: '265px',
        }}
        src={`${image.url}`}
        alt="test"
      />
    </Box>
  );
};

export default GalleryImage;

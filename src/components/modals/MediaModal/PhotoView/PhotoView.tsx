import { Box } from '@mui/material';
import React, { FC } from 'react';
import { TransformWrapper, TransformComponent } from '@kokarn/react-zoom-pan-pinch';
import { MediaType } from '../../../../shared/models/media.model';
import { MediaModalViewItemContent } from '../MediaModalContent.style';

type PhotoViewProps = {
  item: MediaType;
};

const PhotoView: FC<PhotoViewProps> = ({ item }) => {
  return (
    <MediaModalViewItemContent>
      <TransformWrapper>
        <TransformComponent>
          <Box
            sx={{
              height: '100%',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img
              style={{
                height: '100%',
                width: '100%',
                objectFit: 'contain',
              }}
              src={`${item.url}`}
              alt="ggg"
            />
          </Box>
        </TransformComponent>
      </TransformWrapper>
    </MediaModalViewItemContent>
  );
};

export default PhotoView;

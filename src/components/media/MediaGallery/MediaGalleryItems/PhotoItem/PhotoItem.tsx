import React, { FC } from 'react';
import { PhotoItemContainer } from './PhotoItem.style';

const PhotoItem: FC<{ img?: string }> = ({ img = '' }) => {
  return (
    <PhotoItemContainer>
      <img src={`${img}`} alt="gallery" />
    </PhotoItemContainer>
  );
};

export default PhotoItem;

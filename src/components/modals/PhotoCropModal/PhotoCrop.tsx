import { Box, Typography } from '@mui/material';
import { FC, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ReactCrop, { centerCrop, makeAspectCrop, Crop } from 'react-image-crop';
import ModalFooter from '../../modalsElements/containers/Footer/ModalFooter';
import { PhotoCropContainer, PhotoCropContent } from './PhotoCrop.style';

import { PhotoEntityTypeEnum } from '../../../shared/enums/photoEntityType.enum';

type PhotoCropType = {
  title: string;
  cropConfig?: {
    aspect: number;
    width: number;
    unit: string;
  };
  isCropForBackground?: boolean;
  img: Blob;
  entityType?: PhotoEntityTypeEnum;
  entityId?: number | null;
  loadingMediaId: string;
  onClose: () => void;
  handleSavePhoto: (data: FormData, id: string) => void;
};

function centerAspectCrop(mediaWidth: number, mediaHeight: number, aspect: number) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight,
    ),
    mediaWidth,
    mediaHeight,
  );
}

const PhotoCrop: FC<PhotoCropType> = ({
  title,
  cropConfig,
  img,
  isCropForBackground,
  loadingMediaId,
  handleSavePhoto,
  onClose,
  entityType,
  entityId = null,
}) => {
  const defaultCropConfig = cropConfig
    ? cropConfig
    : isCropForBackground
    ? { aspect: 1200 / 500, width: 1200, unit: '%' }
    : { aspect: 4 / 4, width: 100, unit: '%' };
  const [imgSrc, setImgSrc] = useState('');
  const { t } = useTranslation();

  const imgRef = useRef<HTMLImageElement>(null);
  const [crop, setCrop] = useState<Crop>();

  function onSelectFile(file: Blob) {
    if (file) {
      setCrop(undefined);
      const reader = new FileReader();

      reader.addEventListener('load', () => setImgSrc(reader?.result?.toString() || ''));
      reader.readAsDataURL(file);
    }
  }

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    const { width, height } = e.currentTarget;
    setCrop(centerAspectCrop(width, height, defaultCropConfig.aspect));
  }

  const handleSubmit = () => {
    if (crop) {
      const formData = new FormData();
      formData.append('file', img);
      formData.append('x', crop.x.toString());
      formData.append('y', crop.y.toString());
      formData.append('height', crop.height.toString());
      formData.append('width', crop.width.toString());
      formData.append('entity_type', entityType || '');
      formData.append('entity_id', entityId ? entityId.toString() : '');
      handleSavePhoto(formData, loadingMediaId);
      onClose();
    }
  };

  useEffect(() => {
    onSelectFile(img);
  }, [img]);

  return (
    <PhotoCropContainer>
      <PhotoCropContent>
        <Box>
          <Box>
            <Typography variant="h2" sx={{ textTransform: 'capitalize' }}>
              {title}
            </Typography>
          </Box>
          <Box>
            <Typography variant="default" sx={{ mb: '10px' }}>
              {t('mediaGallery.crop.subtitle')}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', maxHeight: '500px', height: '100%' }}>
          <ReactCrop
            minWidth={30}
            minHeight={30}
            crop={crop}
            keepSelection
            onChange={(_, percentCrop) => setCrop(percentCrop)}
            aspect={defaultCropConfig.aspect}
            style={{
              display: 'flex',
            }}
          >
            <img ref={imgRef} alt="Crop me" src={imgSrc} onLoad={onImageLoad} />
          </ReactCrop>
        </Box>
      </PhotoCropContent>
      <ModalFooter
        position="initial"
        rightBtnProps={{
          isShow: true,
          label: t('general.buttons.save'),
          variant: 'contained',
          onClick: () => handleSubmit(),
        }}
      />
    </PhotoCropContainer>
  );
};
export default PhotoCrop;

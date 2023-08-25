import React, { FC, memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import MuiDotAccordion from '../../accordions/MuiDotAccordion';
import Gallery from '../../media/Gallery';
import { MediaType } from '../../../shared/models/media.model';

import { PhotoEntityTypeEnum } from '../../../shared/enums/photoEntityType.enum';

type GalleryContainerProps = {
  gallery: MediaType[];
  onAddMedia: (files: MediaType[]) => void;
  maxPhotoLength?: number;
  placeholder?: string;
  maxHideView?: number;
  isCanAddMedia?: boolean;
  permission?: { isDelete?: boolean; isDownload?: boolean; isUpdate?: boolean };
  isDeleteWithoutAutoSave?: boolean;
  isCounter?: boolean;
  isContentInformation?: boolean;
  isDefaultExpand?: boolean;
  entityType?: PhotoEntityTypeEnum;
};
// TODO storybook

const GalleryContainer: FC<GalleryContainerProps> = ({
  gallery,
  placeholder,
  onAddMedia,
  maxPhotoLength = 7,
  isDeleteWithoutAutoSave = true,
  maxHideView = 5,
  permission,
  isCanAddMedia = true,
  isCounter = true,
  isContentInformation = true,
  isDefaultExpand = true,
  entityType,
}) => {
  const { t } = useTranslation();
  const [isExpanded, toggleExpand] = useState<boolean>(isDefaultExpand);
  const handleAddMedia = (files: MediaType[]) => {
    toggleExpand(true);
    onAddMedia(files);
  };
  return (
    <MuiDotAccordion
      label={t('general.containers.gallery')}
      contentInformation={isContentInformation ? t('general.containerInfo.pictures') : undefined}
      contentCounter={isCounter ? gallery.length : undefined}
      isCustomExpandState
      isCustomExpand={isExpanded}
      setCustomExpand={toggleExpand}
    >
      <Gallery
        type="gallery"
        media={gallery}
        placeholder={placeholder}
        isCanAddMedia={isCanAddMedia}
        maxPhotoLength={maxPhotoLength}
        isDeleteWithoutAutoSave={isDeleteWithoutAutoSave}
        maxHideView={maxHideView}
        onAddMedia={handleAddMedia}
        permission={permission}
        entityType={entityType}
      />
    </MuiDotAccordion>
  );
};

export default memo(GalleryContainer);

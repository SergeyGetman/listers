import React, { FC, memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Gallery from '../../media/Gallery';
import MuiDotAccordion from '../../accordions/MuiDotAccordion';
import { MediaType } from '../../../shared/models/media.model';
import { DocumentsEntityTypeEnum } from '../../../shared/enums/documentEntityType.enum';
type DocumentsContainerProps = {
  files: MediaType[];
  onAddMedia: (files: MediaType[]) => void;
  isCanAddMedia?: boolean;
  placeholder?: string;
  permission?: { isDelete?: boolean; isDownload?: boolean; isUpdate?: boolean };
  isDefaultExpand?: boolean;
  isDeleteWithoutAutoSave?: boolean;
  isCounter?: boolean;
  isContentInformation?: boolean;
  isDisabledExpand?: boolean;
  maxPhotoLength?: number;
  maxHideView?: number;
  entityType?: DocumentsEntityTypeEnum;
};
// TODO storybook

const DocumentsContainer: FC<DocumentsContainerProps> = ({
  files,
  onAddMedia,
  placeholder,
  permission,
  isCanAddMedia,
  isDefaultExpand = true,
  isDeleteWithoutAutoSave = true,
  isCounter = true,
  isDisabledExpand = false,
  isContentInformation = true,
  maxPhotoLength = 5,
  maxHideView = 5,
  entityType,
}) => {
  const { t } = useTranslation();
  const [isExpanded, toggleExpand] = useState<boolean>(isDefaultExpand);
  const handleAddMedia = (doc: MediaType[]) => {
    toggleExpand(true);
    onAddMedia(doc);
  };
  return (
    <MuiDotAccordion
      label={t('general.containers.documents')}
      contentInformation={isContentInformation ? t('general.containerInfo.documents') : undefined}
      contentCounter={isCounter ? files.length : undefined}
      isCustomExpandState
      isDisabledExpand={isDisabledExpand}
      isCustomExpand={isExpanded}
      setCustomExpand={toggleExpand}
    >
      <Gallery
        isCanAddMedia={isCanAddMedia}
        maxPhotoLength={maxPhotoLength}
        maxHideView={maxHideView}
        type="files"
        placeholder={placeholder}
        media={files}
        entityType={entityType}
        isDeleteWithoutAutoSave={isDeleteWithoutAutoSave}
        onAddMedia={handleAddMedia}
        permission={permission}
      />
    </MuiDotAccordion>
  );
};

export default memo(DocumentsContainer);

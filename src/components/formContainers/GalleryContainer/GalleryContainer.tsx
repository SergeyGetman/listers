import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import BaseContainer from '../../containers/BaseContainer';
import Attachments from '../../media/Attachemts';
import { MediaType } from '../../../shared/models/media.model';
import { PhotoEntityTypeEnum } from '../../../shared/enums/photoEntityType.enum';
type GalleryContainerProps = {
  maxAttachmentsLength?: number;
  attachments: MediaType[];
  handleAddAttachment: (files: MediaType[]) => void;
  permission?: { isDelete?: boolean; isDownload?: boolean; isUpdate?: boolean };
  entityType: PhotoEntityTypeEnum;
  isDeleteWithAutoSave?: boolean;
  attachmentCardsGridConfig?: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
  };
};
const GalleryContainer: FC<GalleryContainerProps> = ({
  maxAttachmentsLength = 20,
  attachments,
  handleAddAttachment,
  permission,
  entityType,
  isDeleteWithAutoSave,
  attachmentCardsGridConfig,
}) => {
  const { t } = useTranslation();

  return (
    <BaseContainer
      rightText={`${attachments?.length}/${maxAttachmentsLength}`}
      title={t('general.containers.gallery')}
      subTitle={t('general.containerSubtitle.gallery', { count: maxAttachmentsLength })}
    >
      <Attachments
        maxAttachmentsLength={maxAttachmentsLength}
        attachmentType="photo"
        attachments={attachments}
        handleAddAttachment={handleAddAttachment}
        entityType={entityType}
        permission={permission}
        attachmentCardsGridConfig={attachmentCardsGridConfig}
        isDeleteWithAutoSave={isDeleteWithAutoSave}
      />
    </BaseContainer>
  );
};

export default GalleryContainer;

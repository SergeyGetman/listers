import React, { FC } from 'react';

import { useTranslation } from 'react-i18next';
import BaseContainer from '../../containers/BaseContainer';
import Attachments from '../../media/Attachemts';
import { MediaType } from '../../../shared/models/media.model';
import { DocumentsEntityTypeEnum } from '../../../shared/enums/documentEntityType.enum';
type DocumentsContainerProps = {
  maxAttachmentsLength?: number;
  attachments: MediaType[];
  handleAddAttachment: (files: MediaType[]) => void;
  permission?: { isDelete?: boolean; isDownload?: boolean; isUpdate?: boolean };
  entityType: DocumentsEntityTypeEnum;
  isDeleteWithAutoSave?: boolean;
  attachmentCardsGridConfig?: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
  };
};
const DocumentsContainer: FC<DocumentsContainerProps> = ({
  maxAttachmentsLength = 5,
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
      title={t('general.containers.documents')}
    >
      <Attachments
        maxAttachmentsLength={maxAttachmentsLength}
        attachmentType="file"
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

export default DocumentsContainer;

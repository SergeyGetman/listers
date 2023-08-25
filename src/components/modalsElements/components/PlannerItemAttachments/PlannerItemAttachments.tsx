import { Box } from '@mui/material';
import React, { FC } from 'react';
import Attachments from '../../../media/Attachemts';
import { MediaType } from '../../../../shared/models/media.model';
import { DocumentsEntityTypeEnum } from '../../../../shared/enums/documentEntityType.enum';
type PlannerItemAttachmentsProps = {
  maxAttachmentsLength?: number;
  attachments: MediaType[];
  handleAddAttachment: (files: MediaType[]) => void;
  permission?: { isDelete?: boolean; isDownload?: boolean; isUpdate?: boolean };
  entityType: DocumentsEntityTypeEnum;
  isCanAddMedia?: boolean;
  isDeleteWithAutoSave?: boolean;
  attachmentCardsGridConfig?: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
  };
};
const PlannerItemAttachments: FC<PlannerItemAttachmentsProps> = ({
  maxAttachmentsLength = 100,
  isCanAddMedia = true,
  attachments,
  handleAddAttachment,
  permission,
  entityType,
  isDeleteWithAutoSave,
  attachmentCardsGridConfig,
}) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', mt: '16px' }}>
      {/* <Typography mb="12px" variant="t14r" color={theme.palette.case.neutral.n500}> */}
      {/*  Max number of files is limited to 20 */}
      {/* </Typography> */}
      <Attachments
        maxAttachmentsLength={maxAttachmentsLength}
        attachmentType="file"
        attachments={attachments}
        handleAddAttachment={handleAddAttachment}
        entityType={entityType}
        permission={permission}
        isCanAddMedia={isCanAddMedia}
        attachmentCardsGridConfig={attachmentCardsGridConfig}
        isDeleteWithAutoSave={isDeleteWithAutoSave}
      />
    </Box>
  );
};

export default PlannerItemAttachments;

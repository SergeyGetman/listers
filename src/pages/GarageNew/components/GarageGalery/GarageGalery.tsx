import React, { FC, useCallback, useState } from 'react';
import { Grid } from '@mui/material';
import Attachments from '../../../../components/media/Attachemts';
import { DocumentsEntityTypeEnum } from '../../../../shared/enums/documentEntityType.enum';
import { MediaType } from '../../../../shared/models/media.model';
import { GarageAttachmentDocumentSubtitle } from '../GarageAttachmentDocument/GarageAttachmentDocument.style';

interface IGalery {
  subtitle: string;
}

const GarageGalery: FC<IGalery> = ({ subtitle }) => {
  const [attachments, setAttachments] = useState<MediaType[]>([]);
  const handleAddAttachment = useCallback((newMedia: MediaType[]) => {
    setAttachments(newMedia);
  }, []);
  return (
    <>
      <GarageAttachmentDocumentSubtitle variant="t14r">{subtitle}</GarageAttachmentDocumentSubtitle>
      <Grid item md={10} xs={10} style={{ maxWidth: '600px' }}>
        <Attachments
          maxAttachmentsLength={5}
          attachmentType="file"
          attachments={attachments}
          handleAddAttachment={handleAddAttachment}
          entityType={DocumentsEntityTypeEnum.section_document}
        />
      </Grid>
    </>
  );
};

export default GarageGalery;

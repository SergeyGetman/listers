import React, { FC, useCallback, useState } from 'react';
import { Box, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { DocumentsEntityTypeEnum } from '../../../../shared/enums/documentEntityType.enum';
import { MediaType } from '../../../../shared/models/media.model';
import Attachments from '../../../../components/media/Attachemts';
import { CreateGarageItemModalContextProvider } from '../../../../components/modals/garage/CreateGarageItemModal/context/CreateGarageItemModalContext';
import { HeaderOnlyTitleGeneralInformation } from '../../../../components/containers/UpdateUiContainer/UpdateUiConteinerGarage.style';
import { GarageAttachmentDocumentSubtitle } from './GarageAttachmentDocument.style';

interface IGarageAttachmentDocument<T = string> {
  subtitle: T;
}

const GarageAttachmentDocument: FC<IGarageAttachmentDocument<string>> = ({ subtitle }) => {
  const { t } = useTranslation();

  const [attachments, setAttachments] = useState<MediaType[]>([]);
  const handleAddAttachment = useCallback((newMedia: MediaType[]) => {
    setAttachments(newMedia);
  }, []);
  return (
    <Box sx={{ marginTop: '40px' }}>
      <CreateGarageItemModalContextProvider>
        <Grid container>
          <Grid xs={12} md={2} lg={2} item>
            <HeaderOnlyTitleGeneralInformation variant="s2">
              {t('garageHub.AttachmentBlock.title')}
            </HeaderOnlyTitleGeneralInformation>
            <GarageAttachmentDocumentSubtitle variant="t14r">{subtitle}</GarageAttachmentDocumentSubtitle>
          </Grid>

          <Grid item md={10} xs={10} style={{ maxWidth: '600px' }}>
            <Attachments
              maxAttachmentsLength={5}
              attachmentType="file"
              attachments={attachments}
              handleAddAttachment={handleAddAttachment}
              entityType={DocumentsEntityTypeEnum.section_document}
            />
          </Grid>
        </Grid>
      </CreateGarageItemModalContextProvider>
    </Box>
  );
};

export default GarageAttachmentDocument;

import React, { FC, useCallback, useState } from 'react';
import { Grid } from '@mui/material';
import { HeaderOnlyTitleGeneralInformation } from '../../../../../components/containers/UpdateUiContainer/UpdateUiConteinerGarage.style';
import Attachments from '../../../../../components/media/Attachemts';
import { DocumentsEntityTypeEnum } from '../../../../../shared/enums/documentEntityType.enum';
import { MediaType } from '../../../../../shared/models/media.model';
import { GarageAttachmentDocumentSubtitle } from '../../../components/GarageAttachmentDocument/GarageAttachmentDocument.style';
import { GarageAgencyStyle } from '../GarageAgency/GarageAgency.style';

interface IGarageInshurance {
  title: string;
  subtitle: string;
}

const GarageInshuranceAttach: FC<IGarageInshurance> = ({ title, subtitle }) => {
  const [frontAttachment, setFrontAttachment] = useState<MediaType[]>([]);

  const handleAddFrontAttachment = useCallback((newMedia: MediaType[]) => {
    setFrontAttachment(newMedia);
  }, []);
  return (
    <>
      <GarageAgencyStyle>
        <Grid container rowSpacing={{ xs: '16px', sm: '16px' }} columnSpacing="24px">
          <Grid xs={6} md={2} lg={2} item>
            <HeaderOnlyTitleGeneralInformation variant="s2">{title}</HeaderOnlyTitleGeneralInformation>
            <GarageAttachmentDocumentSubtitle style={{ maxWidth: '135px' }} variant="t14r">
              {subtitle}
            </GarageAttachmentDocumentSubtitle>
          </Grid>
          <Grid item xs={6} sm={6} md={6}>
            <Attachments
              attachmentCardsGridConfig={{ xs: 12, sm: 12, md: 12, lg: 12 }}
              maxAttachmentsLength={1}
              attachmentType="file"
              attachments={frontAttachment}
              handleAddAttachment={handleAddFrontAttachment}
              entityType={DocumentsEntityTypeEnum.insurance_card_front_document}
            />
          </Grid>
        </Grid>
      </GarageAgencyStyle>
    </>
  );
};

export default GarageInshuranceAttach;

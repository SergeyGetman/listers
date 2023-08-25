import React, { FC, useCallback, useState } from 'react';
import { Grid } from '@mui/material';
import {
  CanstomGeneralInformationFirstBlock,
  CanstomGeneralInformationGeneralBlock,
  HeaderOnlyTitleGeneralInformation,
} from '../../../components/containers/UpdateUiContainer/UpdateUiConteinerGarage.style';
import Attachments from '../../../components/media/Attachemts';
import { DocumentsEntityTypeEnum } from '../../../shared/enums/documentEntityType.enum';
import { MediaType } from '../../../shared/models/media.model';
import { GarageAttachmentDocumentSubtitle } from '../components/GarageAttachmentDocument/GarageAttachmentDocument.style';

interface IGarageInsurance<T> {
  title: T;
  subtitle: T;
}

const GarageInsurance: FC<IGarageInsurance<string>> = ({ title, subtitle }) => {
  const [isCheckTablet] = useState<boolean>(true);
  const [isMobile] = useState<boolean>(true);
  const [frontAttachment, setFrontAttachment] = useState<MediaType[]>([]);

  const handleAddFrontAttachment = useCallback((newMedia: MediaType[]) => {
    setFrontAttachment(newMedia);
  }, []);

  return (
    <>
      <CanstomGeneralInformationGeneralBlock maxWidth="830px" columns="1fr 1fr">
        <CanstomGeneralInformationFirstBlock
          columns="160px 360px"
          maxWidth="535px"
          columnsOnTablet="455px"
          rowsOnTablet="45px"
        >
          <Grid item xs={6} sm={6} md={2}>
            <HeaderOnlyTitleGeneralInformation isTablet={isCheckTablet} isMobile={isMobile} variant="s2">
              {title}
            </HeaderOnlyTitleGeneralInformation>
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
        </CanstomGeneralInformationFirstBlock>
      </CanstomGeneralInformationGeneralBlock>
    </>
  );
};

export default GarageInsurance;

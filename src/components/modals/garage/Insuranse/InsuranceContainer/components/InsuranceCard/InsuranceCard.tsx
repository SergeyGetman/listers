import { Grid, Typography } from '@mui/material';
import React, { FC, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { UseFieldArrayReturn } from 'react-hook-form';
import { DocumentsEntityTypeEnum } from '../../../../../../../shared/enums/documentEntityType.enum';

import MuiDotAccordion from '../../../../../../accordions/MuiDotAccordion';
import Gallery from '../../../../../../media/Gallery';
import { InsuranceForm } from '../../InsuranceUtils';

type Props = {
  frontDocumentArray: UseFieldArrayReturn<InsuranceForm, 'insurance_card_front', 'id'>;
  backDocumentArray: UseFieldArrayReturn<InsuranceForm, 'insurance_card_back', 'id'>;
};

const InsuranceCard: FC<Props> = ({ frontDocumentArray, backDocumentArray }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  useMemo(() => {
    if (frontDocumentArray.fields.length > 0 || backDocumentArray.fields.length > 0) {
      setIsOpen(true);
    }
  }, [backDocumentArray.fields.length, frontDocumentArray.fields.length]);

  return (
    <MuiDotAccordion
      isCustomExpandState
      isCustomExpand={isOpen}
      setCustomExpand={(value) => setIsOpen(value)}
      label={t('general.containers.insuranceCad')}
      isDefaultExpand={false}
    >
      <Grid container columnSpacing="10px">
        <Grid
          item
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <Gallery
            type="files"
            entityType={DocumentsEntityTypeEnum.insurance_card_front_document}
            media={frontDocumentArray.fields}
            isShowStub={false}
            maxPhotoLength={1}
            onAddMedia={(file) => frontDocumentArray.replace(file)}
          />
          <Typography sx={{ mt: '22px' }} variant="small">
            Front
          </Typography>
        </Grid>
        <Grid
          item
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <Gallery
            type="files"
            entityType={DocumentsEntityTypeEnum.insurance_card_back_document}
            media={backDocumentArray.fields}
            isShowStub={false}
            maxPhotoLength={1}
            onAddMedia={(file) => backDocumentArray.replace(file)}
          />
          <Typography sx={{ mt: '22px' }} variant="small">
            Back
          </Typography>
        </Grid>
      </Grid>
    </MuiDotAccordion>
  );
};

export default InsuranceCard;

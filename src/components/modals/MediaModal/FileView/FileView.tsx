import React, { FC, useState, useRef, useCallback } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { Document, Page, pdfjs } from 'react-pdf';
import { TransformWrapper, TransformComponent } from '@kokarn/react-zoom-pan-pinch';
import { useTranslation } from 'react-i18next';
import NavigationButton from '../../../buttons/NavigationButton';
import { MediaType } from '../../../../shared/models/media.model';
import { MediaModalViewItemContent } from '../MediaModalContent.style';

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

type FileViewProps = {
  item: MediaType;
};

const FILE_MARGIN = 20;

const FileView: FC<FileViewProps> = ({ item }) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const modalRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  function onDocumentLoadSuccess(pdf: any) {
    setNumPages(pdf.numPages);
    setPageNumber(1);
  }

  function changePage(offset: number) {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  const fileHeight = useCallback(() => {
    if (!modalRef?.current) return 0;
    const modalHeight = modalRef?.current?.clientHeight;
    return modalHeight ? modalHeight - FILE_MARGIN : 0;
  }, []);

  return (
    <MediaModalViewItemContent ref={modalRef}>
      <Document
        file={`${item?.additional_info?.pdf_url ? item?.additional_info?.pdf_url : item.url}`}
        onLoadSuccess={(pdf) => onDocumentLoadSuccess(pdf)}
        loading={
          <Box
            sx={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CircularProgress color="primary" />
          </Box>
        }
      >
        <TransformWrapper>
          <TransformComponent>
            <Box
              sx={{
                height: '100%',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Page height={fileHeight()} pageNumber={pageNumber} />
            </Box>
          </TransformComponent>
        </TransformWrapper>
      </Document>

      {numPages && (
        <Box
          sx={{
            display: 'flex',
            maxWidth: '300px',
            margin: '0 auto',
            justifyContent: 'space-between',
          }}
        >
          <NavigationButton
            isDisabled={pageNumber <= 1}
            onClick={() => previousPage()}
            size="small"
            type="back"
          />
          <Typography sx={{ m: '0 15px' }} variant="default_bolt">
            {t('mediaGallery.viewModal.filePage', {
              count1: pageNumber || (numPages ? 1 : '--'),
              count2: numPages || '--',
            })}
          </Typography>
          <NavigationButton
            isDisabled={numPages !== null && pageNumber >= numPages}
            onClick={() => nextPage()}
            size="small"
            type="next"
          />
        </Box>
      )}
    </MediaModalViewItemContent>
  );
};

export default FileView;

import React, { FC, useMemo } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { ReactComponent as AddIcon } from '../../../../../../../assets/Images/newGarage/garage-main-item/Add.svg';
import { MediaType } from '../../../../../../../shared/models/media.model';
import {
  SliderViewContainerWithDoc,
  SliderViewContainerWithoutDoc,
  SliderViewContentContainerWithoutDoc,
} from './SliderViewDocument.style';
import modalObserver from '../../../../../../../shared/utils/observers/modalObserver';
import { ModalNamesEnum } from '../../../../../../../shared/enums/modalNames.enum';

type PropsType = {
  imageText: string;
  document?: MediaType[] | null;
};

export const SliderViewDocument: FC<PropsType> = ({ imageText, document }) => {
  const theme = useTheme();

  const handleOpenViewModal = (documents: MediaType[], index?: number | undefined) => {
    modalObserver.addModal(ModalNamesEnum.mediaViewer, {
      props: {
        media: documents,
        activeMedia: index ? index : 0,
        onDelete: () => {},
        onUpdate: () => {},
        entityType: '',
        permission: { isDelete: false, isDownload: true, isUpdate: false },
      },
    });
  };

  const bgStyle = useMemo(() => {
    return `url(${
      !!document?.length ? document[0]?.additional_info.size_urls.gallery || document[0]?.url : ''
    }) lightgray 50% center / cover no-repeat`;
  }, [document]);

  return !document ? (
    <SliderViewContainerWithoutDoc>
      <SliderViewContentContainerWithoutDoc>
        <AddIcon />
        <Typography
          sx={{ color: theme.palette.case.neutral.n500, textAlign: 'center', maxWidth: '92px' }}
          variant="t10m"
        >
          {imageText}
        </Typography>
      </SliderViewContentContainerWithoutDoc>
    </SliderViewContainerWithoutDoc>
  ) : (
    <>
      <SliderViewContainerWithDoc onClick={() => handleOpenViewModal(document)}>
        <Box
          sx={{
            height: '76px',
            border: `1px solid ${theme.palette.case.neutral.n200}`,
            background: bgStyle,
            borderRadius: '4px',
          }}
        />
      </SliderViewContainerWithDoc>
      <Typography
        sx={{
          marginTop: '4px',
          color: theme.palette.case.neutral.n500,
          textAlign: 'start',
          display: 'inline-block',
          width: '100px',
        }}
        variant="t10m"
      >
        {imageText}
      </Typography>
    </>
  );
};

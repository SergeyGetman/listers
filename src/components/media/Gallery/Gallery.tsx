import React, { FC, memo, useCallback, useEffect, useState } from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import GallerySwiper from './GallerySwiper';
import MediaGallery from '../MediaGallery';
import { useAppDispatch } from '../../../shared/hooks/redux';
import { MediaType } from '../../../shared/models/media.model';
import { deleteMedia } from '../../../store/Common/commonThunk';
import { ModalNamesEnum } from '../../../shared/enums/modalNames.enum';
import { DocumentsEntityTypeEnum } from '../../../shared/enums/documentEntityType.enum';
import { PhotoEntityTypeEnum } from '../../../shared/enums/photoEntityType.enum';
import { setLoading } from '../../../store/Common/commonSlice';
import modalObserver from '../../../shared/utils/observers/modalObserver';

type GalleryProps = {
  media: MediaType[];
  maxPhotoLength?: number;
  placeholder?: string;
  maxHideView?: number;
  cropTitle?: string;
  title?: string;
  entityType?: DocumentsEntityTypeEnum | PhotoEntityTypeEnum;
  defaultActiveIndex?: number;
  isShowSwiper?: boolean;
  isCanAddMedia?: boolean;
  isShowGalleryPhotos?: boolean;
  isCanAddMediaFromClipboard?: boolean;
  onAddMedia: (files: MediaType[]) => void;
  onUpdate?: (file: MediaType[]) => void;
  isDeleteWithoutAutoSave?: boolean;
  isShowStub?: boolean;
  entity_id?: number | null;
  isSmallFilesWidth?: boolean;
  type?: 'gallery' | 'files';
  permission?: {
    isDelete?: boolean;
    isDownload?: boolean;
    isUpdate?: boolean;
  };
};

const Gallery: FC<GalleryProps> = ({
  maxPhotoLength = 18,
  maxHideView = 5,
  defaultActiveIndex = 0,
  media,
  cropTitle = '',
  placeholder,
  title = '',
  isShowSwiper = false,
  isShowGalleryPhotos = true,
  isCanAddMediaFromClipboard = true,
  onAddMedia,
  isDeleteWithoutAutoSave,
  onUpdate,
  type = 'gallery',
  isShowStub = true,
  isSmallFilesWidth = false,
  isCanAddMedia = true,
  entity_id = null,
  permission = { isDelete: true, isDownload: false, isUpdate: false },
  entityType,
}) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  const dispatch = useAppDispatch();
  const [activeIndex, setActiveIndex] = useState(defaultActiveIndex || 0);
  const [maxView, setMaxView] = useState(maxHideView);
  const [loadingFiles, setLoadingFiles] = useState<MediaType[]>([]);

  const setLoadingFile = useCallback((id: string, progress: number) => {
    setLoadingFiles((prev) =>
      prev.map((item) => {
        if (item.progressId === id) {
          return { ...item, progress };
        }
        return item;
      }),
    );
  }, []);

  const deleteLoadingFile = useCallback((id: string) => {
    setLoadingFiles((prev) => prev.filter((item) => item.progressId !== id));
  }, []);

  const handleDeleteItem = useCallback(
    (id: number, token: string, allMedia: MediaType[]) => {
      const deletedMedia: MediaType | undefined = allMedia.find((item) => item.id === id);
      const deletedMediaIndex = allMedia.findIndex((item) => item.id === id);
      const newMedia = allMedia.filter((item) => item.id !== id);
      onAddMedia(newMedia);
      setMaxView(newMedia.length);

      modalObserver.updateModalProps(ModalNamesEnum.mediaViewer, {
        props: { media: newMedia },
      });

      if (!isDeleteWithoutAutoSave) {
        dispatch(setLoading(true));

        dispatch(deleteMedia(token))
          .catch(() => {
            if (deletedMedia !== undefined) {
              const returnedMedia = [
                ...media.slice(0, deletedMediaIndex),
                deletedMedia,
                ...media.slice(deletedMediaIndex + 1),
              ];

              onAddMedia(returnedMedia);

              modalObserver.updateModalProps(ModalNamesEnum.mediaViewer, {
                props: {
                  media: returnedMedia,
                },
              });
            }
          })
          .finally(() => dispatch(setLoading(false)));
      }
    },
    [dispatch, media, onAddMedia, isDeleteWithoutAutoSave],
  );

  const handleShowMore = useCallback(() => {
    setMaxView(media.length);
  }, [media.length]);

  const handleHideMore = useCallback(() => {
    setMaxView(maxHideView);
    setActiveIndex(maxHideView - 1);
  }, [maxHideView]);

  useEffect(() => {
    if (activeIndex + 1 > maxView) {
      handleShowMore();
    }
  }, [activeIndex, handleShowMore, maxView]);

  const handleOpenViewModal = (isSmallGallery?: boolean, active?: number | undefined) => {
    if (isSmallGallery && (isShowSwiper === false || matches === false)) {
      modalObserver.addModal(ModalNamesEnum.mediaViewer, {
        props: {
          media,
          activeMedia: active !== undefined ? active : activeIndex,
          onDelete: handleDeleteItem,
          onUpdate,
          entityType,
          permission,
        },
      });
    }

    if (!!isSmallGallery === false) {
      modalObserver.addModal(ModalNamesEnum.mediaViewer, {
        props: {
          media,
          activeMedia: activeIndex,
          onDelete: handleDeleteItem,
          onUpdate,
          entityType,
          permission,
        },
      });
    }
  };

  return (
    <Box>
      {isShowSwiper && matches && type === 'gallery' && (
        <GallerySwiper
          images={media}
          selectedIndex={activeIndex}
          onChangeActiveIndex={(index) => setActiveIndex(index)}
          handleOpenViewModal={handleOpenViewModal}
        />
      )}
      {isShowGalleryPhotos && (
        <Box
          sx={{
            mt: isShowSwiper ? '16px' : '',
            pb: type === 'files' && media.length > 0 ? '20px' : '0',
          }}
        >
          <MediaGallery
            type={type}
            isShowSelectedIcon={isShowSwiper && matches}
            isShowSwiper={isShowSwiper}
            media={media}
            placeholder={placeholder}
            selectedIndex={activeIndex}
            isSmallFilesWidth={isSmallFilesWidth}
            onChangeActiveIndex={(index) => setActiveIndex(index)}
            maxView={maxView}
            entityType={entityType}
            maxHideView={maxHideView}
            onHideMore={handleHideMore}
            onShowMore={handleShowMore}
            maxPhotoLength={maxPhotoLength}
            onAddMedia={onAddMedia}
            addLoadingFile={(files) => setLoadingFiles(files)}
            changeLoadingFile={setLoadingFile}
            loadingFiles={loadingFiles}
            isShowStub={isShowStub}
            isCanAddMediaFromClipboard={isCanAddMediaFromClipboard}
            isCanAddMedia={isCanAddMedia}
            deleteLoadingFile={deleteLoadingFile}
            handleOpenViewModal={handleOpenViewModal}
            title={title}
            entity_id={entity_id}
            cropTitle={cropTitle}
            setMaxView={(count) => setMaxView(count)}
          />
        </Box>
      )}
    </Box>
  );
};

export default memo(Gallery);

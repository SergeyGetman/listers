import React, { FC, useCallback, useEffect, useRef } from 'react';
import { Grid, Typography, useTheme, Box } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTranslation } from 'react-i18next';
import MediaGalleryItemsContainer from './MediaGalleryItems/MediaGalleryPhotoItem';
import { GalleryPhotoContainer } from './MediaGallery.style';
import CircularButton from '../../buttons/CilrcularButton';
import { useAppDispatch } from '../../../shared/hooks/redux';
import { uploadMediaFile, uploadMediaPhoto } from '../../../store/Common/commonThunk';
import { MediaType } from '../../../shared/models/media.model';
import { NotificationService } from '../../../shared/services/notifications/SnackbarUtilsConfigurator/SnackbarUtilsConfigurator';
import useValidTypes from '../../../shared/hooks/useValidTypes';
import { ModalNamesEnum } from '../../../shared/enums/modalNames.enum';
import { DocumentsEntityTypeEnum } from '../../../shared/enums/documentEntityType.enum';
import { PhotoEntityTypeEnum } from '../../../shared/enums/photoEntityType.enum';
import modalObserver from '../../../shared/utils/observers/modalObserver';

const GALLERY_ITEM = {
  created_at: '',
  filename: '',
  id: 0,
  token: '',
  original_filename: '',
  url: '',
  additional_info: {
    in_progress: true,
    size_urls: {
      big_icon: '',
      gallery: '',
      middle_icon: '',
    },
    sizes: [],
  },
  progress: 0,
  progressId: 0,
};

type MediaGalleryProps = {
  media: MediaType[];
  selectedIndex: number;
  onChangeActiveIndex: (index: number) => void;
  maxView: number;
  isCanAddMedia: boolean;
  placeholder?: string;
  onShowMore: () => void;
  onHideMore: () => void;
  maxPhotoLength: number;
  title: string;
  cropTitle: string;
  onAddMedia: (file: MediaType[]) => void;
  isShowSelectedIcon: boolean;
  isSmallFilesWidth?: boolean;
  maxHideView: number;
  isShowStub: boolean;
  isShowSwiper: boolean;
  loadingFiles: MediaType[];
  addLoadingFile: (files: MediaType[]) => void;
  changeLoadingFile: (id: string, progress: number) => void;
  deleteLoadingFile: (id: string) => void;
  isCanAddMediaFromClipboard?: boolean;
  handleOpenViewModal: (isSmallGallery?: boolean, active?: number) => void;
  entityType?: DocumentsEntityTypeEnum | PhotoEntityTypeEnum;
  entity_id?: number | null;
  type: 'gallery' | 'files';
  setMaxView: (count: number) => void;
};

const MediaGallery: FC<MediaGalleryProps> = ({
  media,
  selectedIndex = 0,
  onChangeActiveIndex,
  maxView,
  onShowMore,
  placeholder,
  onHideMore,
  maxPhotoLength,
  onAddMedia,
  setMaxView,
  isShowSelectedIcon,
  maxHideView,
  loadingFiles,
  isShowStub,
  addLoadingFile,
  changeLoadingFile,
  deleteLoadingFile,
  handleOpenViewModal,
  isShowSwiper,
  title,
  cropTitle,
  type,
  isCanAddMedia = true,
  isSmallFilesWidth = false,
  entity_id = null,
  entityType,
  isCanAddMediaFromClipboard,
}) => {
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const theme = useTheme();
  const isSmallDisplay = useMediaQuery(`${theme.breakpoints.down('sm')}`);
  const { t } = useTranslation();
  const { validateMediaFormat, getAcceptedFormat } = useValidTypes();

  const deleteLoadingMedia = useCallback(
    (id: string, file?: MediaType) => {
      deleteLoadingFile(id);
      if (file !== undefined) {
        const newMedia = [file, ...media];
        onAddMedia(newMedia);
        if (maxView !== maxHideView) {
          setMaxView(newMedia.length);
        }
      }
    },
    [deleteLoadingFile, media, onAddMedia, maxView, maxHideView, setMaxView],
  );

  const handleSavePhoto = useCallback(
    (data: FormData, progressId: string) => {
      addLoadingFile([{ ...GALLERY_ITEM, progressId }, ...loadingFiles]);

      dispatch(
        uploadMediaPhoto(
          data,
          (progress) => changeLoadingFile(progressId, progress),
          (file) => deleteLoadingMedia(progressId, file),
        ),
      );
    },
    [dispatch, addLoadingFile, changeLoadingFile, deleteLoadingMedia, loadingFiles],
  );

  const handleSaveFile = useCallback(
    (data: FormData, progressId: string) => {
      addLoadingFile([{ ...GALLERY_ITEM, progressId }, ...loadingFiles]);

      dispatch(
        uploadMediaFile(
          data,
          (progress) => changeLoadingFile(progressId, progress),
          (file) => deleteLoadingMedia(progressId, file),
        ),
      );
    },
    [changeLoadingFile, dispatch, deleteLoadingMedia, addLoadingFile, loadingFiles],
  );

  const handleAddFile = (event: any) => {
    const loadingMediaItem = {
      id: uuidv4() || '',
      progress: 0,
      status: 'pending',
    };

    if (event.target.files[0].size > 15360000) {
      NotificationService.error(t('mediaGallery.errors.fileWeight'));
      return;
    }
    if (type === 'gallery') {
      if (!validateMediaFormat('photo', event.target.files[0].type)) {
        NotificationService.error(t('mediaGallery.errors.fileType'));
        return;
      }

      modalObserver.addModal(ModalNamesEnum.photoCrop, {
        props: {
          img: event.target.files[0],
          handleSavePhoto,
          loadingMediaId: loadingMediaItem.id,
          entityType: entityType,
          cropTitle: cropTitle || t('mediaGallery.crop.title'),
          entityId: entity_id,
        },
      });
    } else {
      if (!validateMediaFormat('file', event.target.files[0].type)) {
        NotificationService.error(t('mediaGallery.errors.fileType'));
        return;
      }
      const formData = new FormData();
      formData.append('file', event.target.files[0]);
      formData.append('entity_type', entityType || '');
      formData.append('entity_id', entity_id ? entity_id.toString() : '');
      handleSaveFile(formData, loadingMediaItem.id);
    }
  };

  const handleAddMediaFromClipboard = useCallback(
    (files: any) => {
      const loadingMediaItem = {
        id: uuidv4() || '',
        progress: 0,
        status: 'pending',
      };

      if (files[0].size > 15360000) {
        NotificationService.error(t('mediaGallery.errors.fileWeight'));
        return;
      }
      if (type === 'gallery') {
        if (!validateMediaFormat('photo', files[0].type)) {
          return;
        }

        modalObserver.addModal(ModalNamesEnum.photoCrop, {
          props: {
            img: files[0],
            handleSavePhoto,
            entityType: entityType,
            loadingMediaId: loadingMediaItem.id,
            cropTitle: cropTitle || t('mediaGallery.crop.title'),
          },
        });
      }
    },
    [cropTitle, handleSavePhoto, t, type, validateMediaFormat, entityType],
  );

  const getFile = useCallback(
    (e: any) => {
      const newFiles = Array.prototype.slice.call(e.clipboardData.files);
      if (isCanAddMedia && isCanAddMediaFromClipboard && maxPhotoLength > media.length) {
        handleAddMediaFromClipboard(newFiles);
      }
    },
    [handleAddMediaFromClipboard, isCanAddMedia, isCanAddMediaFromClipboard, maxPhotoLength, media.length],
  );

  useEffect(() => {
    window.addEventListener('paste', getFile);
    return () => {
      window.removeEventListener('paste', getFile);
    };
  }, [getFile]);

  return (
    <Box>
      {type === 'gallery' && [...loadingFiles, ...media].length === 0 && isShowStub && isShowSwiper ? (
        <Box
          sx={{
            height: '290px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          <Box
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}
          >
            <Typography sx={{ width: '244px', textAlign: 'center', mb: '36px' }} variant="extra_large">
              {title || t('mediaGallery.stubs.bigGalleryTitle')}
            </Typography>
            <input
              ref={inputRef}
              onChange={(e) => handleAddFile(e)}
              accept={type === 'gallery' ? getAcceptedFormat('photo') : getAcceptedFormat('file')}
              type="file"
              name="media"
              hidden
            />
            <CircularButton
              size="medium"
              onClick={() => {
                if (inputRef) {
                  inputRef.current?.click();
                }
              }}
            />
            <Typography variant="large_bolt" sx={{ textAlign: 'center', mt: '22px' }}>
              {t('mediaGallery.stubs.bigGallerySubtitle')}
            </Typography>
          </Box>
        </Box>
      ) : (
        <Grid container spacing="10px" alignItems="center">
          {maxPhotoLength > [...media, ...loadingFiles].length && isCanAddMedia && (
            <Grid
              item
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '63px',
                borderRight:
                  isShowStub === false || isShowSwiper ? '' : `1px solid ${theme.palette.case.neutral.n200}`,
                marginRight: isShowStub === false || isShowSwiper ? '' : '16px',
              }}
            >
              <GalleryPhotoContainer>
                <input
                  ref={inputRef}
                  onChange={(e) => handleAddFile(e)}
                  accept={type === 'gallery' ? getAcceptedFormat('photo') : getAcceptedFormat('file')}
                  type="file"
                  name="media"
                  hidden
                />
                <CircularButton
                  size="medium"
                  onClick={() => {
                    if (inputRef) {
                      inputRef.current?.click();
                    }
                  }}
                />
              </GalleryPhotoContainer>
            </Grid>
          )}

          {[...loadingFiles, ...media].length === 0 && isShowStub && type === 'files' && (
            <Grid
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '86px',
              }}
              item
              xs={8}
              sm={8}
            >
              <Typography
                variant={isSmallDisplay ? 'extra_small' : 'default'}
                sx={{ color: theme.palette.case.neutral.n400 }}
              >
                {placeholder ? placeholder : t('general.placeholders.documents')}
              </Typography>
            </Grid>
          )}

          {type === 'gallery' &&
            [...loadingFiles, ...media].length === 0 &&
            isShowStub &&
            isShowSwiper === false && (
              <Grid
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '86px',
                }}
                item
                xs={8}
                sm={8}
              >
                <Typography
                  variant={isSmallDisplay ? 'extra_small' : 'default'}
                  sx={{ color: theme.palette.case.neutral.n400 }}
                >
                  {placeholder ? placeholder : t('mediaGallery.stubs.smallGallery')}
                </Typography>
              </Grid>
            )}

          {[...loadingFiles, ...media].slice(0, maxView).map((item, index) => (
            <Grid key={item.id} item onClick={() => onChangeActiveIndex(index)}>
              <MediaGalleryItemsContainer
                media={item}
                index={index}
                isSelected={selectedIndex === index}
                isLastImage={index === maxView - 1}
                imageCount={media.length}
                maxView={maxView}
                isSmallFilesWidth={isSmallFilesWidth}
                isShowActionBtn={
                  maxHideView < media.length || (maxView === media.length && maxPhotoLength === media.length)
                }
                onShowMore={onShowMore}
                onHideMore={onHideMore}
                isShowSelectedIcon={isShowSelectedIcon}
                progress={item.progress}
                handleOpenViewModal={handleOpenViewModal}
                type={type}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default MediaGallery;

import React, { FC, useState, useCallback, useEffect, useRef } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { SwiperSlide } from 'swiper/react';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import CloudDownloadOutlinedIcon from '@mui/icons-material/CloudDownloadOutlined';
import UpdateOutlinedIcon from '@mui/icons-material/UpdateOutlined';
import { useTranslation } from 'react-i18next';
import { MediaModalViewContainer, MediaModalViewFooter } from './MediaModalContent.style';
import Slider from '../../Swiper/Swiper';
import PhotoView from './PhotoView/PhotoView';
import FileView from './FileView/FileView';
import MuiButton from '../../buttons/MuiButton';
import { useAppDispatch } from '../../../shared/hooks/redux';
import { downloadMediaFile, uploadMediaPhoto } from '../../../store/Common/commonThunk';
import { MediaType } from '../../../shared/models/media.model';
import useFixFileName from '../../../shared/hooks/useFixFileName';
import MuiTooltip from '../../MuiTooltip';
import useValidTypes from '../../../shared/hooks/useValidTypes';
import { NotificationService } from '../../../shared/services/notifications/SnackbarUtilsConfigurator/SnackbarUtilsConfigurator';
import { setLoading } from '../../../store/Common/commonSlice';
import { ModalNamesEnum } from '../../../shared/enums/modalNames.enum';
import { DocumentsEntityTypeEnum } from '../../../shared/enums/documentEntityType.enum';
import { PhotoEntityTypeEnum } from '../../../shared/enums/photoEntityType.enum';
import modalObserver from '../../../shared/utils/observers/modalObserver';

type MediaModalContentProps = {
  modalProps: {
    media: MediaType[];
    activeMedia?: number;
    onDelete?: (id: number, token: string, media: MediaType[]) => void;
    onUpdate?: (file: MediaType[]) => void;
    entityType?: DocumentsEntityTypeEnum | PhotoEntityTypeEnum;
    permission?: {
      isDelete?: boolean;
      isDownload?: boolean;
      isUpdate?: boolean;
    };
  };
  onClose: () => void;
};

const MediaModalContent: FC<MediaModalContentProps> = ({
  modalProps: {
    media,
    activeMedia = 0,
    permission = { isDelete: false, isDownload: false, isUpdate: false },
    onDelete,
    onUpdate,
    entityType,
  },
  onClose,
}) => {
  const [active, setActive] = useState<number>(activeMedia);
  const dispatch = useAppDispatch();
  const { fixFileName } = useFixFileName();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { validateMediaFormat, getAcceptedFormat } = useValidTypes();
  const { t } = useTranslation();
  const theme = useTheme();

  const handleIsFile = useCallback((mediaItem: MediaType) => {
    return mediaItem.original_filename.split('.')[1] === 'pdf' || !!mediaItem?.additional_info?.pdf_url;
  }, []);

  const handleDelete = () => {
    if (onDelete) {
      onDelete(media[active].id, media[active].token, media);
      onClose();
    }
  };

  const handleUpdate = (file: MediaType[]) => {
    dispatch(setLoading(false));
    if (onUpdate) {
      onUpdate(file);
    }
  };

  const handleSavePhoto = (data: FormData) => {
    dispatch(setLoading(true));
    if (onUpdate) {
      dispatch(
        uploadMediaPhoto(
          data,
          () => true,
          (file) => file && handleUpdate([file]),
        ),
      );
    }
  };

  const handleAddFile = (event: any) => {
    if (event.target.files[0].size > 15360000) {
      NotificationService.error(t('mediaGallery.errors.fileWeight'));
      return;
    }

    if (!validateMediaFormat('photo', event.target.files[0].type)) {
      NotificationService.error(t('mediaGallery.errors.fileType'));
      return;
    }

    modalObserver.addModal(ModalNamesEnum.photoCrop, {
      props: {
        img: event.target.files[0],
        entityType,
        isCropForBackground: entityType === PhotoEntityTypeEnum.background,
        handleSavePhoto,
        loadingMediaId: '1',
        cropTitle:
          entityType === PhotoEntityTypeEnum.background
            ? t('mediaGallery.crop.coverPhotoTitle')
            : t('mediaGallery.crop.profilePhotoTitle'),
      },
    });

    onClose();
  };

  const handleDownload = () => {
    dispatch(
      downloadMediaFile({
        token: media[active].token,
        isFile: handleIsFile(media[active]),
        original_filename: media[active].original_filename,
      }),
    );
  };

  useEffect(() => {
    if (media.length === 0) {
      onClose();
    }
  }, [media, onClose]);

  return (
    <Box sx={{ minHeight: '292px' }}>
      <MediaModalViewContainer>
        <Slider
          onChangeActiveIndex={(index) => setActive(index)}
          selectedIndex={active}
          allowTouchMove={false}
        >
          {media.map((item) => (
            <SwiperSlide key={item.id}>
              {handleIsFile(item) ? <FileView item={item} /> : <PhotoView item={item} />}
            </SwiperSlide>
          ))}
        </Slider>
      </MediaModalViewContainer>
      <MediaModalViewFooter>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            flexDirection: 'column',
          }}
        >
          <MuiTooltip title={media[active]?.original_filename} placement="bottom">
            <Typography variant="large_bolt" noWrap>
              {fixFileName(media[active]?.original_filename, 25, '..')}
            </Typography>
          </MuiTooltip>

          <Typography
            sx={{
              color: theme.palette.case.neutral.n400,
            }}
            variant="extra_small"
          >
            {t('mediaGallery.dateCreate')} {media[active]?.created_at}
          </Typography>
        </Box>
        <Box>
          {permission.isDelete && (
            <MuiButton
              onClick={handleDelete}
              label={t('general.buttons.delete')}
              size="small"
              variant="text"
              startIcon={<DeleteForeverOutlinedIcon color="error" />}
            />
          )}
          {permission.isDownload && (
            <MuiButton
              onClick={handleDownload}
              label={t('general.buttons.download')}
              size="small"
              variant="text"
              startIcon={<CloudDownloadOutlinedIcon color="primary" />}
            />
          )}
          {permission.isUpdate && (
            <>
              <input
                ref={inputRef}
                onChange={(e) => handleAddFile(e)}
                accept={getAcceptedFormat('photo')}
                type="file"
                name="media"
                hidden
              />
              <MuiButton
                onClick={() => {
                  if (inputRef) {
                    inputRef.current?.click();
                  }
                }}
                label={t('general.buttons.update')}
                size="small"
                variant="text"
                startIcon={<UpdateOutlinedIcon sx={{ color: theme.palette.case.main.purple.high }} />}
              />
            </>
          )}
        </Box>
      </MediaModalViewFooter>
    </Box>
  );
};

export default MediaModalContent;

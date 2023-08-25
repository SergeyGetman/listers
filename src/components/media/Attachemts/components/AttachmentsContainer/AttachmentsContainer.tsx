import React, { FC, useEffect, useRef } from 'react';
import { Box, Grid } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { useTranslation } from 'react-i18next';
import { DocumentsEntityTypeEnum } from '../../../../../shared/enums/documentEntityType.enum';
import { PhotoEntityTypeEnum } from '../../../../../shared/enums/photoEntityType.enum';
import { MediaType } from '../../../../../shared/models/media.model';
import { uploadMediaFile, uploadMediaPhoto } from '../../../../../store/Common/commonThunk';
import { useAppDispatch } from '../../../../../shared/hooks/redux';
import UploadFileContainer from '../../../../containers/UploadFileContainer';
import useValidTypes from '../../../../../shared/hooks/useValidTypes';
import { NotificationService } from '../../../../../shared/services/notifications/SnackbarUtilsConfigurator/SnackbarUtilsConfigurator';
import modalObserver from '../../../../../shared/utils/observers/modalObserver';
import { ModalNamesEnum } from '../../../../../shared/enums/modalNames.enum';
import AttachmentsItemCard from './components/AttachmentsItemCard';

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

export type AttachmentsContainerProps = {
  attachments: MediaType[];
  loadingAttachment: MediaType[];
  entityType?: DocumentsEntityTypeEnum | PhotoEntityTypeEnum;
  cropTitle?: string;
  maxAttachmentsLength: number;
  entity_id?: number | null;
  attachmentType: 'photo' | 'file';
  handleAddLoadingAttachment: (attachments: MediaType) => void;
  handleUpdateLoadingAttachment: (id: string, progress: number) => void;
  handleDeleteLoadingAttachment: (id: string) => void;
  onAddAsyncAttachment: (file: MediaType) => void;
  handleDeleteAttachment: (id: number, token: string, attachmentList: MediaType[]) => void;
  isCanAddMediaFromClipboard?: boolean;
  handleOpenViewModal(index?: number): void;
  isCanAddMedia?: boolean;
  permission?: {
    isDelete?: boolean;
    isDownload?: boolean;
    isUpdate?: boolean;
  };
  attachmentCardsGridConfig: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
  };
  attachmentCardsRowSpacingConfig: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
  };
  attachmentCardsColumnSpacingConfig: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
  };
};

const AttachmentsContainer: FC<AttachmentsContainerProps> = ({
  loadingAttachment,
  attachments,
  attachmentType,
  entityType,
  entity_id,
  cropTitle,
  isCanAddMedia,
  handleAddLoadingAttachment,
  handleUpdateLoadingAttachment,
  handleDeleteLoadingAttachment,
  onAddAsyncAttachment,
  attachmentCardsRowSpacingConfig,
  attachmentCardsColumnSpacingConfig,
  handleDeleteAttachment,
  permission,
  maxAttachmentsLength,
  handleOpenViewModal,
  attachmentCardsGridConfig,
  isCanAddMediaFromClipboard,
}) => {
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { validateMediaFormat, getAcceptedFormat } = useValidTypes();
  const { t } = useTranslation();
  const attachmentsLength = [...loadingAttachment, ...attachments].length;
  const deleteLoadingMedia = (id: string, file?: MediaType) => {
    handleDeleteLoadingAttachment(id);
    if (file !== undefined) {
      onAddAsyncAttachment(file);
    }
  };

  const handleSaveAttachments = (data: FormData, progressId: string, type: 'photo' | 'file' = 'photo') => {
    const attachedFile = data.get('file');
    if (attachedFile instanceof File) {
      const fileName = attachedFile.name;
      const fileSize = attachedFile.size;
      handleAddLoadingAttachment({
        ...GALLERY_ITEM,
        size: fileSize,
        original_filename: fileName,
        progressId,
      });
    } else {
      return;
    }

    if (type === 'photo') {
      dispatch(
        uploadMediaPhoto(
          data,
          (progress) => handleUpdateLoadingAttachment(progressId, progress),
          (file) => deleteLoadingMedia(progressId, file),
        ),
      );
    } else {
      dispatch(
        uploadMediaFile(
          data,
          (progress) => handleUpdateLoadingAttachment(progressId, progress),
          (file) => deleteLoadingMedia(progressId, file),
        ),
      );
    }
  };

  const handleAddFile = (attachment: any) => {
    const loadingItemId = uuidv4() || '';

    if (attachment.size > 15360000) {
      NotificationService.error(t('mediaGallery.errors.fileWeight'));
      return;
    }
    if (attachmentType === 'photo') {
      if (!validateMediaFormat('photo', attachment.type)) {
        NotificationService.error(t('mediaGallery.errors.fileType'));
        return;
      }

      modalObserver.addModal(ModalNamesEnum.photoCrop, {
        props: {
          img: attachment,
          handleSavePhoto: handleSaveAttachments,
          loadingMediaId: loadingItemId,
          entityType: entityType,
          cropTitle: cropTitle || t('mediaGallery.crop.title'),
          entityId: entity_id,
        },
      });
    } else {
      if (!validateMediaFormat('file', attachment.type)) {
        NotificationService.error(t('mediaGallery.errors.fileType'));
        return;
      }

      const formData = new FormData();
      formData.append('file', attachment);
      formData.append('entity_type', entityType || '');
      formData.append('entity_id', entity_id ? entity_id.toString() : '');
      handleSaveAttachments(formData, loadingItemId, 'file');
    }
  };

  const handleGetDataFromInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e?.target?.files) {
      const files = Array.from(e.target.files);
      if (attachmentType === 'file') {
        for (let i = 0; i < files.length; i++) {
          if (attachmentsLength + i >= maxAttachmentsLength) {
            NotificationService.error(t('mediaGallery.errors.maximumNumberOfFile'));
            break;
          }

          const file = files[i];
          handleAddFile(file);
        }
      } else {
        handleAddFile(files[0]);
      }

      if (inputRef?.current?.value) {
        inputRef.current.value = '';
      }
    }
  };

  const handleGetDataFromDrop = (e: React.DragEvent<HTMLDivElement>) => {
    if (e.dataTransfer.files) {
      const files = Array.from(e.dataTransfer.files);
      if (attachmentType === 'file') {
        for (let i = 0; i < files.length; i++) {
          if (attachmentsLength + i >= maxAttachmentsLength) {
            NotificationService.error(t('mediaGallery.errors.maximumNumberOfFile'));
            break;
          }
          const file = files[i];
          handleAddFile(file);
        }
      } else {
        handleAddFile(files[0]);
      }
    }
  };
  const handleGetMediaFromClipboard = (e: ClipboardEvent) => {
    if (e?.clipboardData?.files) {
      const files = Array.prototype.slice.call(e.clipboardData.files);
      if (attachmentType === 'file') {
        for (let i = 0; i < files.length; i++) {
          if (attachmentsLength + i >= maxAttachmentsLength) {
            NotificationService.error(t('mediaGallery.errors.maximumNumberOfFile'));
            break;
          }
          const file = files[i];
          handleAddFile(file);
        }
      } else {
        handleAddFile(files[0]);
      }
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getFile = (e: ClipboardEvent | any) => {
    if (isCanAddMedia && isCanAddMediaFromClipboard) {
      handleGetMediaFromClipboard(e);
    }
  };

  useEffect(() => {
    window.addEventListener('paste', getFile);
    return () => {
      window.removeEventListener('paste', getFile);
    };
  }, [getFile]);

  const onDeleteAttachment = (id: number, token: string) => {
    handleDeleteAttachment(id, token, attachments);
  };
  return (
    <Box>
      {!attachmentsLength && isCanAddMedia ? (
        <UploadFileContainer
          handleGetDataFromInputChange={handleGetDataFromInputChange}
          handleGetDataFromDrop={handleGetDataFromDrop}
          ref={inputRef}
          size="medium"
          isMultipleInput={attachmentType === 'file'}
          acceptedFormat={getAcceptedFormat(attachmentType)}
        />
      ) : (
        <></>
      )}

      {attachmentsLength ? (
        <Grid
          container
          columnSpacing={{
            xs: `${attachmentCardsColumnSpacingConfig.xs}px`,
            sm: `${attachmentCardsColumnSpacingConfig.sm}px`,
            md: `${attachmentCardsColumnSpacingConfig.md}px`,
            lg: `${attachmentCardsColumnSpacingConfig.lg}px`,
          }}
          rowSpacing={{
            xs: `${attachmentCardsRowSpacingConfig.xs}px`,
            sm: `${attachmentCardsRowSpacingConfig.sm}px`,
            md: `${attachmentCardsRowSpacingConfig.md}px`,
            lg: `${attachmentCardsRowSpacingConfig.lg}px`,
          }}
          alignItems="center"
        >
          <Grid
            xs={attachmentCardsGridConfig.xs}
            sm={attachmentCardsGridConfig.sm}
            md={attachmentCardsGridConfig.md}
            lg={attachmentCardsGridConfig.lg}
            sx={{ display: maxAttachmentsLength > attachmentsLength && isCanAddMedia ? 'block' : 'none' }}
            item
          >
            <UploadFileContainer
              handleGetDataFromInputChange={handleGetDataFromInputChange}
              handleGetDataFromDrop={handleGetDataFromDrop}
              ref={inputRef}
              isMultipleInput={attachmentType === 'file'}
              size="small"
              isFullWidth
              acceptedFormat={getAcceptedFormat(attachmentType)}
            />
          </Grid>

          {[...loadingAttachment, ...attachments].map((attachmentsItem, index) => (
            <Grid
              key={index}
              xs={attachmentCardsGridConfig.xs}
              sm={attachmentCardsGridConfig.sm}
              md={attachmentCardsGridConfig.md}
              lg={attachmentCardsGridConfig.lg}
              item
            >
              <AttachmentsItemCard
                onDeleteAttachment={onDeleteAttachment}
                handleOpenViewModal={handleOpenViewModal}
                index={index}
                isCanDelete={permission?.isDelete}
                attachmentsItem={attachmentsItem}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <></>
      )}
    </Box>
  );
};

export default AttachmentsContainer;

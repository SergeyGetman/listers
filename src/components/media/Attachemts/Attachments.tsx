import React, { FC, useCallback, useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { MediaType } from '../../../shared/models/media.model';
import { useAppDispatch } from '../../../shared/hooks/redux';
import { setLoading } from '../../../store/Common/commonSlice';
import { deleteMedia } from '../../../store/Common/commonThunk';
import { DocumentsEntityTypeEnum } from '../../../shared/enums/documentEntityType.enum';
import { PhotoEntityTypeEnum } from '../../../shared/enums/photoEntityType.enum';
import AttachmentsContainer from './components/AttachmentsContainer';
import modalObserver from '../../../shared/utils/observers/modalObserver';
import { ModalNamesEnum } from '../../../shared/enums/modalNames.enum';
type AttachmentsProps = {
  attachmentType: 'photo' | 'file';
  entity_id?: number | null;
  entityType?: DocumentsEntityTypeEnum | PhotoEntityTypeEnum;
  attachments: MediaType[];
  maxAttachmentsLength?: number;
  handleAddAttachment: (attachments: MediaType[]) => void;
  handelUpdateAttachment?: (attachments: MediaType[]) => void;
  isDeleteWithAutoSave?: boolean;
  isCanAddMediaFromClipboard?: boolean;
  isCanAddMedia?: boolean;
  permission?: {
    isDelete?: boolean;
    isDownload?: boolean;
    isUpdate?: boolean;
  };
  attachmentCardsGridConfig?: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
  };
  attachmentCardsColumnSpacingConfig?: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
  };
  attachmentCardsRowSpacingConfig?: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
  };
};
const Attachments: FC<AttachmentsProps> = ({
  attachmentType = 'photo',
  attachments,
  entity_id,
  maxAttachmentsLength = 5,
  handleAddAttachment,
  handelUpdateAttachment,
  isDeleteWithAutoSave = false,
  isCanAddMedia = true,
  entityType,
  permission = { isDelete: true, isDownload: true, isUpdate: false },
  attachmentCardsGridConfig = { xs: 12, sm: 6, md: 4, lg: 4 },
  attachmentCardsColumnSpacingConfig = { xs: 12, sm: 16, md: 24, lg: 24 },
  attachmentCardsRowSpacingConfig = { xs: 12, sm: 16, md: 24, lg: 24 },
  isCanAddMediaFromClipboard = true,
}) => {
  const dispatch = useAppDispatch();
  const [loadingAttachment, setLoadingAttachment] = useState<MediaType[]>([]);
  const [newAttachments, setNewAttachments] = useState<MediaType[]>(attachments);
  const handleUpdateLoadingAttachment = (id: string, progress: number) => {
    setLoadingAttachment((prev) =>
      prev.map((item) => {
        if (item.progressId === id) {
          return { ...item, progress };
        }
        return item;
      }),
    );
  };

  const handleDeleteLoadingAttachment = (id: string) => {
    setLoadingAttachment((prev) => prev.filter((item) => item.progressId !== id));
  };

  const handleAddLoadingAttachment = (newLoadingAttachment: MediaType) => {
    setLoadingAttachment((prevState) => {
      return [newLoadingAttachment, ...prevState];
    });
  };

  const handleDeleteAttachment = useCallback(
    (id: number, token: string, attachmentList: MediaType[]) => {
      const deletedMedia: MediaType | undefined = attachmentList.find((item) => item.id === id);
      const deletedMediaIndex = attachmentList.findIndex((item) => item.id === id);
      const newMedia = attachmentList.filter((item) => item.id !== id);

      if (isDeleteWithAutoSave) {
        dispatch(setLoading(true));
        dispatch(deleteMedia(token))
          .then(() => {
            setNewAttachments(newMedia);
          })
          .catch(() => {
            if (deletedMedia !== undefined) {
              const returnedMedia = [
                ...attachmentList.slice(0, deletedMediaIndex),
                deletedMedia,
                ...attachmentList.slice(deletedMediaIndex + 1),
              ];

              setNewAttachments(returnedMedia);
            }
          })
          .finally(() => dispatch(setLoading(false)));
      } else {
        setNewAttachments(newMedia);
      }
    },
    [isDeleteWithAutoSave, dispatch, setNewAttachments],
  );
  useEffect(() => {
    handleAddAttachment(newAttachments);
  }, [handleAddAttachment, newAttachments]);

  const onAddAsyncAttachment = async (file: MediaType) => {
    await setNewAttachments((prevAttachments) => [file, ...prevAttachments]);
  };

  const handleOpenViewModal = (index?: number | undefined) => {
    modalObserver.addModal(ModalNamesEnum.mediaViewer, {
      props: {
        media: attachments,
        activeMedia: index ? index : 0,
        onDelete: handleDeleteAttachment,
        onUpdate: handelUpdateAttachment,
        entityType,
        permission,
      },
    });
  };

  return (
    <Box sx={{ width: '100%' }}>
      <AttachmentsContainer
        attachments={attachments}
        loadingAttachment={loadingAttachment}
        entity_id={entity_id}
        permission={permission}
        isCanAddMedia={isCanAddMedia}
        isCanAddMediaFromClipboard={isCanAddMediaFromClipboard}
        entityType={entityType}
        attachmentCardsColumnSpacingConfig={attachmentCardsColumnSpacingConfig}
        attachmentCardsRowSpacingConfig={attachmentCardsRowSpacingConfig}
        handleOpenViewModal={handleOpenViewModal}
        maxAttachmentsLength={maxAttachmentsLength}
        handleDeleteLoadingAttachment={handleDeleteLoadingAttachment}
        handleUpdateLoadingAttachment={handleUpdateLoadingAttachment}
        handleDeleteAttachment={handleDeleteAttachment}
        handleAddLoadingAttachment={handleAddLoadingAttachment}
        attachmentType={attachmentType}
        onAddAsyncAttachment={onAddAsyncAttachment}
        attachmentCardsGridConfig={attachmentCardsGridConfig}
      />
    </Box>
  );
};

export default Attachments;

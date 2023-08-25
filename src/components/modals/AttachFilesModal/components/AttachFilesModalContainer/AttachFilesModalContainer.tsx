import React, { FC, useCallback, useState } from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import ModalHeader from '../../../../headers/ModalHeader';
import { BaseConfirmModalContainer } from '../../../confirmModals/BaseConfirmModal/BaseConfirmModal.style';
import ModalFooter from '../../../../modalsElements/containers/Footer/ModalFooter';
import Attachments from '../../../../media/Attachemts';
import { DocumentsEntityTypeEnum } from '../../../../../shared/enums/documentEntityType.enum';
import { MediaType } from '../../../../../shared/models/media.model';
import MuiDefaultDrawerHeader from '../../../../modalsElements/containers/MuiDrawer/MuiDrawersHeders/MuiDefaultDrawerHeader';
type AttachFilesModalContainerProps = {
  title: string;
  onClose: () => void;
  documents?: MediaType[];
  handleConfirm: (attachments: MediaType[]) => void;
  maxAttachmentsLength?: number;
  isCanAddMedia?: boolean;
};
const AttachFilesModalContainer: FC<AttachFilesModalContainerProps> = ({
  title,
  onClose,
  handleConfirm,
  documents,
  maxAttachmentsLength,
  isCanAddMedia,
}) => {
  const { t } = useTranslation();
  const [isShowConfirmLoader, setIsShowConfirmLoader] = useState<boolean>(false);
  const [attachments, setAttachments] = useState<MediaType[]>(documents ? documents : []);
  const handleAddAttachment = useCallback((newMedia: MediaType[]) => {
    setAttachments(newMedia);
  }, []);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const handleUpload = () => {
    if (handleConfirm) {
      setIsShowConfirmLoader(true);
      Promise.resolve()
        .then(() => handleConfirm(attachments))
        .then(() => onClose())
        .finally(() => setIsShowConfirmLoader(false));
    }
  };

  return isMobile ? (
    <Box
      display="flex"
      width="100%"
      height="100%"
      flexDirection="column"
      sx={{
        overflow: 'scroll',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
        '& ::-webkit-scrollbar': {
          width: '0px !important',
        },
      }}
    >
      <MuiDefaultDrawerHeader
        isShowCloseBtn={false}
        isRoundCloseButton
        onClose={() => (onClose ? onClose() : true)}
        title={title}
      />
      <Box
        mt="20px"
        p="0 16px"
        width="100%"
        sx={{
          flexGrow: 1,
        }}
      >
        <Box mb="16px" width="100%" display="flex" justifyContent="center">
          <Attachments
            maxAttachmentsLength={maxAttachmentsLength}
            attachmentType="file"
            isCanAddMedia={isCanAddMedia}
            attachments={attachments}
            handleAddAttachment={handleAddAttachment}
            entityType={DocumentsEntityTypeEnum.todo_document}
            permission={{ isDelete: isCanAddMedia, isDownload: true, isUpdate: false }}
            attachmentCardsColumnSpacingConfig={{ xs: 11, sm: 11, md: 11, lg: 11 }}
            attachmentCardsGridConfig={{ xs: 6, sm: 6, md: 4, lg: 4 }}
          />
        </Box>
      </Box>
      <ModalFooter
        isShow
        isSpaceBetweenBtn
        middleBtnProps={{
          isShow: true,
          fullWidth: true,
          label: t('general.buttons.cancel'),
          variant: 'outlined',
          onClick: () => onClose(),
        }}
        rightBtnProps={{
          isShow: !!isCanAddMedia,
          fullWidth: true,
          isLoadingBtn: true,
          label: t('general.buttons.save'),
          variant: 'contained',
          loading: isShowConfirmLoader,
          onClick: () => handleUpload(),
        }}
      />
    </Box>
  ) : (
    <>
      <BaseConfirmModalContainer
        sx={{ overflowY: 'scroll', pt: 0, position: 'relative', maxHeight: '500px' }}
      >
        <Box
          sx={{
            position: 'sticky',
            zIndex: 10,
            top: 0,
            borderRadius: '5px',
            backgroundColor: theme.palette.case.contrast.white,
          }}
        >
          <ModalHeader title={title} onClose={onClose} />
        </Box>

        <Box sx={{ width: '100%', padding: '24px' }}>
          <Attachments
            maxAttachmentsLength={maxAttachmentsLength}
            attachmentType="file"
            attachments={attachments}
            isCanAddMedia={isCanAddMedia}
            handleAddAttachment={handleAddAttachment}
            entityType={DocumentsEntityTypeEnum.todo_document}
            permission={{ isDelete: isCanAddMedia, isDownload: true, isUpdate: false }}
            attachmentCardsColumnSpacingConfig={{ xs: 12, sm: 16, md: 16, lg: 16 }}
            attachmentCardsGridConfig={{ xs: 12, sm: 6, md: 4, lg: 4 }}
          />
        </Box>
      </BaseConfirmModalContainer>
      <ModalFooter
        isBottomRounded
        position="initial"
        middleBtnProps={{
          isShow: true,
          label: t('general.buttons.cancel'),
          variant: 'outlined',
          onClick: () => onClose(),
        }}
        rightBtnProps={{
          isShow: !!isCanAddMedia,
          isLoadingBtn: true,
          label: t('general.buttons.save'),
          variant: 'contained',
          loading: isShowConfirmLoader,
          onClick: () => handleUpload(),
        }}
      />
    </>
  );
};

export default AttachFilesModalContainer;

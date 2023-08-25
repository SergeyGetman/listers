import { Box, Collapse, Grid, useMediaQuery, useTheme } from '@mui/material';
import TextareaAutosize from 'react-textarea-autosize';
import React, {
  ClipboardEventHandler,
  FC,
  KeyboardEventHandler,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import { v4 as uuidv4 } from 'uuid';
import { useTranslation } from 'react-i18next';
import SendIcon from '@mui/icons-material/Send';
import { Controller, useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import MuiSquare from '../../buttons/MuiSquareButton';
import {
  ChatInputButtonContainer,
  ChatInputContainer,
  ChatInputInputContainer,
  ChatInputTextField,
} from './ChatForm.style';
import useValidTypes from '../../../shared/hooks/useValidTypes';
import ChatInputFileElement from './FileElement/ChatInputFileElement';
import { MediaType } from '../../../shared/models/media.model';
import { useAppDispatch, useAppSelector } from '../../../shared/hooks/redux';
import { uploadMediaFile } from '../../../store/Common/commonThunk';
import { ModalNamesEnum } from '../../../shared/enums/modalNames.enum';
import EditMessage from './Edit/EditMessage';
import { NotificationService } from '../../../shared/services/notifications/SnackbarUtilsConfigurator/SnackbarUtilsConfigurator';
import EmojiPicker from '../../formElements/EmojiPicker';
import MuiLoadingButton from '../../buttons/MuiLoadingButton';
import { useDebounce } from '../../../shared/hooks/useDebounce';
import AvatarContainer from '../../avatars/AvatarContainer';
import { DocumentsEntityTypeEnum } from '../../../shared/enums/documentEntityType.enum';
import modalObserver from '../../../shared/utils/observers/modalObserver';

const LOADIN_FILE = {
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
      middle_icon: '',
    },
    sizes: [],
  },
  progress: undefined,
  progressId: 0,
};

const defaultState = { message: '', files: [] };

type NewMessageType = {
  message: string;
  files: MediaType[];
};

type Props = {
  onSendMessage: (message: NewMessageType) => void;
  isEdit?: boolean;
  isShowFormLoader?: boolean;
  onCloseEdit?: () => void;
  isShowAvatar?: boolean;
  onEditMessage?: (data: NewMessageType, messageId: number) => void;
  typing?: (isTyping: boolean) => void;
  fileEntityType: DocumentsEntityTypeEnum;
  isClipboardFiles?: boolean;
  editState?: {
    message?: string;
    files?: MediaType[];
    messageId: number;
  };
};

const ChatForm: FC<Props> = ({
  onSendMessage,
  isEdit = false,
  editState,
  isShowFormLoader = false,
  isShowAvatar = true,
  isClipboardFiles = true,
  onCloseEdit,
  onEditMessage,
  typing,
  fileEntityType,
}) => {
  const { data } = useAppSelector(({ profile }) => profile);
  const theme = useTheme();
  const match = useMediaQuery(theme.breakpoints.down('sm'));
  const { id: threadId, type } = useParams();
  const fileRef = useRef<HTMLInputElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const { getAcceptedFormat, validateMediaFormat } = useValidTypes();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [showEmoji, setShowEmoji] = useState<boolean>(false);
  const [isTyping, setIsTyping] = useState(false);
  const { control, setValue, reset, watch, handleSubmit } = useForm<NewMessageType>({
    defaultValues: defaultState,
  });

  useEffect(() => {
    setValue('message', defaultState.message);
    setValue('files', defaultState.files);
  }, [threadId, setValue, type]);

  const isDisabledButton = useCallback((files: MediaType[]) => {
    if (files.length > 0) {
      return !files.every((file) => file.progress === undefined);
    }
    return false;
  }, []);

  const onSend = useCallback(
    async (form: NewMessageType) => {
      if (isShowFormLoader) return;
      if (isDisabledButton(watch('files'))) return;

      if (isEdit === false) {
        if (form.message.trim() !== '' || form.files.length > 0) {
          if (form.message.length > 5000) {
            const countMessages = Math.ceil(form.message.length / 5000);
            const messageData = form;
            reset(defaultState);
            for (let i = 0; i < countMessages; i++) {
              // eslint-disable-next-line no-await-in-loop
              await onSendMessage({
                ...messageData,
                files: i === 0 ? messageData.files : [],
                message: messageData.message.slice(i * 5000, i * 5000 + 5000),
              });
            }
            reset(defaultState);
            return;
          }

          onSendMessage(form);
        }
      }
      if (onEditMessage && isEdit) {
        if (form.message.trim() !== '' || form.files.length > 0) {
          onEditMessage(form, editState?.messageId as number);
        }
      }
      reset(defaultState);
    },
    [
      editState?.messageId,
      isDisabledButton,
      isEdit,
      isShowFormLoader,
      onEditMessage,
      onSendMessage,
      reset,
      watch,
    ],
  );

  const handleChangeProgress = useCallback(
    (progressId: string, progress: number) => {
      setValue(
        'files',
        watch('files').map((file) => {
          if (file.progressId === progressId) {
            return { ...file, progress };
          }
          return file;
        }),
      );
    },
    [setValue, watch],
  );

  const deleteLoadingMedia = useCallback(
    (progressId: string, file?: MediaType) => {
      if (file !== undefined) {
        setValue(
          'files',
          watch('files').map((item) => {
            if (item.progressId === progressId) {
              return { ...file, progressId, progress: undefined };
            }
            return item;
          }),
        );
      } else {
        setValue(
          'files',
          watch('files').filter((item) => item.progressId !== progressId),
        );
      }
    },
    [setValue, watch],
  );

  const handleDeleteFile = (id: number, token: string, oldMedia: MediaType[]) => {
    const newMedia = oldMedia.filter((file) => file.id !== id);
    setValue('files', newMedia);
    modalObserver.updateModalProps(ModalNamesEnum.mediaViewer, {
      props: { media: newMedia, onDelete: handleDeleteFile },
    });
  };

  const handleOpenViewModal = (active?: number) => {
    modalObserver.addModal(ModalNamesEnum.mediaViewer, {
      props: {
        media: watch('files'),
        activeMedia: active,
        entityType: fileEntityType,
        onDelete: handleDeleteFile,
        permission: { isDownload: true, isDelete: true },
      },
    });
  };

  const handleAddFile = useCallback(
    (inputFiles: FileList | null) => {
      if (!inputFiles) return;
      const loadingFile: MediaType[] = [];
      for (let i = 0; i < inputFiles.length; i += 1) {
        if (!validateMediaFormat('file', inputFiles[i].type)) {
          NotificationService.error(t('mediaGallery.errors.fileTypeItem', { fileName: inputFiles[i].name }));
        } else {
          const loadingFileItem = {
            ...LOADIN_FILE,
            progressId: uuidv4() || '',
            original_filename: inputFiles[i].name,
          };
          const formData = new FormData();
          formData.append('file', inputFiles[i]);
          formData.append('entity_type', fileEntityType);
          dispatch(
            uploadMediaFile(
              formData,
              (progress) => handleChangeProgress(loadingFileItem.progressId, progress),
              (file) => deleteLoadingMedia(loadingFileItem.progressId, file),
            ),
          );
          loadingFile.push(loadingFileItem);
        }
      }
      setValue('files', [...watch('files'), ...loadingFile]);
    },
    [
      deleteLoadingMedia,
      dispatch,
      handleChangeProgress,
      setValue,
      t,
      validateMediaFormat,
      watch,
      fileEntityType,
    ],
  );

  const onPress: KeyboardEventHandler<HTMLTextAreaElement> = useCallback(
    (e) => {
      const keyCode = e.which || e.keyCode;

      if (keyCode === 13 && e.ctrlKey) {
        setValue('message', `${watch('message')}\n`);
      }

      if (keyCode === 13 && !e.ctrlKey && !e.shiftKey && !match) {
        e.preventDefault();
        handleSubmit(onSend)();
        if (inputRef?.current) {
          inputRef.current.focus();
        }
      }
    },
    [handleSubmit, onSend, setValue, watch, match],
  );

  const handlePaste: ClipboardEventHandler<HTMLTextAreaElement> = (event) => {
    if (event.clipboardData.files[0]) {
      event.preventDefault();
    }
  };

  const handleCloseEdit = () => {
    reset(defaultState);
    if (onCloseEdit) {
      onCloseEdit();
    }
  };

  const getFile = useCallback(
    (e: ClipboardEvent) => {
      if (e.clipboardData?.files && isClipboardFiles) {
        const newFiles = Array.prototype.slice.call(e.clipboardData.files);
        handleAddFile(newFiles as unknown as FileList);
      }
    },
    [handleAddFile, isClipboardFiles],
  );

  const debounceTyping = useDebounce(() => {
    typing?.(false);
    setIsTyping(false);
  }, 1000);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (!isTyping) {
        typing?.(true);
        setIsTyping(true);
      }

      debounceTyping();

      setValue('message', event.currentTarget.value);
    },
    [debounceTyping, isTyping, setValue, typing],
  );

  useEffect(() => {
    window.addEventListener('paste', getFile as EventListener);
    return () => {
      window.removeEventListener('paste', getFile as EventListener);
    };
  }, [getFile]);

  useEffect(() => {
    if (isEdit) {
      reset({ message: editState?.message || '', files: editState?.files || [] });
    }
  }, [editState?.files, editState?.message, isEdit, reset]);

  const isDisableSend = useMemo(() => {
    return !!watch('files')?.filter((file) => !!file.progress === true).length;
  }, [watch]);

  return (
    <form onSubmit={handleSubmit(onSend)}>
      <ChatInputContainer>
        <Collapse in={isEdit}>
          <EditMessage message={editState?.message} closeEdit={handleCloseEdit} />
        </Collapse>
        <ChatInputInputContainer>
          {isShowAvatar && (
            <Box>
              <AvatarContainer
                id={data?.id}
                firstName={data?.first_name}
                lastName={data?.last_name}
                size="small"
                isOwner={false}
                src={data?.avatar?.additional_info?.size_urls?.avatar_icon || data?.avatar?.url || ''}
              />
            </Box>
          )}

          <ChatInputTextField sx={{ ml: '13px', flexGrow: 1 }}>
            <Controller
              control={control}
              name="message"
              render={({ field }) => (
                <TextareaAutosize
                  {...field}
                  ref={inputRef}
                  onChange={handleChange}
                  className="custom-text-area"
                  placeholder={t('general.placeholders.message')}
                  onPaste={handlePaste}
                  minRows={1}
                  maxRows={8}
                  disabled={false}
                  // maxLength={4999}
                  onKeyPress={onPress}
                />
              )}
            />
          </ChatInputTextField>
          <Box
            sx={{
              display: 'flex',
            }}
          >
            <ChatInputButtonContainer>
              <MuiSquare
                icon={<AttachFileIcon />}
                size="small"
                type="button"
                variant={match ? 'text' : 'outlined'}
                onClick={() => {
                  if (fileRef) {
                    fileRef.current?.click();
                  }
                }}
              />
              <input
                ref={fileRef}
                onChange={(e) => handleAddFile(e.target.files)}
                accept={getAcceptedFormat('file')}
                type="file"
                multiple
                max={10}
                name="media"
                hidden
              />
            </ChatInputButtonContainer>
            <ChatInputButtonContainer>
              <EmojiPicker
                anchorOriginVertical="top"
                anchorOriginHorizontal="center"
                transformOriginHorizontal="center"
                transformOriginVertical="bottom"
                onSelect={(emoji) => {
                  if ('native' in emoji) {
                    setValue('message', watch('message') + emoji.native);
                  }
                }}
              >
                <MuiSquare
                  onClick={() => setShowEmoji(!showEmoji)}
                  icon={<InsertEmoticonIcon />}
                  variant={match ? 'text' : 'outlined'}
                  type="button"
                  size="small"
                />
              </EmojiPicker>
            </ChatInputButtonContainer>
            <ChatInputButtonContainer>
              {match ? (
                <MuiSquare
                  icon={<SendIcon />}
                  size="small"
                  type="submit"
                  isDisabled={isDisableSend}
                  variant="contained"
                />
              ) : (
                <MuiLoadingButton
                  label={isEdit ? 'Save' : 'Send'}
                  loading={isShowFormLoader}
                  type="submit"
                  isStopPropagation={false}
                  isDisabled={isDisabledButton(watch('files')) || isDisableSend}
                  variant="contained"
                  size="medium"
                />
              )}
            </ChatInputButtonContainer>
          </Box>
        </ChatInputInputContainer>
        <Collapse in={watch('files')?.length !== 0}>
          <Box sx={{ maxHeight: '50px', p: '0 10px 10px', overflowY: 'auto' }}>
            <Box
              sx={{
                borderTop: `1px solid ${theme.palette.case.contrast.gray3}`,
                paddingTop: '10px',
              }}
            >
              <Grid spacing="7px" container>
                {watch('files')?.map((file, index) => (
                  <Grid key={file.progressId} item>
                    <ChatInputFileElement item={file} showFile={() => handleOpenViewModal(index)} />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Box>
        </Collapse>
      </ChatInputContainer>
    </form>
  );
};

export default memo(ChatForm);

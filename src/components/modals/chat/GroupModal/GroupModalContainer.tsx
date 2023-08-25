import { Box, CircularProgress, Collapse } from '@mui/material';
import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined';
import { Controller, useForm } from 'react-hook-form';
import { TransitionGroup } from 'react-transition-group';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import i18next from 'i18next';
import MuiBaseTextFiled from '../../../formElements/MuiBaseTextFiled';
import ModalFooter from '../../../modalsElements/containers/Footer/ModalFooter';
import MuiDefaultDrawerHeader from '../../../modalsElements/containers/MuiDrawer/MuiDrawersHeders/MuiDefaultDrawerHeader';
import { AddGroupAvatarContainer, GroupModalContainerBox } from './GroupModalContainer.styled';
import { useAppDispatch, useAppSelector } from '../../../../shared/hooks/redux';
import { getFriends, uploadMediaPhoto } from '../../../../store/Common/commonThunk';
import { AssignPeopleChatModel } from '../../../../shared/models/assignPeopleSelectValue.model';
import { MediaType } from '../../../../shared/models/media.model';
import { ItemUserModel } from '../../../../shared/models/itemUser.model';
import { NotificationService } from '../../../../shared/services/notifications/SnackbarUtilsConfigurator/SnackbarUtilsConfigurator';
import useValidTypes from '../../../../shared/hooks/useValidTypes';
import { ModalNamesEnum } from '../../../../shared/enums/modalNames.enum';
import {
  createGroupChat,
  deleteGroupChat,
  inviteToGroupChat,
  kickFromGroupChat,
  leaveGroupChat,
  updateGroupThread,
} from '../../../../store/chat/chatThunk';
import { ThreadModel } from '../../../../shared/models/chat/chat.model';
import router from '../../../../shared/services/router';
import ChatAssignUserItem from './ChatAssignUserItem';
import { ReactComponent as AssignPeopleIcon } from '../../../../assets/Images/sidebar/profile.svg';
import MuiSelect from '../../../formElements/MuiSelect';
import { deleteThreadsItem } from '../../../../store/chat/chatSlice';
import errorsHandler from '../../../../shared/functions/errorsHandler';
import { PhotoEntityTypeEnum } from '../../../../shared/enums/photoEntityType.enum';
import MuiAvatar from '../../../avatars/MuiAvatart';
import modalObserver from '../../../../shared/utils/observers/modalObserver';

type Props = {
  onClose: (value?: boolean) => void;
  thread: ThreadModel | null;
  setIsShowUnsavedDataModal: (value: boolean) => void;
};

type FormValues = {
  subject: string;
  media: MediaType | null;
  participants: AssignPeopleChatModel[];
};

const GALLERY_ITEM = {
  created_at: '',
  filename: '',
  id: 0,
  original_filename: '',
  url: '',
  token: '',
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

const schema = yup.object().shape({
  subject: yup
    .string()
    .required(
      i18next.t('validation.title.required', {
        field: i18next.t('general.fieldNames.title'),
      }),
    )
    .min(2, i18next.t('validation.title.min'))
    .max(
      36,
      i18next.t('validation.general.max', {
        field: i18next.t('general.fieldNames.title'),
        count: 36,
      }),
    ),
  participants: yup
    .array()
    .min(2, i18next.t('validation.participants.min', { count: 2 }))
    .required(
      i18next.t('validation.title.required', {
        field: i18next.t('general.fieldNames.subject'),
      }),
    ),
});

const GroupModalContainer: FC<Props> = ({ onClose, thread, setIsShowUnsavedDataModal }) => {
  const dispatch = useAppDispatch();
  const profile = useAppSelector((state) => state.profile.data);
  const [isLoading, setIsLoading] = useState(false);
  const [friends, setFriends] = useState<AssignPeopleChatModel[]>([]);
  const [createLoading, setCreateLoading] = useState(false);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();
  const { getAcceptedFormat, validateMediaFormat } = useValidTypes();

  const { t } = useTranslation();

  const permissionType = useMemo(() => {
    if ((thread && thread.owner_id === profile.id) || thread === null) {
      return 'edit';
    }
    return 'view';
  }, [profile.id, thread]);

  const chatOwner = useMemo(() => {
    if (thread) {
      const threadOwner = thread.users.find((user) => user.id === thread.owner_id);

      if (threadOwner)
        return {
          ...threadOwner,
          isOwner: true,
          value: threadOwner.id,
          label: threadOwner.full_name || '',
        };
    }
    return {
      avatar: profile.avatar,
      connection_role: '',
      contacts: null,
      first_name: profile.first_name,
      full_name: profile.full_name,
      entity_type: '',
      last_name: profile.last_name,
      id: profile.id,
      is_fake: 0,
      role: null,
      isOwner: true,
      value: profile.id,
      label: profile.full_name || '',
    };
  }, [profile, thread]);

  const initialValues = {
    subject: thread ? thread?.subject || '' : '',
    media: thread ? thread?.avatar || null : null,
    participants: thread
      ? [
          chatOwner,
          ...(thread.users
            .map((item) => ({
              ...item,
              value: item.id,
              label: item.full_name || '',
            }))
            .filter((item) => item.id !== chatOwner.id) as AssignPeopleChatModel[]),
        ]
      : [chatOwner],
  };

  const {
    handleSubmit,
    watch,
    control,
    setValue,
    setError,
    reset,
    formState: { errors, isDirty },
  } = useForm<FormValues>({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormValues) => {
    if (thread === null) {
      const newData = {
        ...data,
        avatar: data.media?.id ? { id: data.media?.id } : null,
        participants: data.participants
          .map((item) => ({
            id: item.id,
          }))
          .filter((item) => item.id !== profile.id),
      };

      dispatch(createGroupChat({ data: newData, setFormLoading: (val) => setCreateLoading(val) })).then(
        (result) => {
          if (createGroupChat.fulfilled.match(result)) {
            NotificationService.success(t('chat.toasts.created'));
            reset();
            onClose(true);
            navigate(`${router.chat.path}/${router.chat.children.group.path}/${result.payload.id}`);
          } else {
            errorsHandler(result, setError);
          }
        },
      );
      return;
    }
    const editData = {
      subject: data.subject,
      avatar: data.media?.id ? { id: data.media?.id } : null,
    };
    dispatch(
      updateGroupThread({
        data: editData,
        id: thread.id,
        setFormLoading: (val) => setCreateLoading(val),
        thread,
      }),
    ).then((result) => {
      if (updateGroupThread.fulfilled.match(result)) {
        NotificationService.success(t('chat.toasts.update'));
        onClose(true);
        reset({
          subject: result.payload.subject,
          media: result.payload.avatar,
          participants: watch('participants'),
        });
      }
    });
  };

  const setFriendsData = (data: ItemUserModel[]) => {
    const newData = data.map((item) => ({
      ...item,
      value: item.id,
      label: item.full_name || '',
    }));

    setFriends(newData);
  };

  const getFriendsData = useCallback(() => {
    dispatch(getFriends({ setLoading: (val) => setIsLoading(val) })).then((result) => {
      if (getFriends.fulfilled.match(result)) {
        setFriendsData(result.payload);
      }
    });
  }, [dispatch]);

  const handleDeleteUser = (id: number, name?: string) => {
    modalObserver.addModal(ModalNamesEnum.baseConfirmModal, {
      props: {
        title: t('general.modals.unsavedData.title'),
        text: t('chat.confirmModals.removeUserFromGroupChat', { name }),
        cancelBtnText: t('general.buttons.cancel'),
        confirmBtnText: t('general.buttons.confirm'),
        handleConfirm: () => {
          const newData = watch('participants').filter((item) => item.id !== id);
          setValue('participants', newData);
          if (thread) {
            dispatch(kickFromGroupChat(id, thread.id));
          }
        },
      },
    });
  };

  const handleLeaveMySelf = () => {
    if (thread) {
      modalObserver.addModal(ModalNamesEnum.baseConfirmModal, {
        props: {
          title: t('general.modals.unsavedData.title'),
          text: t('chat.confirmModals.removeMyself'),
          cancelBtnText: t('general.buttons.cancel'),
          confirmBtnText: t('general.buttons.confirm'),
          handleConfirm: () =>
            dispatch(leaveGroupChat(thread.id)).then(() => {
              navigate(`${router.chat.path}/${router.chat.children.group.path}`);
              dispatch(deleteThreadsItem(thread.id));
              onClose(true);
            }),
        },
      });
    }
  };
  const handleDeleteChat = () => {
    if (thread) {
      modalObserver.addModal(ModalNamesEnum.baseConfirmModal, {
        props: {
          title: t('general.modals.unsavedData.title'),
          text: t('chat.confirmModals.deleteChat'),
          cancelBtnText: t('general.buttons.cancel'),
          confirmBtnText: t('general.buttons.confirm'),
          handleConfirm: () =>
            dispatch(deleteGroupChat(thread.id)).then(() => {
              navigate(`${router.chat.path}/${router.chat.children.group.path}`);
              dispatch(deleteThreadsItem(thread.id));
              onClose();
            }),
        },
      });
    }
  };

  const handleSavePhoto = useCallback(
    (data: FormData, progressId: string) => {
      setValue('media', { ...GALLERY_ITEM, progressId });
      dispatch(
        uploadMediaPhoto(
          data,
          (progress: number) => setValue('media', { ...(watch('media') as MediaType), progress }),
          (file) => setValue('media', file ? { ...(file as MediaType), progress: 100 } : null),
        ),
      );
    },
    [dispatch, setValue, watch],
  );

  const handleOpenChat = (id: number) => {
    onClose();
    navigate(`${router.chat.path}/${router.chat.children.private.path}/${id}`);
  };

  const handleAddFile = useCallback(
    (inputFile: any) => {
      if (!validateMediaFormat('photo', inputFile.type)) {
        NotificationService.error(t('mediaGallery.errors.fileTypeItem', { fileName: inputFile.name }));
      } else {
        modalObserver.addModal(ModalNamesEnum.photoCrop, {
          props: {
            img: inputFile,
            handleSavePhoto,
            loadingMediaId: uuidv4() || '',
            cropTitle: t('mediaGallery.crop.title'),
            entityType: PhotoEntityTypeEnum.thread_avatar,
          },
        });
      }
    },
    [handleSavePhoto, t, validateMediaFormat],
  );

  const handleChangeAssignPeople = (value: AssignPeopleChatModel[]) => {
    if (value.findIndex((item) => item.id === chatOwner.id) === -1) {
      return;
    }
    if (thread === null) {
      setValue('participants', value);
    }
    if (thread) {
      if (value.length < watch('participants').length) return;
      dispatch(inviteToGroupChat(value[value.length - 1].id, thread.id));
      setValue('participants', value);
    }
  };

  const handleDeleteFile = useCallback(() => {
    setValue('media', null);
  }, [setValue]);

  const handleOpenViewFileModal = useCallback(() => {
    modalObserver.addModal(ModalNamesEnum.mediaViewer, {
      props: {
        media: [watch('media')],
        activeMedia: 0,
        onDelete: handleDeleteFile,
        onUpdate: (files: MediaType[]) => setValue('media', files[0]),
        entityType: PhotoEntityTypeEnum.thread_avatar,
        permission: {
          isDownload: true,
          isDelete: profile.id === chatOwner.id,
          isUpdate: profile.id === chatOwner.id,
        },
      },
    });
  }, [chatOwner.id, handleDeleteFile, profile.id, setValue, watch]);

  const handleRenderAvatar = useMemo(() => {
    if (watch('media') === null && permissionType === 'edit') {
      return (
        <AddGroupAvatarContainer
          onClick={() => {
            if (fileRef) {
              fileRef.current?.click();
            }
          }}
        >
          <AddAPhotoOutlinedIcon
            sx={(theme) => ({
              color: theme.palette.case.contrast.white,
              fontSize: '40px',
            })}
          />
          <input
            ref={fileRef}
            onChange={(e: any) => handleAddFile(e.target.files[0])}
            accept={getAcceptedFormat('photo')}
            type="file"
            max={10}
            name="media"
            hidden
          />
        </AddGroupAvatarContainer>
      );
    }
    if (!!watch('media')?.id) {
      return (
        <Box onClick={handleOpenViewFileModal} sx={{ width: '80px', height: '80px', cursor: 'pointer' }}>
          <MuiAvatar
            variant="rounded"
            firstName={thread?.subject}
            lastName={thread?.subject[1]}
            src={watch('media')?.additional_info?.size_urls?.middle_icon || watch('media')?.url || ''}
            id={thread?.id || 0}
            size="chatGroupAvatar"
          />
        </Box>
      );
    }
    if (watch('media')?.id === 0 && permissionType === 'edit') {
      return (
        <Box
          sx={{
            width: '80px',
            height: '80px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CircularProgress variant="determinate" value={watch('media')?.progress} />
        </Box>
      );
    }
    return (
      <MuiAvatar
        variant="rounded"
        firstName={thread?.subject}
        lastName={thread?.subject[1]}
        src={thread?.avatar?.additional_info?.size_urls?.middle_icon || thread?.avatar?.url || ''}
        id={thread?.id || 0}
        size="chatGroupAvatar"
      />
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getAcceptedFormat, handleAddFile, handleOpenViewFileModal, permissionType, thread, watch('media')]);

  useEffect(() => {
    setIsShowUnsavedDataModal(isDirty);
  }, [isDirty, setIsShowUnsavedDataModal]);

  useEffect(() => {
    getFriendsData();
  }, [getFriendsData]);

  return (
    <form style={{ height: '100%' }} onSubmit={handleSubmit(onSubmit)}>
      <GroupModalContainerBox>
        <MuiDefaultDrawerHeader
          isEditMode={permissionType === 'edit' && !!thread}
          onClose={onClose}
          title={thread ? thread?.subject : 'Create group chat'}
        />
        <Box
          sx={{
            flexGrow: 1,
            p: '30px 10px 0',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              width: '100%',
            }}
          >
            {handleRenderAvatar}

            {permissionType === 'edit' && (
              <Box sx={{ flexGrow: 1, ml: '20px', pt: '5px' }}>
                <Controller
                  name="subject"
                  control={control}
                  render={({ field }) => (
                    <MuiBaseTextFiled
                      label={t('general.fieldNames.title')}
                      placeholder={t('general.placeholders.enter_title')}
                      maxL
                      isError={!!errors.subject?.message}
                      errorMessage={errors.subject?.message}
                      {...field}
                    />
                  )}
                />
              </Box>
            )}
          </Box>
          <Box sx={{ mt: '40px' }}>
            <Controller
              name="participants"
              control={control}
              render={({ field, fieldState }) => (
                <MuiSelect
                  {...field}
                  isLoading={isLoading}
                  options={friends}
                  isMulti
                  isSearchable
                  isShowAvatarInOptions
                  startIcon={<AssignPeopleIcon sx={{ svg: { width: '20px' } }} />}
                  controlShouldRenderValue={false}
                  placeholder={t('general.placeholders.selectAMember')}
                  label={t('general.fieldNames.inviteToGroupChat')}
                  isError={!!fieldState.error?.message}
                  helpText={fieldState.error?.message}
                  onChange={(value) => handleChangeAssignPeople(value)}
                />
              )}
            />
          </Box>
          <TransitionGroup>
            {watch('participants').map((item) => (
              <Collapse key={item.id}>
                <ChatAssignUserItem
                  user={item}
                  profileId={profile.id}
                  handleOpenChat={handleOpenChat}
                  handleDeleteUser={handleDeleteUser}
                  permissionType={permissionType}
                  threadId={thread?.id || null}
                  handleLeave={handleLeaveMySelf}
                />
              </Collapse>
            ))}
          </TransitionGroup>
        </Box>
        <ModalFooter
          isShow
          middleBtnProps={{
            isShow: thread !== null,
            color: 'secondary',
            isDisabled: createLoading,
            label:
              thread?.owner_id === profile.id
                ? t('general.buttons.deleteChat')
                : t('general.buttons.leaveGroup'),
            onClick: () => (thread?.owner_id === profile.id ? handleDeleteChat() : handleLeaveMySelf()),
          }}
          rightBtnProps={{
            isShow: permissionType === 'edit',
            isStopPropagation: false,
            loading: createLoading,
            label: t('general.buttons.save'),
            variant: 'contained',
            isLoadingBtn: true,
            isDisabled: watch('media') !== null && watch('media')?.id === 0,
            type: 'submit',
          }}
        />
      </GroupModalContainerBox>
    </form>
  );
};

export default GroupModalContainer;

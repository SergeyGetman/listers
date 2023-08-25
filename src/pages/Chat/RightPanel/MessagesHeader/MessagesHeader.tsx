import { Box, Skeleton, Typography } from '@mui/material';
import React, { FC, useCallback, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import { shallowEqual } from 'react-redux';
import BaseActionMenu from '../../../../components/actionMenus/BaseActionMenu';
import { ModalNamesEnum } from '../../../../shared/enums/modalNames.enum';
import { useAppDispatch, useAppSelector } from '../../../../shared/hooks/redux';
import { ThreadModel } from '../../../../shared/models/chat/chat.model';
import { ChatRightPanelHeaderContainer } from './MessagesHeader.style';
import { clearThreadHistory, deleteGroupChat, leaveGroupChat } from '../../../../store/chat/chatThunk';
import router from '../../../../shared/services/router';
import { clearMessagesHistory, deleteThreadsItem } from '../../../../store/chat/chatSlice';
import AvatarContainer from '../../../../components/avatars/AvatarContainer';
import modalObserver from '../../../../shared/utils/observers/modalObserver';

type Props = { thread: ThreadModel | null; userId: number; isGlobalHeader?: boolean };

const MessagesHeader: FC<Props> = ({ thread, userId, isGlobalHeader = false }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const profile = useAppSelector((state) => state.profile.data, shallowEqual);
  const { type } = useParams();

  const ownerThread = useMemo(() => {
    if (thread) return thread.all_users.find((user) => user.id !== userId);
    return null;
  }, [thread, userId]);

  const handleLeaveFromChat = useCallback(() => {
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
            }),
        },
      });
    }
  }, [dispatch, navigate, t, thread]);

  const handleClearThreadHistory = useCallback(() => {
    if (thread) {
      modalObserver.addModal(ModalNamesEnum.baseConfirmModal, {
        props: {
          title: t('general.modals.unsavedData.title'),
          text: t('chat.confirmModals.clearChatHistory'),
          cancelBtnText: t('general.buttons.cancel'),
          confirmBtnText: t('general.buttons.confirm'),
          handleConfirm: () =>
            dispatch(clearThreadHistory(thread.id)).then(() => {
              dispatch(clearMessagesHistory());
            }),
        },
      });
    }
  }, [dispatch, t, thread]);

  const handleDeleteChat = useCallback(() => {
    if (thread) {
      modalObserver.addModal(ModalNamesEnum.baseConfirmModal, {
        props: {
          title: t('general.modals.unsavedData.title'),
          text: t('chat.confirmModals.deleteChat'),
          cancelBtnText: t('general.buttons.cancel'),
          confirmBtnText: t('general.buttons.confirm'),
          handleConfirm: () =>
            dispatch(deleteGroupChat(thread?.id)).then(() => {
              navigate(`${router.chat.path}/${router.chat.children.group.path}`);
              dispatch(deleteThreadsItem(thread.id));
            }),
        },
      });
    }
  }, [dispatch, navigate, t, thread]);

  const menuList = useMemo(() => {
    const menu = [];

    if (type === 'group') {
      menu.push({
        label:
          thread?.owner_id === profile?.id
            ? t('general.buttons.editChatInfo')
            : t('general.buttons.viewChatInfo'),
        callback: () =>
          modalObserver.addModal(ModalNamesEnum.groupChatModal, {
            props: {
              thread,
            },
          }),
      });
      if (thread?.owner_id === profile?.id) {
        menu.push({
          label: t('general.buttons.deleteChat'),
          callback: () => handleDeleteChat(),
        });
      }
      menu.push({
        label: t('general.buttons.leaveGroup'),
        callback: () => handleLeaveFromChat(),
      });
    } else {
      menu.push({
        label: t('general.buttons.clearChat'),
        callback: () => handleClearThreadHistory(),
      });
    }

    return menu;
  }, [handleClearThreadHistory, handleDeleteChat, handleLeaveFromChat, profile?.id, t, thread, type]);

  return (
    <ChatRightPanelHeaderContainer isGlobalHeader={isGlobalHeader}>
      {thread === null ? (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Skeleton variant="circular" height={29} width={29} />
          <Box sx={{ display: 'flex', flexDirection: 'column', marginLeft: '12px' }}>
            <Skeleton sx={{ borderRadius: '5px' }} variant="text" height={19} width={150} />
            {type !== 'group' && (
              <Skeleton sx={{ borderRadius: '5px', mt: '2px' }} variant="text" height={16} width={40} />
            )}
          </Box>
        </Box>
      ) : (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <AvatarContainer
            variant={type === 'group' ? 'rounded' : 'circular'}
            firstName={
              type === 'group'
                ? thread.subject
                : thread.is_support || thread.is_system
                ? thread.subject
                : ownerThread?.first_name || ''
            }
            lastName={type === 'group' ? thread.subject[1] : ownerThread?.last_name || ''}
            src={
              type === 'group'
                ? thread.avatar?.additional_info?.size_urls?.middle_icon || thread?.avatar?.url || ''
                : thread.avatar?.additional_info?.size_urls?.avatar_icon || thread?.avatar?.url || ''
            }
            id={
              thread.is_support || thread.is_system || type === 'group'
                ? thread.id || 0
                : ownerThread?.id || 0
            }
            size="small"
          />
          <Box sx={{ display: 'flex', flexDirection: 'column', marginLeft: '12px' }}>
            <Typography variant="small_bolt">{thread.subject}</Typography>
            {type !== 'group' && (
              <Typography
                sx={(theme) => ({
                  maxWidth: '120px',
                  marginTop: '2px',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  color: theme.palette.case.neutral.n400,
                })}
                variant="extra_small"
              >
                {thread?.users[1]?.connection_role ? thread?.users[1]?.connection_role : ''}
              </Typography>
            )}
          </Box>
        </Box>
      )}

      {thread && thread.is_system === false && <BaseActionMenu iconSize="medium" menuList={menuList} />}
    </ChatRightPanelHeaderContainer>
  );
};

export default MessagesHeader;

/* eslint-disable react/no-unstable-nested-components */

import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { Box } from '@mui/material';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { Scrollbars } from 'react-custom-scrollbars';
import MuiDefaultDrawerHeader from '../../../modalsElements/containers/MuiDrawer/MuiDrawersHeders/MuiDefaultDrawerHeader';
import { useAppDispatch, useAppSelector } from '../../../../shared/hooks/redux';
import {
  editMessage,
  editReplyMessage,
  getGlobalChatCounters,
  getReplays,
  getThreadCounter,
  getThreadUnreadReplies,
  handleDeleteMessage,
  handleDeleteReplyMessage,
  removeReplyReaction,
  sendReplyMessage,
  setReplyReaction,
} from '../../../../store/chat/chatThunk';
import { MediaType } from '../../../../shared/models/media.model';
import { MessageModel } from '../../../../shared/models/chat/chat.model';
import SocketConnect from '../../../../shared/services/socket';
import {
  chatSocketReplyMessageCreate,
  chatSocketReplyMessageDelete,
  chatSocketReplyMessageUpdate,
  ChatSocketType,
} from '../../../../store/chat/chatSockets';
import useDocumentHeight from '../../../../shared/hooks/useDocumentHeight';
import {
  addPendinReplygMessage,
  clearReplyState,
  removePendingReplyMessage,
  setSeenReplyButton,
} from '../../../../store/chat/chatSlice';
import { ModalNamesEnum } from '../../../../shared/enums/modalNames.enum';
import { DocumentsEntityTypeEnum } from '../../../../shared/enums/documentEntityType.enum';
import modalObserver from '../../../../shared/utils/observers/modalObserver';
import ChatMessage from '../../../../pages/Chat/components/ChatMessage';
import ChatMessageSkeleton from '../../../../pages/Chat/components/ChatMessage/Skeleton';
import ChatForm from '../../../forms/ChatForm/ChatForm';

type Props = {
  onClose: () => void;
  replyId: string;
  threadId: string;
};

type EditState = {
  message?: string;
  files?: MediaType[];
  messageId: number;
};

const ReplyModelContainer: FC<Props> = ({ onClose, replyId, threadId }) => {
  const { reply } = useAppSelector((state) => state.chat);

  const { thread } = useAppSelector((state) => state.chat);
  const pendingMessages = useAppSelector((state) => state.chat.pendingReplyMessages);
  const dispatch = useAppDispatch();
  const skeletonArray = Array(10).fill('');
  const listRef = useRef<any>();
  const fixHeight = useDocumentHeight();
  const [isEditMessage, setIsEditMessage] = useState<boolean>(false);
  const [editMessageData, setEditMessageData] = useState<EditState>({ message: '', files: [], messageId: 0 });
  const [isAutoScroll, setIsAutoScroll] = useState(false);
  const [loading, setLoading] = useState(false);
  const userId = useAppSelector((state) => state.profile.data?.id);
  const [isEditMainMessage, setIsEditMainMessage] = useState(false);

  const { t } = useTranslation();

  const handleSentMessage = async (data: { message: string; files: MediaType[] }) => {
    if (threadId) {
      // setSendLoading(true);
      const message: MessageModel = {
        count_replays: null,
        created_at: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
        edited_at: null,
        id: Number(moment().format('x')),
        last_reply: null,
        media: [],
        myEmoji: null,
        reactions: [],
        replay_id: null,
        replayed_user_id: null,
        sender: userId,
        status: 'pending',
        user_id: userId,
        body: data.message,
      };
      await dispatch(addPendinReplygMessage(message));
      listRef?.current?.scrollToBottom();

      dispatch(
        sendReplyMessage({
          message: data.message,
          files: data.files,
          threadId: +threadId,
          replayId: +replyId,
        }),
      ).then((res) => {
        if (sendReplyMessage.fulfilled.match(res)) {
          dispatch(removePendingReplyMessage(message.pendingId as string));
        }

        listRef?.current?.scrollToBottom();
      });
      // .then(() => setSendLoading(false));
    }
  };

  const handleCloseEdit = () => {
    setIsEditMessage(false);
    setEditMessageData({ message: '', files: [], messageId: 0 });
    setIsEditMainMessage(false);
  };

  const handleSendEditedMessage = (data: { message: string; files: MediaType[] }, messageId: number) => {
    if (isEditMainMessage) {
      dispatch(editMessage({ ...data, messageId }));
    } else {
      dispatch(editReplyMessage({ ...data, messageId }));
    }
    handleCloseEdit();
    setIsEditMainMessage(false);
  };

  const handleEditMainMessage = (message: MessageModel) => {
    setEditMessageData({ message: message.body, files: message.media, messageId: message.id });
    setIsEditMessage(true);
    setIsEditMainMessage(true);
  };

  const handleDeleteMainMessage = useCallback(
    (message: MessageModel) => {
      modalObserver.addModal(ModalNamesEnum.baseConfirmModal, {
        props: {
          title: t('general.modals.deleteMessage.title'),
          text: t('general.modals.deleteMessage.text'),
          cancelBtnText: t('general.buttons.cancel'),
          confirmBtnText: t('general.buttons.confirm'),
          handleConfirm: () => {
            dispatch(handleDeleteMessage(message.id));
            onClose();
            if (editMessageData.messageId === message.id) {
              setIsEditMessage(false);
              setEditMessageData({ message: '', files: [], messageId: 0 });
            }
          },
        },
      });
    },
    [dispatch, editMessageData.messageId, onClose, t],
  );

  const handleEditMessage = (message: MessageModel) => {
    setEditMessageData({ message: message.body, files: message.media, messageId: message.id });
    setIsEditMessage(true);
  };

  const onDeleteMessage = (message: MessageModel) => {
    modalObserver.addModal(ModalNamesEnum.baseConfirmModal, {
      props: {
        title: t('general.modals.deleteMessage.title'),
        text: t('general.modals.deleteMessage.text'),
        cancelBtnText: t('general.buttons.cancel'),
        confirmBtnText: t('general.buttons.confirm'),
        handleConfirm: () => {
          dispatch(handleDeleteReplyMessage(message.id));
        },
      },
    });
  };

  const handleAddReaction = (message: MessageModel, emoji: string) => {
    if (emoji !== message.myEmoji?.emoji) {
      dispatch(setReplyReaction({ messageId: message.id, data: { emoji } }));
    } else {
      dispatch(removeReplyReaction(message));
    }
  };

  const getItems = useCallback(
    (height: number) => {
      if (replyId) {
        dispatch(getReplays(+replyId))
          .then(() => setLoading(false))
          .then(() => listRef.current.scrollTop(listRef.current.view.scrollHeight - height));
      }
    },
    [dispatch, replyId],
  );

  const handleShowFile = (index: number, media: MediaType[]) => {
    modalObserver.addModal(ModalNamesEnum.mediaViewer, {
      props: {
        media,
        activeMedia: index,
        permission: {
          isDelete: false,
          isUpdate: false,
          isDownload: true,
        },
      },
    });
  };

  useEffect(() => {
    Promise.resolve()
      .then(() =>
        dispatch(getReplays(+replyId)).then((result) => {
          if (getReplays.rejected.match(result)) {
            onClose();
          }
        }),
      )
      .then(() => listRef.current.scrollToBottom())
      .then(() => {
        dispatch(getThreadCounter(+threadId));
        dispatch(getGlobalChatCounters());
        dispatch(getThreadUnreadReplies(+threadId));
        dispatch(setSeenReplyButton(+replyId));
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (replyId !== null) {
      const messagesReply = SocketConnect.connect.private(`messages.${replyId}`);
      SocketConnect.setChannel(`messages.${replyId}`, messagesReply);
      messagesReply
        .listen('.message.reply.created', (event: ChatSocketType) =>
          dispatch(chatSocketReplyMessageCreate(event)),
        )
        .listen('.message.reply.updated', (event: ChatSocketType) =>
          dispatch(chatSocketReplyMessageUpdate(event)),
        )
        .listen('.message.reply.deleted', (event: ChatSocketType) =>
          dispatch(chatSocketReplyMessageDelete(event)),
        );
    }
    return () => {
      dispatch(clearReplyState());
      SocketConnect.connect.leave(`private-messages.${replyId}`);
      SocketConnect.removeChannel(`private-messages.${replyId}`);
    };
  }, [dispatch, replyId]);

  const onMessagesListScroll = useCallback(
    (value: any) => {
      setIsAutoScroll(false);
      if (value.top === 0) {
        if (threadId && reply.isStopPagination === false && reply.data.length > 0 && loading === false) {
          setLoading(true);
          getItems(value.scrollHeight as number);
        }
      }
      if (value.top === 1) {
        setIsAutoScroll(true);
      }
    },
    [getItems, threadId, loading, reply.data.length, reply.isStopPagination],
  );

  useEffect(() => {
    if (isAutoScroll) {
      listRef?.current?.scrollToBottom();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reply.data]);
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: fixHeight,
      }}
    >
      <MuiDefaultDrawerHeader onClose={onClose} title="Reply in Thread" />
      <Box
        id="reply-user-scroll"
        sx={{
          flexGrow: 1,
          overflow: 'auto',
          display: 'flex',
          flexDirection: 'column',
          marginTop: '20px',
          // flexDirection: 'column-reverse',
        }}
      >
        {reply.message && thread.data ? (
          <Scrollbars
            ref={listRef}
            style={{
              height: '100%',
              position: 'relative',
              overflowY: 'scroll',
              scrollbarWidth: 'none',
              flexGrow: '3',
              marginBottom: '0px !important',
              padding: 0,
            }}
            onScrollFrame={onMessagesListScroll}
            renderView={(props: any) => (
              <div
                {...props}
                style={{
                  position: 'absolute',
                  overflowY: 'scroll',
                  scrollbarWidth: 'none',
                  width: '100%',
                  height: '100%',
                  padding: 0,
                }}
              />
            )}
            renderTrackHorizontal={(props: any) => <div {...props} style={{ display: 'none' }} />}
            renderTrackVertical={(props: any) => <div {...props} style={{ display: 'none !impotent' }} />}
            thumbSize={0}
          >
            {reply.message && thread.data && reply.isStopPagination && (
              <ChatMessage
                timeFormat="full"
                isReply={false}
                isShowReply={false}
                isPin={false}
                isShowReadMessage={false}
                handleShowFile={handleShowFile}
                message={reply.message}
                threadUsers={thread.data?.all_users || []}
                userId={userId}
                handleDelete={handleDeleteMainMessage}
                handleEdit={handleEditMainMessage}
                isEdit={
                  reply.message.user_id === userId &&
                  moment(moment().format('YYYY-MM-DD HH:mm:ss')).isBefore(
                    moment.utc(reply.message?.created_at).local().add(1, 'day').format('YYYY-MM-DD HH:mm:ss'),
                  )
                }
                isDelete={
                  reply.message?.user_id === userId &&
                  moment(moment().format('YYYY-MM-DD HH:mm:ss')).isBefore(
                    moment.utc(reply.message?.created_at).local().add(1, 'day').format('YYYY-MM-DD HH:mm:ss'),
                  )
                }
                width={100}
                setEmoji={(emoji) => handleAddReaction(reply.message as MessageModel, emoji)}
              />
            )}
            <Box
              sx={(theme) => ({
                pl: '60px',
                [theme.breakpoints.down('sm')]: {
                  pl: '30px',
                },
              })}
            >
              {reply.isStopPagination === false && <ChatMessageSkeleton size="small" />}

              {reply.data.map((message, index) => (
                <ChatMessage
                  key={index}
                  timeFormat="full"
                  isReply={false}
                  isPin={false}
                  isShowReadMessage={false}
                  isShowReply={false}
                  handleShowFile={handleShowFile}
                  isEdit={
                    message.user_id === userId &&
                    moment(moment().format('YYYY-MM-DD HH:mm:ss')).isBefore(
                      moment.utc(message?.created_at).local().add(1, 'day').format('YYYY-MM-DD HH:mm:ss'),
                    )
                  }
                  isDelete={
                    message?.user_id === userId &&
                    moment(moment().format('YYYY-MM-DD HH:mm:ss')).isBefore(
                      moment.utc(message?.created_at).local().add(1, 'day').format('YYYY-MM-DD HH:mm:ss'),
                    )
                  }
                  handleEdit={handleEditMessage}
                  handleDelete={onDeleteMessage}
                  message={message}
                  threadUsers={thread.data?.all_users || []}
                  userId={userId}
                  avatarSize="small"
                  width={95}
                  setEmoji={(emoji) => handleAddReaction(message, emoji)}
                />
              ))}
              {pendingMessages.map((message, index) => (
                <ChatMessage
                  key={index}
                  timeFormat="full"
                  isReply={false}
                  isPin={false}
                  isShowReadMessage={false}
                  isShowReply={false}
                  handleShowFile={handleShowFile}
                  isEdit={
                    message.user_id === userId &&
                    moment(moment().format('YYYY-MM-DD HH:mm:ss')).isBefore(
                      moment.utc(message?.created_at).local().add(1, 'day').format('YYYY-MM-DD HH:mm:ss'),
                    )
                  }
                  isDelete={
                    message?.user_id === userId &&
                    moment(moment().format('YYYY-MM-DD HH:mm:ss')).isBefore(
                      moment.utc(message?.created_at).local().add(1, 'day').format('YYYY-MM-DD HH:mm:ss'),
                    )
                  }
                  handleEdit={handleEditMessage}
                  handleDelete={onDeleteMessage}
                  message={message}
                  threadUsers={thread.data?.all_users || []}
                  userId={userId}
                  avatarSize="small"
                  width={95}
                  setEmoji={(emoji) => handleAddReaction(message, emoji)}
                />
              ))}
            </Box>
          </Scrollbars>
        ) : (
          <Box
            sx={(theme) => ({
              pl: '60px',
              [theme.breakpoints.down('sm')]: {
                pl: '30px',
              },
            })}
          >
            {skeletonArray.map((_, index) => (
              <ChatMessageSkeleton size="small" key={index} />
            ))}
          </Box>
        )}
      </Box>

      <Box
        sx={(theme) => ({
          [theme.breakpoints.up('sm')]: {
            p: '10px',
          },
        })}
      >
        <ChatForm
          fileEntityType={DocumentsEntityTypeEnum.message_document}
          isShowFormLoader={reply.message === null}
          onSendMessage={handleSentMessage}
          isEdit={isEditMessage}
          onCloseEdit={handleCloseEdit}
          onEditMessage={handleSendEditedMessage}
          editState={editMessageData}
        />
      </Box>
    </Box>
  );
};

export default ReplyModelContainer;

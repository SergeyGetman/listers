import { Box, Collapse, useMediaQuery, useTheme } from '@mui/material';
import React, { memo, useCallback, useEffect } from 'react';
import { useParams } from 'react-router';
import { shallowEqual } from 'react-redux';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';

import { useAppDispatch, useAppSelector } from '../../../shared/hooks/redux';
import useDocumentHeight from '../../../shared/hooks/useDocumentHeight';
import useOnScreenKeyboardScrollFix from '../../../shared/hooks/useOnScreenKeyboardScrollFix';
import { ChatReaction, MessageModel } from '../../../shared/models/chat/chat.model';
import { MediaType } from '../../../shared/models/media.model';
import { editMessage, sendMessage } from '../../../store/chat/chatThunk';
import MessagesHeader from './MessagesHeader';
import { ChatRightPanelContainer } from './RightPanel.style';
import SocketConnect from '../../../shared/services/socket';
import {
  chatSocketAddReaction,
  chatSocketMessageCreated,
  chatSocketMessageDelete,
  chatSocketMessageSeen,
  chatSocketMessageTyping,
  chatSocketMessageUpdate,
  chatSocketRemoveReaction,
  chatSocketThreadUpdated,
  ChatSocketType,
} from '../../../store/chat/chatSockets';
import { BlinkedTypography } from '../../../shared/styles/BlinkedTypography';
import { DocumentsEntityTypeEnum } from '../../../shared/enums/documentEntityType.enum';
import ThreadMessages from './components/ThreadMessages';
import {
  addPendingMessage,
  removeAllTypingUser,
  removePendingMessage,
  setEditState,
} from '../../../store/chat/chatSlice';
import useModal from '../../../shared/hooks/useModal';
import { ModalNamesEnum } from '../../../shared/enums/modalNames.enum';
import ChatForm from '../../../components/forms/ChatForm/ChatForm';

const ChatRightPanel = () => {
  const { id } = useParams();

  const theme = useTheme();

  const dispatch = useAppDispatch();

  const thread = useAppSelector((state) => state.chat.thread, shallowEqual);
  const messages = useAppSelector((state) => state.chat.messages, shallowEqual);
  const userId = useAppSelector((state) => state.profile.data?.id, shallowEqual);
  const profile = useAppSelector((state) => state.profile.data, shallowEqual);
  const editState = useAppSelector((state) => state.chat.editState, shallowEqual);
  const modal = useModal(ModalNamesEnum.replyModal);
  const testData = useDocumentHeight();
  useOnScreenKeyboardScrollFix();

  const isNoSmallDisplay = useMediaQuery(`${theme.breakpoints.up('md')}`);

  const handleCloseEdit = useCallback(() => {
    dispatch(setEditState(null));
  }, [dispatch]);

  const handleSendEditedMessage = useCallback(
    (data: { message: string; files: MediaType[] }, messageId: number) => {
      dispatch(editMessage({ ...data, messageId }));
      handleCloseEdit();
    },
    [dispatch, handleCloseEdit],
  );

  const handleScrollToBottom = () => {
    const element = document.getElementById('messages-list');
    if (element) {
      element.scrollTo(0, element.scrollHeight);
    }
  };

  const handleSentMessage = async (data: { message: string; files: MediaType[] }) => {
    if (id) {
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
        sender: profile.id,
        status: 'pending',
        user_id: profile.id,
        body: data.message,
        pendingId: uuidv4(),
      };
      await dispatch(addPendingMessage(message));
      handleScrollToBottom();
      await dispatch(
        sendMessage({
          message: data.message,
          files: data.files,
          threadId: +id,
        }),
      )
        .then((res) => {
          if (sendMessage.fulfilled.match(res)) {
            dispatch(removePendingMessage(message.pendingId as string));
          }
        })
        .then(() => handleScrollToBottom());
    }
  };

  const handleTyping = useCallback(
    (isTyping: boolean) => {
      SocketConnect.getChannel(`thread.${id}`).whisper('typing', {
        isTyping: isTyping,
        name: profile?.full_name,
      });
    },
    [id, profile?.full_name],
  );

  useEffect(() => {
    if (id) {
      const messagesChannel = SocketConnect.connect.private(`thread.${id}`);
      SocketConnect.setChannel(`thread.${id}`, messagesChannel);
      messagesChannel
        .listen('.message.created', (event: ChatSocketType) => dispatch(chatSocketMessageCreated(event)))
        .listen('.seen.messages', (event: { thread_id: number; user_id: number }) =>
          dispatch(chatSocketMessageSeen(event)),
        )
        .listen('.message.updated', (event: ChatSocketType) => dispatch(chatSocketMessageUpdate(event)))
        .listen('.message.deleted', (event: ChatSocketType) => dispatch(chatSocketMessageDelete(event)))
        .listen('.emoji.created', (event: ChatReaction) => dispatch(chatSocketAddReaction(event)))
        .listen('.emoji.deleted', (event: ChatReaction) => dispatch(chatSocketRemoveReaction(event)))
        .listen('.thread.updated', () => dispatch(chatSocketThreadUpdated(+id)))
        .listenForWhisper('typing', (event: { isTyping: boolean; name: string }) =>
          dispatch(chatSocketMessageTyping(event)),
        );
    }
    return () => {
      SocketConnect.connect.leave(`private-thread.${id}`);
      SocketConnect.removeChannel(`private-thread.${id}`);
      dispatch(removeAllTypingUser());
    };
  }, [dispatch, id]);

  return (
    <ChatRightPanelContainer
      sx={{
        height: isNoSmallDisplay ? testData - 70 : testData - 58,
      }}
    >
      {isNoSmallDisplay && <MessagesHeader thread={thread.data} userId={userId} />}

      <ThreadMessages />

      <Collapse sx={{ p: '0 10px' }} in={!!messages.typingUser.length} unmountOnExit>
        <BlinkedTypography variant="small">
          {messages.typingUser.map((user, index) =>
            index === messages.typingUser.length - 1 ? `${user} is typing ...` : `${user}, `,
          )}
        </BlinkedTypography>
      </Collapse>
      <Box
        sx={{
          p: isNoSmallDisplay ? '0 10px 10px 10px' : 0,
          position: 'relative',
        }}
      >
        {thread.data?.is_system || messages.isLoading ? (
          <></>
        ) : (
          <ChatForm
            fileEntityType={DocumentsEntityTypeEnum.message_document}
            isShowFormLoader={false}
            onSendMessage={handleSentMessage}
            isEdit={editState.data !== null}
            onCloseEdit={handleCloseEdit}
            onEditMessage={handleSendEditedMessage}
            editState={editState.data || undefined}
            typing={handleTyping}
            isClipboardFiles={!modal?.isOpen}
          />
        )}
      </Box>
    </ChatRightPanelContainer>
  );
};

export default memo(ChatRightPanel);

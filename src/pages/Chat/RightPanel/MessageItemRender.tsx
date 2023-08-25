import React, { FC, memo } from 'react';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import moment from 'moment/moment';
import { MessageModel, ThreadModel } from '../../../shared/models/chat/chat.model';
import { MediaType } from '../../../shared/models/media.model';
import { ChatRenderItemContainer } from '../components/ChatMessage/ChatMessage.style';
import ChatMessage from '../components/ChatMessage/ChatMessage';

type Props = {
  message: MessageModel;
  userId: number;
  thread: ThreadModel | null;
  unreadReplies: number[];
  selectedUnreadReplyIndex: number;
  handleShowFile: (index: number, media: MediaType[]) => void;
  handleEditMessage: (message: MessageModel) => void;
  handlePinMessage: (message: MessageModel) => void;
  onDeleteMessage: (message: MessageModel) => void;
  handleOpenReply: (message: MessageModel) => void;
  handleAddReaction: (message: MessageModel, emoji: string) => void;
};

const MessageItemRender: FC<Props> = ({
  message,
  userId,
  unreadReplies,
  selectedUnreadReplyIndex,
  // threadUsers,
  handleShowFile,
  handleEditMessage,
  handlePinMessage,
  onDeleteMessage,
  handleOpenReply,
  handleAddReaction,
  thread,
}) => {
  const theme = useTheme();
  const isNoSmallDisplay = useMediaQuery(`${theme.breakpoints.up('md')}`);

  return (
    <ChatRenderItemContainer id={`message-${message.id}`}>
      {message.isShowDate ? (
        <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', p: '10px 0' }}>
          <Box
            sx={{
              p: '5px 15px',
              borderRadius: '30px',
              m: '0 auto',
              backgroundColor: theme.palette.case.neutral.n50,
            }}
          >
            <Typography variant="extra_small_bolt">
              {moment(message.created_at).format('MM-DD-YYYY') === moment().format('MM/DD/YYYY')
                ? 'Today'
                : moment(message.created_at).format('DD MMMM, YYYY')}
            </Typography>
          </Box>
        </Box>
      ) : (
        <></>
      )}

      <Box
        className={
          message.id ===
          unreadReplies[
            selectedUnreadReplyIndex === 0 ? unreadReplies.length - 1 : selectedUnreadReplyIndex - 1
          ]
            ? 'animate'
            : ''
        }
      >
        <ChatMessage
          width={isNoSmallDisplay ? 90 : 100}
          message={message}
          userId={userId}
          isSystem={thread?.is_system}
          isSupport={thread?.is_support}
          threadSubject={thread?.subject}
          threadAvatar={thread?.avatar}
          threadId={thread?.id}
          threadUsers={thread?.all_users || []}
          handleShowFile={handleShowFile}
          isReply={!!message.count_replays === false}
          isDelete={
            message?.user_id === userId &&
            moment(moment().format('YYYY-MM-DD HH:mm:ss')).isBefore(
              moment.utc(message?.created_at).local().add(1, 'day').format('YYYY-MM-DD HH:mm:ss'),
            )
          }
          isPin={false}
          isEdit={
            message?.user_id === userId &&
            moment(moment().format('YYYY-MM-DD HH:mm:ss')).isBefore(
              moment.utc(message?.created_at).local().add(1, 'day').format('YYYY-MM-DD HH:mm:ss'),
            )
          }
          handleEdit={handleEditMessage}
          handlePin={handlePinMessage}
          handleDelete={onDeleteMessage}
          openReply={handleOpenReply}
          setEmoji={(emoji) => handleAddReaction(message, emoji)}
        />
      </Box>
    </ChatRenderItemContainer>
  );
};

export default memo(MessageItemRender);

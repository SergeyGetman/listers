import { Box, CircularProgress, Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import React, { FC, memo, useMemo, useState } from 'react';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import moment from 'moment';
import { Emoji } from 'emoji-mart';
import Linkify from 'react-linkify';
import { useTranslation } from 'react-i18next';
import {
  ChatMessageContainer,
  ChatMessageFileContainer,
  ChatMessageReplyContainer,
  ChatMessageText,
  ChatMessageTimeConteiner,
  ChatMessageTimeText,
} from './ChatMessage.style';
import ChatEmojiCount from '../ChatEmojiCount';
import { MessageModel } from '../../../../shared/models/chat/chat.model';
import { MediaType } from '../../../../shared/models/media.model';
import { ItemUserModel } from '../../../../shared/models/itemUser.model';

import { systemChatEmojiConfig } from '../../../../shared/configs/systemChatEmoji.config';
import { AvatarModel } from '../../../../shared/models/avatar.model';
import FileView from '../../../../components/FilePreView';
import AvatarContainer from '../../../../components/avatars/AvatarContainer/AvatarContainer';
import ChatMessageActions from './ChatMessageAction/ChatMessageAction';
import UserInfoPopover from '../../../../components/popovers/UserInfoPopover';

type Props = {
  message: MessageModel;
  userId: number;
  threadUsers: ItemUserModel[];
  setEmoji?: (emoji: string) => void;
  isShowReadMessage?: boolean;
  handlePin?: (message: MessageModel) => void;
  handleEdit?: (message: MessageModel) => void;
  handleDelete?: (message: MessageModel) => void;
  openReply?: (message: MessageModel) => void;
  handleShowFile: (index: number, media: MediaType[]) => void;
  isEmoji?: boolean;
  isReply?: boolean;
  isDelete?: boolean;
  isEdit?: boolean;
  isPin?: boolean;
  isMenu?: boolean;
  isOpenProfile?: boolean;
  handleOpenProfile?: (userId: number) => void;
  isShowReply?: boolean;
  timeFormat?: 'short' | 'full';
  avatarSize?: 'medium' | 'small';
  isSystem?: boolean;
  isSupport?: boolean;
  threadSubject?: string;
  threadAvatar?: AvatarModel | null;
  width?: number;
  threadId?: number;
};

const ChatMessage: FC<Props> = ({
  message,
  userId,
  threadUsers,
  isEmoji = true,
  isReply = true,
  isMenu = true,
  isPin = true,
  isDelete = true,
  isEdit = true,
  isOpenProfile = true,
  setEmoji,
  handleDelete,
  handleEdit,
  handlePin,
  openReply,
  isShowReadMessage = true,
  handleShowFile,
  handleOpenProfile,
  isShowReply = true,
  timeFormat = 'short',
  avatarSize = 'medium',
  isSystem = false,
  isSupport = false,
  threadSubject = '',
  threadAvatar = null,
  width = 70,
  threadId,
}) => {
  const { t } = useTranslation();

  const ownerMessage = useMemo(() => {
    return threadUsers.find((user) => user.id === message.user_id);
  }, [message.user_id, threadUsers]);

  const replyOwnder = useMemo(() => {
    return threadUsers.find((user) => user.id === message.last_reply?.user_id);
  }, [message, threadUsers]);

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  const [showActionMenu, setShowActionMenu] = useState(false);

  const onOpenUserProfile = () => {
    if (userId !== message.user_id && isOpenProfile) {
      handleOpenProfile?.(message.user_id);
    }
  };

  const avatarContainer = useMemo(() => {
    if (ownerMessage && isSupport === false && isSystem === false) {
      return (
        <UserInfoPopover item={ownerMessage} userId={userId}>
          <AvatarContainer
            firstName={
              isSystem
                ? threadSubject
                : isSupport && userId !== message.user_id
                ? threadSubject
                : ownerMessage?.first_name || ''
            }
            lastName={
              isSystem ? '' : isSupport && userId !== message.user_id ? '' : ownerMessage?.last_name || ''
            }
            src={
              isSystem
                ? threadAvatar?.additional_info?.size_urls?.avatar_icon || threadAvatar?.url || ''
                : isSupport && userId !== message.user_id
                ? threadAvatar?.additional_info?.size_urls?.avatar_icon || threadAvatar?.url || ''
                : ownerMessage?.avatar?.additional_info?.size_urls?.avatar_icon ||
                  ownerMessage?.avatar?.url ||
                  ''
            }
            id={
              isSystem
                ? threadId || 0
                : isSupport && userId !== message.user_id
                ? threadId || 0
                : ownerMessage?.id || 0
            }
            size={avatarSize}
          />
        </UserInfoPopover>
      );
    }

    return (
      <AvatarContainer
        firstName={
          isSystem
            ? threadSubject
            : isSupport && userId !== message.user_id
            ? threadSubject
            : ownerMessage?.first_name || ''
        }
        lastName={
          isSystem ? '' : isSupport && userId !== message.user_id ? '' : ownerMessage?.last_name || ''
        }
        src={
          isSystem
            ? threadAvatar?.additional_info?.size_urls?.avatar_icon || threadAvatar?.url || ''
            : isSupport && userId !== message.user_id
            ? threadAvatar?.additional_info?.size_urls?.avatar_icon || threadAvatar?.url || ''
            : ownerMessage?.avatar?.additional_info?.size_urls?.avatar_icon || ownerMessage?.avatar?.url || ''
        }
        id={
          isSystem
            ? threadId || 0
            : isSupport && userId !== message.user_id
            ? threadId || 0
            : ownerMessage?.id || 0
        }
        size={avatarSize}
      />
    );
  }, [
    avatarSize,
    isSupport,
    isSystem,
    message.user_id,
    ownerMessage,
    threadAvatar?.additional_info?.size_urls?.avatar_icon,
    threadAvatar?.url,
    threadId,
    threadSubject,
    userId,
  ]);

  return (
    <ChatMessageContainer
      containerWidth={width}
      onMouseEnter={() => setShowActionMenu(true)}
      onMouseLeave={() => setShowActionMenu(false)}
    >
      <Box sx={{ display: 'flex' }}>
        <Box
          sx={{
            cursor: userId !== message.user_id && isOpenProfile ? 'pointer' : 'default',
            pt: avatarSize === 'small' ? '5px' : 0,
          }}
          onClick={onOpenUserProfile}
        >
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {avatarContainer}
          </Box>
          {matches && (
            <ChatMessageTimeConteiner>
              {timeFormat === 'short' ? (
                <ChatMessageTimeText paddingTop="4px" variant="extra_small_bolt">
                  {moment.utc(message.created_at).local().format('h:mm A')}
                </ChatMessageTimeText>
              ) : (
                <ChatMessageTimeConteiner>
                  <ChatMessageTimeText paddingTop="6px" variant="extra_small_bolt">
                    {moment.utc(message.created_at).local().format('MM/DD/YY')}
                  </ChatMessageTimeText>

                  <ChatMessageTimeText variant="extra_small_bolt">
                    {moment.utc(message.created_at).local().format('h:mm A')}
                  </ChatMessageTimeText>
                </ChatMessageTimeConteiner>
              )}
            </ChatMessageTimeConteiner>
          )}
        </Box>
        <Box
          sx={{
            pl: '12px',
            width: '94%',
            [theme.breakpoints.down('sm')]: {
              width: '89%',
            },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
              <ChatMessageText noWrap variant="small_bolt">
                {isSystem
                  ? threadSubject
                  : isSupport && userId !== message.user_id
                  ? threadSubject
                  : `${ownerMessage?.first_name} ${ownerMessage?.last_name}`}
              </ChatMessageText>
              {!matches && (
                <Typography
                  sx={{
                    color: theme.palette.case.neutral.n400,
                    paddingLeft: '9px',
                    minWidth: '44px',
                    cursor: 'default',
                  }}
                  variant="extra_small_bolt"
                >
                  {timeFormat === 'short'
                    ? moment.utc(message.created_at).local().format('h:mm A')
                    : moment.utc(message.created_at).local().format('MM/DD/YY h:mm A')}
                </Typography>
              )}

              {isShowReadMessage && message.user_id === userId && message.status !== 'pending' && (
                <Box sx={{ p: '0 9px 0 9px' }}>
                  <DoneAllIcon
                    sx={{
                      color:
                        message.status === 'seen'
                          ? theme.palette.primary.main
                          : theme.palette.case.neutral.n400,
                      fontSize: '14px',
                    }}
                  />
                </Box>
              )}

              {message.status === 'pending' && (
                <Box sx={{ p: '0 9px 0 9px' }}>
                  <CircularProgress size={10} />
                </Box>
              )}
            </Box>
            {isSystem === false && isSupport === false && (
              <Box height="20px" className="chat-actions">
                {(matches || (showActionMenu && message.status !== 'pending')) && (
                  <ChatMessageActions
                    isEmoji={isEmoji}
                    onSelectEmoji={(emoji) => setEmoji?.(emoji)}
                    isReply={isReply}
                    isMenu={isMenu && (isDelete || isPin || isEdit)}
                    isPin={isPin}
                    isDelete={isDelete}
                    isEdit={isEdit}
                    onReply={() => openReply?.(message)}
                    onPin={() => handlePin?.(message)}
                    onEdit={() => handleEdit?.(message)}
                    onDelete={() => handleDelete?.(message)}
                  />
                )}
              </Box>
            )}
          </Box>
          <Box sx={{ pt: matches ? '3px' : '6px', maxWidth: '90%' }}>
            <Linkify
              componentDecorator={(decoratedHref, decoratedText, key) => (
                <a onClick={(e) => e.stopPropagation()} target="blank" href={decoratedHref} key={key}>
                  {decoratedText}
                </a>
              )}
            >
              <Typography
                variant="default"
                sx={{
                  maxWidth: '100%',
                  whiteSpace: 'pre-wrap',
                  wordWrap: 'break-word',
                }}
              >
                {message.body}
              </Typography>
            </Linkify>
            {message.edited_at && (
              <Typography sx={{ color: theme.palette.case.neutral.n500 }} component="span" variant="small">
                &nbsp;(edited)
              </Typography>
            )}
          </Box>
          {message.media.length > 0 && (
            <Box
              sx={{
                position: 'relative',
                mt: '10px',
              }}
            >
              <ChatMessageFileContainer>
                <FileView files={message.media} onOpen={handleShowFile} />
              </ChatMessageFileContainer>
            </Box>
          )}
          {isSystem ? (
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'end', gap: '10px' }}>
                {systemChatEmojiConfig.map((item) => (
                  <Box
                    sx={{
                      opacity: message?.myEmoji?.emoji === item.id ? 1 : '0.5',
                      cursor: 'pointer',
                      '&:hover': {
                        opacity: 1,
                      },
                    }}
                    onClick={() => setEmoji?.(item.id)}
                  >
                    <Emoji emoji={item.id} set="apple" size={16} />
                  </Box>
                ))}
              </Box>
            </Box>
          ) : (
            <Box
              sx={{
                mt: '10px',
              }}
            >
              <Grid container spacing="5px">
                {message.reactions
                  .filter((item) => item.count > 0)
                  .map((reaction, index) => (
                    <Grid key={index} item>
                      <ChatEmojiCount
                        isActive={reaction.name === message?.myEmoji?.emoji}
                        id={reaction.name}
                        message={message}
                        count={reaction.count}
                        onSelect={(emoji: string) => setEmoji?.(emoji)}
                      />
                    </Grid>
                  ))}
              </Grid>
            </Box>
          )}

          {message.last_reply !== null && isShowReply && (
            <ChatMessageReplyContainer
              isShowDot={!message.is_read_replies}
              onClick={() => openReply?.(message)}
            >
              <Box>
                <AvatarContainer
                  firstName={replyOwnder?.first_name || ''}
                  lastName={replyOwnder?.last_name || ''}
                  src={
                    replyOwnder?.avatar?.additional_info?.size_urls?.avatar_icon ||
                    replyOwnder?.avatar?.url ||
                    ''
                  }
                  id={replyOwnder?.id || 0}
                />
              </Box>
              <Box sx={{ pl: '10px', position: 'relative' }}>
                <Typography
                  variant="extra_small"
                  sx={{
                    color: message.is_read_replies
                      ? theme.palette.case.contrast.black
                      : theme.palette.primary.main,
                  }}
                >
                  {message?.count_replays && message?.count_replays > 1
                    ? `${message?.count_replays}  ${t('chat.replies')}`
                    : `${message?.count_replays}  ${t('chat.reply')}`}
                </Typography>
                {!message.is_read_replies ? (
                  <Box
                    sx={{
                      position: 'absolute',
                      background: theme.palette.error.main,
                      borderRadius: '50%',
                      width: 6,
                      height: 6,
                      top: '-2px',
                      right: '-10px',
                    }}
                  />
                ) : null}
              </Box>
            </ChatMessageReplyContainer>
          )}
        </Box>
      </Box>
    </ChatMessageContainer>
  );
};

export default memo(ChatMessage);

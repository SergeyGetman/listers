import React, { forwardRef, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, IconButton, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useNavigate } from 'react-router';
import {
  ChatNotificationContainer,
  ChatNotificationLeftBlock,
  ChatNotificationSendButton,
} from './ChatNotification.style';
import { ReactComponent as ChatIcon } from '../../../assets/Images/chatIcon.svg';
import { MessageModel, ThreadModel } from '../../../shared/models/chat/chat.model';
import { TypographyWithDots } from '../../../shared/styles/TypographyWithDots';
import MuiBaseTextFiled from '../../formElements/MuiBaseTextFiled';
import { ItemUserModel } from '../../../shared/models/itemUser.model';
import { ReactComponent as ToastCloseIcon } from '../../../assets/Images/toast-close.svg';
import router from '../../../shared/services/router';
import AvatarContainer from '../../avatars/AvatarContainer';
import { useAppSelector } from '../../../shared/hooks/redux';
import modalObserver from '../../../shared/utils/observers/modalObserver';

type Props = {
  message: MessageModel;
  thread: ThreadModel;
  onSend: (messageText: string) => void;
  onClose: (key: number) => void;
  notificationKey: number;
};

const ChatNotification = forwardRef<HTMLHeadingElement, Props>(
  ({ message, thread, onClose, notificationKey, onSend }, ref) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const userId = useAppSelector((state) => state.profile.data);
    const notificationOwner = useMemo(
      () => thread.users.find((item) => item.id === message.user_id) as ItemUserModel,
      [message.user_id, thread.users],
    );

    const isGroup = useMemo(() => !!thread.owner_id, [thread.owner_id]);

    const handleRedirectToChat = () => {
      navigate(`${router.chat.path}/${isGroup ? 'group' : 'personal'}/${thread.id}`);
      modalObserver.removeAllModals();
      onClose(notificationKey);
    };

    const [replyText, setReplyText] = useState('');

    const handleSend = () => {
      if (replyText.trim() !== '') {
        onSend(replyText);
        onClose(notificationKey);
      }
    };

    return (
      <ChatNotificationContainer ref={ref}>
        <Box
          sx={{
            position: 'absolute',
            top: '5px',
            right: '5px',
          }}
        >
          <IconButton onClick={() => onClose(notificationKey)}>
            <ToastCloseIcon />
          </IconButton>
        </Box>
        <ChatNotificationLeftBlock>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              mt: '10px',
              mb: '18px',
            }}
          >
            <AvatarContainer
              size="small"
              firstName={
                thread.is_system
                  ? thread.subject
                  : thread.is_support && userId !== message.user_id
                  ? thread.subject
                  : notificationOwner?.first_name || ''
              }
              lastName={
                thread.is_system
                  ? ''
                  : thread.is_support && userId !== message.user_id
                  ? ''
                  : notificationOwner?.last_name || ''
              }
              src={
                thread.is_system
                  ? thread.avatar?.additional_info?.size_urls?.avatar_icon || thread.avatar?.url || ''
                  : thread.is_support && userId !== message.user_id
                  ? thread.avatar?.additional_info?.size_urls?.avatar_icon || thread.avatar?.url || ''
                  : notificationOwner?.avatar?.additional_info?.size_urls?.avatar_icon ||
                    notificationOwner?.avatar?.url ||
                    ''
              }
              id={
                thread.is_system
                  ? thread.id || 0
                  : thread.is_support && userId !== message.user_id
                  ? thread.id || 0
                  : notificationOwner?.id || 0
              }
            />
          </Box>
          <ChatIcon />
        </ChatNotificationLeftBlock>
        <Box
          sx={{
            p: '6px 10px 10px 54px',
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              cursor: 'pointer',
            }}
            onClick={handleRedirectToChat}
          >
            <TypographyWithDots lines={1} variant="default_bolt">
              {isGroup ? `New Message - ${thread.subject}` : `New Message`}
            </TypographyWithDots>
            <Typography variant="small" sx={(theme) => ({ color: theme.palette.case.neutral.n400 })}>
              {thread.is_system
                ? thread.subject
                : thread.is_support && userId !== message.user_id
                ? thread.subject
                : notificationOwner?.full_name || ''}
            </Typography>
          </Box>
          <Box sx={{ mt: '4px' }}>
            <TypographyWithDots variant="default" lines={2}>
              {message.body}
            </TypographyWithDots>
          </Box>

          {thread.is_system === false && (
            <Box
              sx={{
                mt: '6px',
                zIndex: 2000,
              }}
            >
              <MuiBaseTextFiled
                value={replyText}
                onChange={(e: React.FormEvent<HTMLInputElement>) => setReplyText(e.currentTarget.value)}
                label={t('general.fieldNames.writeReplyHere')}
                endAdornment={
                  <ChatNotificationSendButton type="submit" onClick={handleSend}>
                    <SendIcon
                      sx={(theme) => ({
                        color: `${theme.palette.case.contrast.white} !imporatnt`,
                      })}
                    />
                  </ChatNotificationSendButton>
                }
              />
            </Box>
          )}
        </Box>
      </ChatNotificationContainer>
    );
  },
);

export default ChatNotification;

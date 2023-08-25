import { Box, Typography, useTheme } from '@mui/material';
import React, { FC, useMemo } from 'react';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { ThreadContainer } from './Thread.style';
import { ThreadModel } from '../../../../shared/models/chat/chat.model';
import MuiChip from '../../../../components/MuiChip';
import AvatarContainer from '../../../../components/avatars/AvatarContainer';

type Props = {
  thread: ThreadModel;
  userId: number;
  isGroupChat?: boolean;
  active?: boolean;
  handleClick: (item: ThreadModel) => void;
  isNoClickable?: boolean;
};

const Thread: FC<Props> = ({
  userId,
  isGroupChat = false,
  thread,
  active = false,
  handleClick,
  isNoClickable = false,
}) => {
  const theme = useTheme();
  const ownerThread = useMemo(() => {
    return thread.all_users.find((user) => user.id !== userId);
  }, [thread.all_users, userId]);

  return (
    <ThreadContainer
      sx={{
        cursor: active ? 'default' : isNoClickable ? 'default' : 'pointer',
      }}
      onClick={() => (active ? true : handleClick(thread))}
      active={active}
    >
      <Box>
        <AvatarContainer
          variant={isGroupChat ? 'rounded' : 'circular'}
          firstName={
            isGroupChat
              ? thread.subject
              : thread.is_support || thread.is_system
              ? thread.subject
              : ownerThread?.first_name || ''
          }
          lastName={isGroupChat ? (thread.subject ? thread.subject[1] : '') : ownerThread?.last_name || ''}
          src={
            isGroupChat
              ? thread.avatar?.additional_info?.size_urls?.middle_icon || thread.avatar?.url || ''
              : thread.avatar?.additional_info?.size_urls?.avatar_icon || thread.avatar?.url || ''
          }
          id={thread.is_support || thread.is_system || isGroupChat ? thread.id || 0 : ownerThread?.id || 0}
          size="medium"
        />
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          marginLeft: '16px',
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '90%',
          overflow: 'hidden',
        }}
      >
        <Typography
          sx={{ maxWidth: '90%', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}
          variant="small_bolt"
        >
          {thread.subject}
        </Typography>
        <Typography
          variant="extra_small"
          sx={{ textTransform: 'capitalize', color: theme.palette.case.neutral.n400 }}
        >
          {!isGroupChat && ownerThread?.connection_role ? ownerThread.connection_role : ''}
        </Typography>
      </Box>
      <Box
        sx={{
          width: '60px',
          minWidth: '60px',
          height: '26px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderLeft: `1px solid ${theme.palette.case.neutral.n200}`,
          position: 'relative',
        }}
      >
        <MailOutlineIcon />
        <Box
          sx={{
            position: 'absolute',
            bottom: '-3px',
            right: '11px',
          }}
        >
          <MuiChip label={thread.count_unread_messages} isShow={!!thread.count_unread_messages} />
        </Box>
      </Box>
    </ThreadContainer>
  );
};

export default Thread;

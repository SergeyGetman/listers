import React, { FC, useMemo } from 'react';
import { Typography } from '@mui/material';
import { NoMessagesStubContainer, StubLine } from './NoMessagesStub.style';
import { ThreadModel } from '../../../../shared/models/chat/chat.model';
import MuiAvatarGroup from '../../../../components/avatars/MuiAvatarGroup';

type NoMessagesStubProps = {
  title: string;
  img: string;
  imageAlt: string;
};

type Props = {
  value: NoMessagesStubProps;
  userId: number;
  thread: ThreadModel;
};

const NoMessagesStub: FC<Props> = ({ value, userId, thread }) => {
  const owner = useMemo(() => {
    if (thread.is_support) {
      return thread.users
        .filter((item) => item.id !== userId)
        .map((item) => ({
          ...item,
          avatar: thread.avatar
            ? {
                ...thread.avatar,
                additional_info: {
                  ...thread.avatar.additional_info,
                  size_urls: {
                    ...thread.avatar.additional_info.size_urls,
                    avatar_icon: thread.avatar.additional_info.size_urls.middle_icon,
                  },
                },
              }
            : null,
          first_name: thread.subject,
          last_name: '',
        }))[0];
    }
    return thread.users.filter((item) => item.id === thread.owner_id)[0];
  }, [thread, userId]);

  const users = useMemo(() => {
    if (thread.is_support) {
      return thread.users.map((item) => {
        if (item.id !== userId) {
          return {
            ...item,
            avatar: thread.avatar
              ? {
                  ...thread.avatar,
                  additional_info: {
                    ...thread.avatar.additional_info,
                    size_urls: {
                      ...thread.avatar.additional_info.size_urls,
                      avatar_icon: thread.avatar.additional_info.size_urls.middle_icon,
                    },
                  },
                }
              : null,
            first_name: thread.subject,
            last_name: '',
          };
        }
        return item;
      });
    }
    return thread.users;
  }, [thread, userId]);

  return (
    <NoMessagesStubContainer>
      <img src={value.img} alt={value.imageAlt} style={{ width: '251px' }} />
      <StubLine />
      {!!thread.users.length && (
        <MuiAvatarGroup maxItemView={3} size="medium" users={users} owner={owner || users[0]} />
      )}
      <Typography variant="small_large" sx={{ mt: '30px' }}>
        {value.title}
      </Typography>
    </NoMessagesStubContainer>
  );
};

export default NoMessagesStub;

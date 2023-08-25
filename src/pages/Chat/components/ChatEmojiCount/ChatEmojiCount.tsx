import React, { FC, memo } from 'react';
import { Emoji } from 'emoji-mart';
import { Typography } from '@mui/material';
import { ChatEmojiCountContainer } from './ChatEmojiCount.style';
import EmojiCountPopover from '../../../../components/popovers/EmojiCountPopover';
import { MessageModel } from '../../../../shared/models/chat/chat.model';

type Props = {
  id: string;
  message: MessageModel;
  count: number;
  isActive?: boolean;
  onSelect: (emoji: string) => void;
};

const ChatEmojiCount: FC<Props> = ({ id, count, isActive, message, onSelect }) => {
  return (
    <EmojiCountPopover emoji={id} message={message} handleClick={() => onSelect(id)}>
      <ChatEmojiCountContainer onClick={() => onSelect(id)} isActive={isActive}>
        <Emoji emoji={id} set="apple" size={16} />
        <Typography sx={{ ml: '5px', pointerEvent: 'none' }} variant="label">
          {count}
        </Typography>
      </ChatEmojiCountContainer>
    </EmojiCountPopover>
  );
};

export default memo(ChatEmojiCount);

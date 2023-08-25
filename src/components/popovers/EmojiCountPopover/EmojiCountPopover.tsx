import { Box, Skeleton, Typography, useMediaQuery, useTheme } from '@mui/material';
import { debounce } from 'lodash';
import React, { FC, useCallback, useState } from 'react';
import useLongPress from '../../../shared/hooks/useLongPress';
import {
  EmojiHoverCountPopover,
  EmojiHoverCountPopoverContainer,
  EmojiHoverCountPopoverInfo,
  EmojiHoverCountPopoverRole,
} from './EmojiCountPopover.style';
import AvatarContainer from '../../avatars/AvatarContainer';
import { MessageModel } from '../../../shared/models/chat/chat.model';
import { getEmojiUsers } from '../../../store/chat/chatThunk';
import { useAppDispatch } from '../../../shared/hooks/redux';

type Props = {
  children: React.ReactNode;
  message: MessageModel;
  handleClick: () => void;
  emoji: string;
};

const EmojiCountPopover: FC<Props> = ({ children, message, emoji, handleClick }) => {
  const [users, setUsers] = useState<any[]>([]);
  const [element, setElement] = useState<HTMLDivElement | null>(null);
  const skeletonArr = Array(3).fill('');
  let hovered = false;
  const dispatch = useAppDispatch();
  const handleCloseEmojiPopover = useCallback(() => {
    setUsers([]);
  }, []);
  const handleOpenEmojiPopover = useCallback(() => {
    dispatch(getEmojiUsers(message.id, (data) => setUsers(data[emoji])));
  }, [dispatch, emoji, message.id]);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));

  const handleMouseOver = (e: any) => {
    if (hovered) {
      setElement(e.target);
      handleOpenEmojiPopover();
    } else setElement(null);
  };
  const debouncedMouseOver = debounce(handleMouseOver, 1000);

  const onLongPress = (e: any) => {
    setElement(e.target);
    handleOpenEmojiPopover();
  };

  const longPressEvent = useLongPress(onLongPress, handleClick, { shouldPreventDefault: true, delay: 150 });

  return (
    <Box>
      {matches ? (
        <Box {...longPressEvent}>{children}</Box>
      ) : (
        <Box
          aria-owns={Boolean(element) ? 'mouse-over-popover' : undefined}
          aria-haspopup="true"
          onMouseEnter={(e) => {
            hovered = true;
            debouncedMouseOver(e);
          }}
          onMouseLeave={() => {
            hovered = false;
            handleCloseEmojiPopover();
          }}
        >
          {children}
        </Box>
      )}

      <Box>
        <EmojiHoverCountPopover
          open={Boolean(element)}
          id="mouse-over-popover"
          anchorEl={element}
          onClose={() => {
            setElement(null);
            handleCloseEmojiPopover();
          }}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          PaperProps={{
            onMouseLeave: () => {
              setElement(null);
              handleCloseEmojiPopover();
            },
          }}
        >
          <Box
            sx={{
              overflow: users.length === 0 ? 'hidden' : 'auto',
            }}
          >
            {users.length > 0
              ? users?.map((item) => (
                  <EmojiHoverCountPopoverContainer>
                    <AvatarContainer
                      firstName={item.first_name}
                      src={
                        item?.avatar
                          ? item?.avatar?.additional_info?.size_urls?.avatar_icon || item?.avatar?.url
                          : ''
                      }
                      isOwner={item.isOwner}
                      id={item.id}
                      lastName={item.last_name}
                    />
                    <EmojiHoverCountPopoverInfo>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography sx={{ maxWidth: '90px' }} noWrap variant="extra_small">
                          {`${item.first_name} ${item.last_name}`}
                        </Typography>
                      </Box>
                      <EmojiHoverCountPopoverRole variant="extra_small" sx={{ maxWidth: '90px' }} noWrap>
                        {item.connection_role}
                      </EmojiHoverCountPopoverRole>
                    </EmojiHoverCountPopoverInfo>
                  </EmojiHoverCountPopoverContainer>
                ))
              : skeletonArr.map((item, index) => (
                  <Box key={index} sx={{ height: '30px', width: '138px', marginBottom: '10px' }}>
                    <Skeleton sx={{ borderRadius: '5px' }} variant="rectangular" width={138} height={30} />
                  </Box>
                ))}
          </Box>
        </EmojiHoverCountPopover>
      </Box>
    </Box>
  );
};

export default EmojiCountPopover;

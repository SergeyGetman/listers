import { Box } from '@mui/material';
import { bindPopover, bindTrigger, usePopupState } from 'material-ui-popup-state/hooks';
import React, { FC, useRef } from 'react';
import { Emoji, EmojiData } from 'emoji-mart';
import CircularButton from '../../buttons/CilrcularButton';
import { EmojiPopoverContainer, EmojiPopoverItem } from './EmojiPopover.style';
import { EmojiEnum } from '../../../shared/enums/emoji.enum';
import EmojiPicker from '../../formElements/EmojiPicker';

type Props = {
  children: React.ReactNode;
  onSelectEmoji: (emoji: string) => void;
  anchorOriginVertical?: 'bottom' | 'top' | 'center';
  anchorOriginHorizontal?: 'center' | 'right' | 'left';
  transformOriginVertical?: 'bottom' | 'top' | 'center';
  transformOriginHorizontal?: 'center' | 'right' | 'left';
};

const EmojiPopover: FC<Props> = ({
  children,
  onSelectEmoji,
  anchorOriginHorizontal = 'left',
  anchorOriginVertical = 'top',
  transformOriginHorizontal = 'left',
  transformOriginVertical = 'bottom',
}) => {
  const popupState = usePopupState({
    variant: 'popover',
    popupId: 'emojiPopover',
  });
  const ref = useRef<HTMLDivElement | null>(null);

  const handleSelectEmoji = (emoji: EmojiData) => {
    onSelectEmoji(emoji.id === undefined ? '' : emoji.id);
    popupState.close();
  };

  return (
    <Box sx={{ position: 'relative' }}>
      <Box sx={{ display: 'inline-block', cursor: 'pointer' }} {...bindTrigger(popupState)}>
        {children}
      </Box>
      <EmojiPicker
        anchorOriginVertical="bottom"
        anchorOriginHorizontal="center"
        transformOriginHorizontal="right"
        transformOriginVertical="top"
        onSelect={handleSelectEmoji}
        isResetHeight
      >
        <Box sx={{ width: 0, height: 0 }} ref={ref} />
      </EmojiPicker>
      <EmojiPopoverContainer
        anchorOrigin={{
          vertical: anchorOriginVertical,
          horizontal: anchorOriginHorizontal,
        }}
        transformOrigin={{
          vertical: transformOriginVertical,
          horizontal: transformOriginHorizontal,
        }}
        {...bindPopover(popupState)}
      >
        {EmojiEnum.map((item) => (
          <EmojiPopoverItem
            key={item.id}
            onClick={() => {
              onSelectEmoji(item.id);
              popupState.close();
            }}
          >
            <Emoji emoji={item.id} set="apple" size={16} />
          </EmojiPopoverItem>
        ))}

        <EmojiPopoverItem>
          <EmojiPicker onSelect={() => true}>
            <CircularButton
              size="small"
              onClick={() => {
                ref?.current?.click();
                popupState.close();
              }}
            />
          </EmojiPicker>
        </EmojiPopoverItem>
      </EmojiPopoverContainer>
    </Box>
  );
};

export default EmojiPopover;

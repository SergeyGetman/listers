import { EmojiData, Picker } from 'emoji-mart';
import React, { FC } from 'react';
import { Box } from '@mui/material';
import { bindPopover, bindTrigger, usePopupState } from 'material-ui-popup-state/hooks';
import { EmojiContainerPopover } from './EmojiPicker.style';
import 'emoji-mart/css/emoji-mart.css';

type Props = {
  onSelect: (emoji: EmojiData) => void;
  anchorOriginVertical?: 'bottom' | 'top' | 'center';
  anchorOriginHorizontal?: 'center' | 'right' | 'left';
  transformOriginVertical?: 'bottom' | 'top' | 'center';
  transformOriginHorizontal?: 'center' | 'right' | 'left';
  isResetHeight?: boolean;
  children: React.ReactNode;
};

const EmojiPicker: FC<Props> = ({
  onSelect,
  children,
  isResetHeight = false,
  anchorOriginHorizontal = 'left',
  anchorOriginVertical = 'top',
  transformOriginHorizontal = 'left',
  transformOriginVertical = 'bottom',
}) => {
  const popupState = usePopupState({
    variant: 'popover',
    popupId: 'emojiPickerPopover',
  });

  return (
    <Box
      sx={{ position: 'relative', width: isResetHeight ? 0 : 'auto', height: isResetHeight ? 0 : 'auto' }}
      className="test"
    >
      <Box sx={{ display: 'inline-block', cursor: 'pointer' }} {...bindTrigger(popupState)}>
        {children}
      </Box>
      <EmojiContainerPopover
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
        <Picker
          showSkinTones={false}
          onSelect={(event) => {
            onSelect(event);
            popupState.close();
          }}
        />
      </EmojiContainerPopover>
    </Box>
  );
};

export default EmojiPicker;

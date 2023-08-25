import React, { FC } from 'react';
import { ChipsActionMenuElement, IconContainer } from './ChipsActionMenu.style';
type ChipsActionMenuItemProps = {
  item: any;
  popupState: any;
  callback: () => void;
};
const ChipsActionMenuItem: FC<ChipsActionMenuItemProps> = ({ item, popupState, callback }) => {
  return (
    <ChipsActionMenuElement
      key={item.label}
      selected={false}
      onClick={() => {
        callback();
        popupState.close();
      }}
    >
      <IconContainer className="chips-action-icon-container">
        <item.icon />
      </IconContainer>
      {item.label}
    </ChipsActionMenuElement>
  );
};

export default ChipsActionMenuItem;

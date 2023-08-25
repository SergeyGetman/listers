import React, { FC } from 'react';
import { useSlate } from 'slate-react';
import MuiIconButton from '../../../../../../buttons/iconButtons/MuiIconButton';
import { isBlockActive, TEXT_ALIGN_TYPES, toggleBlock } from '../../../../utils';
type BlockBtnProps = {
  format: string;
  icon: React.ReactNode;
};
const BlockBtn: FC<BlockBtnProps> = ({ format, icon }) => {
  const editor = useSlate();
  return (
    <MuiIconButton
      size="medium"
      isSelected={isBlockActive(editor, format, TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type')}
      onMouseDown={(event: any) => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
    >
      {icon}
    </MuiIconButton>
  );
};

export default BlockBtn;

import React, { FC } from 'react';
import { useSlate } from 'slate-react';
import MuiIconButton from '../../../../../../buttons/iconButtons/MuiIconButton';
import { isMarkActive, toggleMark } from '../../../../utils';
type MarkBtnProps = {
  format: string;
  icon: React.ReactNode;
};
const MarkBtn: FC<MarkBtnProps> = ({ format, icon }) => {
  const editor = useSlate();
  return (
    <MuiIconButton
      size="medium"
      isSelected={isMarkActive(editor, format)}
      onMouseDown={(event: any) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
    >
      {icon}
    </MuiIconButton>
  );
};

export default MarkBtn;

import React, { FC } from 'react';
import { useSlate } from 'slate-react';
import MuiIconButton from '../../../../../../buttons/iconButtons/MuiIconButton';
type UndoBtnProps = {
  icon: React.ReactNode;
};
const UndoBtn: FC<UndoBtnProps> = ({ icon }) => {
  const editor = useSlate();
  const handleUndo = () => {
    // @ts-ignore
    editor.undo();
  };
  return (
    <MuiIconButton
      size="medium"
      onMouseDown={(event: any) => {
        event.preventDefault();
        handleUndo();
      }}
    >
      {icon}
    </MuiIconButton>
  );
};

export default UndoBtn;

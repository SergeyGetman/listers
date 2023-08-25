import React, { FC } from 'react';
import { useSlate } from 'slate-react';
import MuiIconButton from '../../../../../../buttons/iconButtons/MuiIconButton';
type RedoBtnProps = {
  icon: React.ReactNode;
};
const RedoBtn: FC<RedoBtnProps> = ({ icon }) => {
  const editor = useSlate();
  const handleRedo = () => {
    // @ts-ignore
    editor.redo();
  };
  return (
    <MuiIconButton
      size="medium"
      onMouseDown={(event: any) => {
        event.preventDefault();
        handleRedo();
      }}
    >
      {icon}
    </MuiIconButton>
  );
};

export default RedoBtn;

import React, { forwardRef, useMemo, useState } from 'react';
import { withReact, Slate } from 'slate-react';
import { createEditor, Descendant } from 'slate';
import { withHistory } from 'slate-history';
import { Box } from '@mui/material';
import CustomEditorComponent from './components/CustomEditorComponent';
import CustomEditorToolbar from './components/CustomEditorToolbar';
import { getEditorStateAllText } from './utils';
import InputLabel from '../InputLabel';
type MuiCustomEditorProps = {
  label?: string;
  isRequired?: boolean;
  value: Descendant[];
  onChange: (value?: Descendant[]) => void;
  isShowHint?: boolean;
  maxHintValue?: number;
  placeholder?: string;
  maxHeight?: string;
  [x: string]: any;
};
const MuiCustomEditor = forwardRef<HTMLHeadingElement, MuiCustomEditorProps>((props, ref) => {
  const {
    isRequired,
    label,
    onChange,
    placeholder,
    maxHintValue,
    isShowHint = true,
    maxHeight = '300px',
    value,
    ...args
  } = props;
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const [editorValue, setEditorValue] = useState<Descendant[]>(value);
  const [letterCount, setLetterCount] = useState<number>(0);

  const handleEditorChange = (newValue: Descendant[]) => {
    onChange(newValue);
    setEditorValue(newValue);
    setLetterCount(getEditorStateAllText(newValue, [])?.length);
  };

  return (
    <Box ref={ref}>
      <Slate {...args} editor={editor} value={editorValue} onChange={handleEditorChange}>
        <InputLabel
          label={label}
          isShowHint={isShowHint}
          currentHintValue={letterCount}
          maxHintValue={maxHintValue}
        />
        <Box sx={{ position: 'relative' }}>
          <CustomEditorComponent valueLength={letterCount} placeholder={placeholder} maxHeight={maxHeight} />
          <CustomEditorToolbar />
        </Box>
      </Slate>
    </Box>
  );
});

export default MuiCustomEditor;

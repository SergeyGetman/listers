import React, { forwardRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Editor } from 'react-draft-wysiwyg';
import useMediaQuery from '@mui/material/useMediaQuery';
import { EditorState } from 'draft-js';
import { MuiEditorContainer } from './MuiEditor.style';
import theme from '../../../theme/theme';

type MuiEditorProps = {
  placeholder?: string;
  value: EditorState;
  onChange: (value: any) => void;
  [x: string]: any;
};
const MuiEditor = forwardRef<HTMLHeadingElement, MuiEditorProps>((props, ref) => {
  const { t } = useTranslation();
  const { placeholder, onChange, value, ...args } = props;
  const isSmallDisplay = useMediaQuery(`${theme.breakpoints.down('sm')}`);

  return (
    <MuiEditorContainer ref={ref}>
      <Editor
        {...args}
        editorState={value}
        placeholder={placeholder ? placeholder : t('general.placeholders.writeSomething')}
        wrapperClassName="card"
        editorClassName="card-body"
        onEditorStateChange={(newState) => onChange(newState)}
        toolbar={{
          options: ['inline', 'textAlign', 'list', 'emoji', 'history'],

          inline: {
            inDropdown: false,
            options: ['bold', 'italic', 'underline'],
          },
          textAlign: {
            inDropdown: false,
            options: ['left', 'center'],
          },
          list: {
            inDropdown: false,
            options: ['ordered'],
          },
          link: { inDropdown: false },
          history: { inDropdown: false, options: isSmallDisplay ? [] : ['undo', 'redo'] },
        }}
      />
    </MuiEditorContainer>
  );
});

export default MuiEditor;

import React, { FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Editable, useFocused, useSlate } from 'slate-react';
import isHotkey from 'is-hotkey';
import { Typography } from '@mui/material';
import theme from '../../../../../theme/theme';
import { HOTKEYS, toggleMark } from '../../utils';
import EditorElement from './components/EditorElement';
import EditorLeaf from './components/EditorLeaf';
type CustomEditorComponentProps = {
  placeholder?: string;
  valueLength: number;
  maxHeight?: string;
};
const CustomEditorComponent: FC<CustomEditorComponentProps> = (props) => {
  const { t } = useTranslation();
  const {
    placeholder = t('general.placeholders.writeSomething'),
    valueLength = 0,
    maxHeight = '300px',
  } = props;
  const renderElement = useCallback((elementProps: any) => <EditorElement {...elementProps} />, []);
  const renderLeaf = useCallback((leafProps: any) => <EditorLeaf {...leafProps} />, []);
  const focused = useFocused();
  const editor = useSlate();

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    Object.entries(HOTKEYS).forEach(([hotkey, mark]) => {
      if (isHotkey(hotkey, event)) {
        toggleMark(editor, mark as string);
      }
    });
  };

  return (
    <Editable
      renderElement={renderElement}
      renderLeaf={renderLeaf}
      placeholder={placeholder}
      renderPlaceholder={({ children, attributes }) => (
        <Typography
          {...attributes}
          sx={{ color: theme.palette.case.neutral.n500, top: 'auto !important', opacity: '1 !important' }}
          component="span"
        >
          {children}
        </Typography>
      )}
      style={{
        border: `1px solid ${focused ? theme.palette.case.primary.p400 : theme.palette.case.neutral.n300}`,
        backgroundColor:
          focused || valueLength ? theme.palette.case.neutral.n0 : theme.palette.case.neutral.n50,
        borderRadius: '4px',
        transition: 'all 0.3s',
        padding: '9px 12px',
        paddingBottom: '40px',
        minHeight: '120px',
        overflowY: 'auto',
        overflowX: 'hidden',
        maxHeight: maxHeight,
      }}
      onKeyDown={handleKeyDown}
    />
  );
};

export default CustomEditorComponent;

import { Validate } from 'react-hook-form';

export type EditorValue = { type: string; children: { text: string }[] }[];

export const validateEditor: Validate<EditorValue, any> = (value: EditorValue) => {
  const editorValue = value[0].children[0].text.trim();
  if (editorValue.length === 0) {
    return 'Please, specify your answer';
  }
  if (editorValue.length < 2) {
    return 'Description must be at least 2 characters long.';
  }
  if (editorValue.length > 5000) {
    return 'Description cannot exceed 5000 characters.';
  }
  return true;
};

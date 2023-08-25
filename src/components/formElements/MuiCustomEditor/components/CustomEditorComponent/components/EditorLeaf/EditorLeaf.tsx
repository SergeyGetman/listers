import React from 'react';
import { Typography } from '@mui/material';
import { RenderLeafProps } from 'slate-react/dist/components/editable';
import { Text } from 'slate';
import theme from '../../../../../../../theme/theme';

const EditorLeaf = ({
  attributes,
  children,
  leaf,
}: RenderLeafProps & {
  leaf: Text & {
    bold: boolean;
    code: boolean;
    italic: boolean;
    underline: boolean;
  };
}) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = <code>{children}</code>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  return (
    <Typography sx={{ color: theme.palette.case.neutral.n700 }} component="span" {...attributes}>
      {children}
    </Typography>
  );
};

export default EditorLeaf;

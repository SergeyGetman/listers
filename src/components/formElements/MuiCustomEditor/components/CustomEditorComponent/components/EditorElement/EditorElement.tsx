import React from 'react';
import { RenderElementProps } from 'slate-react/dist/components/editable';
import { Element } from 'slate';
type TextAlign = 'left' | 'right' | 'center' | 'justify' | 'inherit';
const EditorElement = ({
  attributes,
  children,
  element,
}: RenderElementProps & {
  element: Element & {
    align: TextAlign;
    type: string;
  };
}) => {
  const style = {
    textAlign: element.align,
    fontSize: '14px',
    margin: '0 !important',
    marginBlockStart: '0px',
    marginBlockEnd: '0px',
  };
  switch (element.type) {
    case 'block-quote':
      return (
        <blockquote style={style} {...attributes}>
          {children}
        </blockquote>
      );
    case 'bulleted-list':
      return (
        <ul style={style} {...attributes}>
          {children}
        </ul>
      );
    case 'heading-one':
      return (
        <h1 style={style} {...attributes}>
          {children}
        </h1>
      );
    case 'heading-two':
      return (
        <h2 style={style} {...attributes}>
          {children}
        </h2>
      );
    case 'list-item':
      return (
        <li style={style} {...attributes}>
          {children}
        </li>
      );
    case 'numbered-list':
      return (
        <ol style={style} {...attributes}>
          {children}
        </ol>
      );
    default:
      return (
        <p style={style} {...attributes}>
          {children}
        </p>
      );
  }
};

export default EditorElement;

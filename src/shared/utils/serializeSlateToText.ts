import { Descendant, Node } from 'slate';

export const serializeSlateToText = (nodes: Descendant[]) => {
  return nodes.map((n: Descendant) => Node.string(n)).join('\n');
};

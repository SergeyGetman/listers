import { FieldValues } from 'react-hook-form';
import { Descendant, Node } from 'slate';
import { SubscriptionFeedback } from '../../../../../../../../../shared/models/plans.model';

const removeRepeatedParagraphs = (text: string): string => {
  const paragraphs = text.split('\n\n');
  const result = [];

  for (let i = 0; i < paragraphs.length; i++) {
    if (paragraphs[i] !== paragraphs[i + 1] || paragraphs[i] !== paragraphs[i + 2]) {
      result.push(paragraphs[i]);
    }
  }

  return result.join('\n\n');
};

const serialize = (nodes: Descendant[]) => {
  return removeRepeatedParagraphs(nodes.map((n: Descendant) => Node.string(n)).join('\n'));
};

export const createSubscriptionFeedbackMapper = (data: FieldValues): SubscriptionFeedback => {
  const serializeMessage = serialize(data.description);
  const radioText = data.checkbox;

  return {
    checkboxes: [{ text: radioText }],
    message: serializeMessage,
  };
};

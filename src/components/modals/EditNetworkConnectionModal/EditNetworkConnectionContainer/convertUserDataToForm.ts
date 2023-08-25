import { ContentState, EditorState } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import { ConnectedUserModel } from '../../../../shared/models/network';

export const convertUserDataToForm = (user: ConnectedUserModel) => {
  const blocksFromHTML = htmlToDraft(user.note || '');
  const contentState = ContentState.createFromBlockArray(blocksFromHTML.contentBlocks);
  const newData = {
    first_name: user.first_name,
    last_name: user.last_name,
    role: user.recipient_request.role,
    note: EditorState.createWithContent(contentState),
    documents: user.attached_documents,
  };
  return newData;
};

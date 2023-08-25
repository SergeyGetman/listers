import { CommentsItemModel } from '../../shared/models/comments/commentsItem.model';
import { mockOwner } from './mockItemUsers';

export const mockCommentsItems: CommentsItemModel = {
  id: 12,
  user: mockOwner,
  documents: [],
  body: 'Comment Item Body',
  created_at: new Date().toLocaleString(),
};

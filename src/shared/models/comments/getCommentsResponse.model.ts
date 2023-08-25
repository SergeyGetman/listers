import { MetaModel } from '../meta.model';
import { CommentsItemModel } from './commentsItem.model';

export type GetCommentsResponseModel = {
  data: CommentsItemModel[];
  meta: MetaModel;
};

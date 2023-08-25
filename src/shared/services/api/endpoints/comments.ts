import axios from 'axios';

import { GetCommentsResponseModel } from '../../../models/comments/getCommentsResponse.model';
import { CommentsItemModel } from '../../../models/comments/commentsItem.model';
import { CommentsFormPayloadModel } from '../../../models/comments/commentsFormPayload.model';

const commentsEndpoints = {
  addCommentsItem: (
    params: CommentsFormPayloadModel & {
      entity_type?: string;
      entity_id?: number;
    },
  ): Promise<CommentsItemModel> => axios.post(`/comments`, params),
  getComments: (params: {
    page: number;
    entity_type?: string;
    entity_id?: number;
  }): Promise<GetCommentsResponseModel> => axios.get('/comments', { params }),
  deleteCommentsItem: (params: {
    itemId: number;
    entity_type?: string;
    entity_id?: number;
  }): Promise<number> => axios.delete(`/comments/${params.itemId}`, { params }),
};

export default commentsEndpoints;

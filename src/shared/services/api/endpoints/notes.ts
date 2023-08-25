import axios from 'axios';

import { GetNotesResponseModel } from '../../../models/notes/getNotesResponse.model';
import { NotesFormPayloadModel } from '../../../models/notes/notesFormPayload.model';
import { NotesItemModel } from '../../../models/notes/notesItem.model';

const notesEndpoints = {
  addNotesItem: (
    params: NotesFormPayloadModel & {
      entity_type?: string;
      entity_id?: number;
    },
  ): Promise<NotesItemModel> => axios.post(`/notes`, params),
  getNotes: (params: {
    page: number;
    entity_type?: string;
    entity_id?: number;
  }): Promise<GetNotesResponseModel> => axios.get('/notes', { params }),
  updateNotesItem: (params: {
    body: string;
    id: number;
    entity_type?: string;
    entity_id?: number;
    title?: string;
  }): Promise<NotesItemModel> => axios.put(`/notes/${params.id}`, params),
  deleteNotesItem: (params: { itemId: number; entity_type?: string; entity_id?: number }): Promise<number> =>
    axios.delete(`/notes/${params.itemId}`, { params }),
};

export default notesEndpoints;

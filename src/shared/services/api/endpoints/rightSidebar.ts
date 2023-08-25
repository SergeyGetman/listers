import axios from 'axios';

import { ChecklistItemModel } from '../../../models/checklists/checklistItem.model';
import { GetChecklistsResponseModel } from '../../../models/checklists/getChecklistsResponse.model';
import { GetNotesResponseModel } from '../../../models/notes/getNotesResponse.model';
import { ChecklistFormPayloadModel } from '../../../models/checklists/checklistFormPayload.model';
import { NotesFormPayloadModel } from '../../../models/notes/notesFormPayload.model';
import { NotesItemModel } from '../../../models/notes/notesItem.model';
import { GetNewsResponseModel } from '../../../models/notifications/news/getNewsResponse.model';
import { GetRequestsResponseModel } from '../../../models/notifications/requests/getRequestsResponse.model';

const rightSidebarEndpoints = {
  getChecklists: (): Promise<GetChecklistsResponseModel> => axios.get('/checklists'),
  addChecklistItem: (params: ChecklistFormPayloadModel): Promise<ChecklistItemModel> =>
    axios.post(`/checklists`, params),
  updateChecklistItem: (params: { status: string; id: number }): Promise<ChecklistItemModel> =>
    axios.post(`/checklists/${params.id}/status`, params),
  deleteChecklistItem: (id: number): Promise<number> => axios.delete(`/checklists/${id}`),
  getNotes: (): Promise<GetNotesResponseModel> => axios.get('/notes?page'),
  deleteNotesItem: (id: number): Promise<number> => axios.delete(`/notes/${id}`),

  addNotesItem: (params: NotesFormPayloadModel): Promise<NotesItemModel> => axios.post(`/notes`, params),

  getNews: (page: number): Promise<GetNewsResponseModel> => axios.get(`/news?page=${page}`),
  getRequests: (page: number): Promise<GetRequestsResponseModel> => axios.get(`/requests?page=${page}`),
  viewedNews: (newsId: number): Promise<number> => axios.put(`/news/${newsId}/view`),
  removeNews: (newsId: number): Promise<number> => axios.delete(`/news/${newsId}`),
  viewedAllNews: (): Promise<undefined> => axios.put('/news/view-all'),
  showAllNews: (): Promise<undefined> => axios.post('/news/show-all'),
  removeAllNews: (): Promise<undefined> => axios.delete('/news'),
  choseRequestAction: ({
    id,
    action,
  }: {
    id?: number;
    action: string;
  }): Promise<{ id: number; action: string }> => axios.put(`/requests/${id}/${action}`),
};

export default rightSidebarEndpoints;

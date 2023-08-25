import axios from 'axios';
import { ChecklistItemModel } from '../../../models/checklists/checklistItem.model';
import { GetChecklistsResponseModel } from '../../../models/checklists/getChecklistsResponse.model';
import { ChecklistFormPayloadModel } from '../../../models/checklists/checklistFormPayload.model';

const checklistsEndpoints = {
  getChecklists: (params: {
    entity_type?: string;
    entity_id?: number;
  }): Promise<GetChecklistsResponseModel> => axios.get('/checklists', { params }),
  addChecklistItem: (
    params: ChecklistFormPayloadModel & { entity_type?: string; entity_id?: number },
  ): Promise<ChecklistItemModel> => axios.post(`/checklists`, params),
  updateChecklistItem: (params: {
    status: string;
    id: number;
    entity_type?: string;
    entity_id?: number;
  }): Promise<ChecklistItemModel> => axios.post(`/checklists/${params.id}/status`, params),
  updateChecklistItemBody: (params: {
    body: string;
    id: number;
    entity_type?: string;
    entity_id?: number;
  }): Promise<ChecklistItemModel> => axios.put(`/checklists/${params.id}`, params),
  sortChecklists: (id: number, data: { position: number }) => axios.put(`/checklists/${id}/position`, data),
  deleteChecklistItem: (params: {
    itemId: number;
    entity_type?: string;
    entity_id?: number;
  }): Promise<number> => axios.delete(`/checklists/${params.itemId}`, { params }),
  getChecklistItem: (id: number): Promise<ChecklistItemModel> => axios.get(`/checklists/${id}`),
};

export default checklistsEndpoints;

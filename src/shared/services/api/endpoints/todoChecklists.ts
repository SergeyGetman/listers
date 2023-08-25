import axios from 'axios';
import { TodoFormPayloadModel } from '../../../models/todo/todoModalForm.model';
import { TodoItemModel } from '../../../models/todo/todoItemModel';
import { GetTodoDataResponseModel } from '../../../models/todo/getTodoDataResponse.model';
import { TodoFilters } from '../../../../store/todo/Checklists/checklistsSlice';
import { AssignPeopleSelectValueModel } from '../../../models/assignPeopleSelectValue.model';

const todoChecklistsEndpoints = {
  createChecklist: (params: TodoFormPayloadModel): Promise<TodoItemModel> =>
    axios.post('/todo-items', params),
  getChecklistsItems: (
    params: TodoFilters & { page?: number; is_need_action?: number; shared_filter?: string[] },
  ): Promise<GetTodoDataResponseModel> => axios.get('/todo-items', { params }),
  sortChecklists: (id: number, data: { position: number }) => axios.put(`/todo-items/${id}/position`, data),
  deleteChecklist: (params: { checklistId: number }): Promise<number> =>
    axios.delete(`/todo-items/${params.checklistId}`, { params }),
  duplicateChecklist: (checklistId: number): Promise<TodoItemModel> =>
    axios.post(`/todo-items/${checklistId}/duplicate`),
  deleteChecklistItem: (params: {
    itemId: number;
    entity_type?: string;
    entity_id?: number;
  }): Promise<number> => axios.delete(`/checklists/${params.itemId}`, { params }),
  updateUsersChecklist: (params: {
    users: AssignPeopleSelectValueModel[];
    checklistId: number;
  }): Promise<TodoItemModel> => axios.put(`/todo-items/${params.checklistId}/users`, params),
  updateChecklistItem: (params: { checklistId: number; item: TodoItemModel }): Promise<TodoItemModel> =>
    axios.put(`/todo-items/${params.checklistId}`, { ...params.item }),
  completeChecklistsItem: (params: { checklistId: number }): Promise<TodoItemModel> =>
    axios.post(`/todo-items/${params.checklistId}/done`, params),
  uncompleteChecklistsItem: (params: { checklistId: number }): Promise<TodoItemModel> =>
    axios.post(`/todo-items/${params.checklistId}/undone`, params),
  convertToTask: (params: { checklistId: number }): Promise<number> =>
    axios.post(`/todo-items/${params.checklistId}/convert-to-task`, { ...params }),
  convertItemToTask: (params: { checklistId: number; checklistItemId: number }): Promise<number> =>
    axios.post(`/todo-items/${params.checklistId}/${params.checklistItemId}/convert-item-to-task`, {
      ...params,
    }),
  removeYourself: (params: { checklistId: number }): Promise<number> =>
    axios.delete(`/todo-items/${params.checklistId}/self`, { params }),
  changeIsOpen: (params: { checklistId: number; is_open: number }): Promise<undefined> =>
    axios.put(`/todo-items/${params.checklistId}/is-open`, { ...params }),
};

export default todoChecklistsEndpoints;

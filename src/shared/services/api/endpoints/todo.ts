import axios from 'axios';
import { TodoFormPayloadModel } from '../../../models/todo/todoModalForm.model';
import { TodoItemModel } from '../../../models/todo/todoItemModel';
import { GetTodoDataResponseModel } from '../../../models/todo/getTodoDataResponse.model';
import { AssignPeopleSelectValueModel } from '../../../models/assignPeopleSelectValue.model';
import { TodoFilters } from '../../../../store/todo/todoSlice';

const todoEndpoints = {
  createTodo: (params: TodoFormPayloadModel): Promise<TodoItemModel> => axios.post('/todo-items', params),
  getTodoItems: (params: TodoFilters & { page?: number }): Promise<GetTodoDataResponseModel> =>
    axios.get('/todo-items', { params }),
  getTodo: (todoId: number): Promise<TodoItemModel> => axios.get(`/todo-items/${todoId}`),
  duplicateTodo: (todoId: number): Promise<TodoItemModel> => axios.post(`/todo-items/${todoId}/duplicate`),
  deleteTodo: (params: { todoId: number }): Promise<number> =>
    axios.delete(`/todo-items/${params.todoId}`, { params }),
  updateUsersTodo: (params: {
    users: AssignPeopleSelectValueModel[];
    todoId: number;
  }): Promise<TodoItemModel> => axios.put(`/todo-items/${params.todoId}/users`, params),
  convertToTask: (params: { todoId: number }): Promise<number> =>
    axios.post(`/todo-items/${params.todoId}/convert-to-task`, { ...params }),
  removeMyself: (params: { todoId: number }): Promise<number> =>
    axios.delete(`/todo-items/${params.todoId}/self`, { params }),
  updateTodo: (params: TodoFormPayloadModel, todoId: number): Promise<TodoItemModel> =>
    axios.put(`/todo-items/${todoId}`, { ...params }),
  changeIsOpen: (params: { todoId: number; is_open: number }): Promise<undefined> =>
    axios.put(`/todo-items/${params.todoId}/is-open`, { ...params }),
};

export default todoEndpoints;

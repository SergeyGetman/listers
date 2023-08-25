import { MetaModel } from '../meta.model';
import { TodoItemModel } from './todoItemModel';

export type GetTodoDataResponseModel = {
  data: TodoItemModel[];
  meta: MetaModel;
};

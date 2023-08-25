import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TodoItemModel } from '../../shared/models/todo/todoItemModel';
import { isListOver } from '../../shared/functions/isListOver';
import { GetTodoDataResponseModel } from '../../shared/models/todo/getTodoDataResponse.model';
import { ChecklistItemModel } from '../../shared/models/checklists/checklistItem.model';

export type TodoFilters = {
  query?: string | null;
  shared_filter?: string | null;
  hide_done?: number;
};

export interface TodoState {
  todoData: any;
  filters: TodoFilters;
  isListOver: boolean | number;
}

const initialState: TodoState = {
  todoData: null,
  filters:
    JSON.parse(localStorage.getItem('todoFilters') as string) !== null
      ? JSON.parse(localStorage.getItem('todoFilters') as string)
      : {
          query: null,
          shared_filter: null,
          hide_done: 0,
        },
  isListOver: false,
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodoItem: (state, action: PayloadAction<TodoItemModel>) => {
      state.todoData = {
        ...state.todoData,
        data: [action.payload, ...state.todoData.data],
      };
    },
    setTodoFilters: (state, action: PayloadAction<object>) => {
      localStorage.setItem('todoFilters', JSON.stringify(action.payload));
      state.filters = { ...state.filters, ...action.payload };
      state.isListOver = false;
    },
    updateTodoListItem: (state, action: PayloadAction<TodoItemModel>) => {
      state.todoData.data = state.todoData.data.map((item: TodoItemModel) => {
        if (item.id === action.payload.id) {
          return action.payload;
        }
        return item;
      });
    },
    setUserNotification: (state, action: PayloadAction<{ id: number }>) => {
      state.todoData.data = state.todoData.data.map((item: TodoItemModel) => {
        if (item.id === action.payload.id) {
          return { ...item, userNotification: null };
        }
        return item;
      });
    },
    changeTodoItemIsOpenValue: (state, action: PayloadAction<{ todoId: number; is_open: number }>) => {
      state.todoData.data = state.todoData.data.map((item: TodoItemModel) => {
        if (item.id === action.payload.todoId) {
          return { ...item, is_open: action.payload.is_open };
        }
        return item;
      });
    },
    removeTodoItem: (state, action: PayloadAction<number>) => {
      state.todoData = {
        ...state.todoData,
        data: state.todoData.data.filter((item: TodoItemModel) => item.id !== action.payload),
      };
    },
    setTodoData: (state, action: PayloadAction<GetTodoDataResponseModel>) => {
      state.todoData = action.payload;
      state.isListOver = isListOver(action.payload);
    },
    setMoreTodoData: (state, action: PayloadAction<GetTodoDataResponseModel>) => {
      if (state.todoData?.meta) {
        state.todoData = {
          ...action.payload,
          data: [...state.todoData.data, ...action.payload.data],
        };
      }
      state.isListOver = isListOver(action.payload);
    },
    addChecklistItemToTodo: (
      state,
      action: PayloadAction<{ todoId: number; checklistItem: ChecklistItemModel }>,
    ) => {
      state.todoData.data = state.todoData.data.map((item: TodoItemModel) => {
        if (item.id === action.payload.todoId) {
          return {
            ...item,
            checklists: [action.payload.checklistItem, ...item.checklists],
          };
        }
        return item;
      });
    },
    updateChecklistItemInTodo: (
      state,
      action: PayloadAction<{ todoId: number; checklistItem: ChecklistItemModel }>,
    ) => {
      state.todoData.data = state.todoData.data.map((item: TodoItemModel) => {
        if (item.id === action.payload.todoId) {
          return {
            ...item,
            checklists: item.checklists.map((todoChecklistItem: ChecklistItemModel) => {
              if (todoChecklistItem.id === action.payload.checklistItem.id) {
                return action.payload.checklistItem;
              }
              return todoChecklistItem;
            }),
          };
        }
        return item;
      });
    },
    resetTodoState: () => {
      return initialState;
    },
    deleteChecklistItemInTodo: (
      state,
      action: PayloadAction<{ todoId: number; checklistItemId: number }>,
    ) => {
      state.todoData.data = state.todoData.data.map((item: TodoItemModel) => {
        if (item.id === action.payload.todoId) {
          return {
            ...item,
            checklists: item.checklists.filter(
              (todoChecklistItem: ChecklistItemModel) =>
                todoChecklistItem.id !== action.payload.checklistItemId,
            ),
          };
        }
        return item;
      });
    },
  },
});

export const {
  addTodoItem,
  setTodoFilters,
  setMoreTodoData,
  setTodoData,
  addChecklistItemToTodo,
  updateChecklistItemInTodo,
  deleteChecklistItemInTodo,
  removeTodoItem,
  updateTodoListItem,
  changeTodoItemIsOpenValue,
  setUserNotification,
  resetTodoState,
} = todoSlice.actions;
export default todoSlice.reducer;

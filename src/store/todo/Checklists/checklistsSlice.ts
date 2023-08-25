import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TodoItemModel } from '../../../shared/models/todo/todoItemModel';
import { isListOver } from '../../../shared/functions/isListOver';
import { GetTodoDataResponseModel } from '../../../shared/models/todo/getTodoDataResponse.model';
import { ChecklistItemModel } from '../../../shared/models/checklists/checklistItem.model';

export type TodoFilters = {
  title?: string | null;
  shared_filter: string[];
};

export interface ChecklistsDataState {
  checklistsData: any;
  filters: TodoFilters;
  isFetchingInitialData: boolean;
  isFetchingWithFilter: boolean;
  isLoading: boolean;
  isListOver: boolean | number;
  isCanDnD: boolean;
}

const initialState: ChecklistsDataState = {
  isFetchingInitialData: false,
  isCanDnD: false,
  checklistsData: null,
  isLoading: false,
  filters:
    JSON.parse(localStorage.getItem('todoFilters') as string) !== null
      ? JSON.parse(localStorage.getItem('todoFilters') as string)
      : {
          title: null,
        },
  isListOver: false,
  isFetchingWithFilter: false,
};

export const checklistsSlice = createSlice({
  name: 'todoChecklists',
  initialState,
  reducers: {
    addChecklist: (state, action: PayloadAction<TodoItemModel>) => {
      state.checklistsData = {
        ...state.checklistsData,
        data: state.checklistsData?.data?.length
          ? [action.payload, ...state.checklistsData.data]
          : [action.payload],
      };
    },
    toggleFetchingInitialData: (state, action: PayloadAction<boolean>) => {
      state.isFetchingInitialData = action.payload;
    },
    setChecklistsData: (
      state,
      action: PayloadAction<{
        checklistsData: GetTodoDataResponseModel;
        isFetchingWithFilter: boolean;
        isCanDnD: boolean;
      }>,
    ) => {
      state.checklistsData = action.payload.checklistsData;
      state.isListOver = isListOver(action.payload.checklistsData);
      state.isFetchingWithFilter = action.payload.isFetchingWithFilter;
      state.isCanDnD = action.payload.isCanDnD;
    },
    updateChecklistItemInTodo: (
      state,
      action: PayloadAction<{ todoId: number; checklistItem: ChecklistItemModel }>,
    ) => {
      state.checklistsData.data = state.checklistsData.data.map((item: TodoItemModel) => {
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
    setNewChecklistDataInTodo: (
      state,
      action: PayloadAction<{ todoId: number; newChecklists: ChecklistItemModel[] }>,
    ) => {
      state.checklistsData.data = state.checklistsData.data.map((item: TodoItemModel) => {
        if (item.id === action.payload.todoId) {
          return {
            ...item,
            checklists: action.payload.newChecklists,
          };
        }
        return item;
      });
    },

    addChecklistItemToTodo: (
      state,
      action: PayloadAction<{ todoId: number; checklistItem: ChecklistItemModel }>,
    ) => {
      state.checklistsData.data = state.checklistsData.data.map((item: TodoItemModel) => {
        if (item.id === action.payload.todoId) {
          return {
            ...item,
            checklists: [action.payload.checklistItem, ...item.checklists],
          };
        }
        return item;
      });
    },
    updateChecklistListItem: (state, action: PayloadAction<TodoItemModel>) => {
      state.checklistsData.data = state.checklistsData.data.map((item: TodoItemModel) => {
        if (item.id === action.payload.id) {
          return action.payload;
        }
        return item;
      });
    },
    uncompleteChecklistItem: (state, action: PayloadAction<TodoItemModel>) => {
      state.checklistsData.data = state.checklistsData.data
        .filter((item: TodoItemModel) => item.id !== action.payload.id)
        .concat(action.payload);
    },
    completeChecklistItem: (state, action: PayloadAction<TodoItemModel>) => {
      state.checklistsData.data = state.checklistsData.data.map((item: TodoItemModel) => {
        if (item.id === action.payload.id) {
          return action.payload;
        }
        return item;
      });
    },
    setNewChecklistsData(state, action) {
      state.checklistsData.data = action.payload;
    },
    setChecklistUserNotification: (state, action: PayloadAction<{ id: number }>) => {
      state.checklistsData.data = state.checklistsData.data.map((item: TodoItemModel) => {
        if (item.id === action.payload.id) {
          return { ...item, userNotification: null };
        }
        return item;
      });
    },
    setChecklistsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setMoreChecklistsData: (
      state,
      action: PayloadAction<{
        checklistsData: GetTodoDataResponseModel;
        isFetchingWithFilter: boolean;
        isCanDnD: boolean;
      }>,
    ) => {
      if (state.checklistsData?.meta) {
        state.checklistsData = {
          ...action.payload.checklistsData,
          data: [...state.checklistsData.data, ...action.payload.checklistsData.data],
        };
      }

      state.isListOver = isListOver(action.payload.checklistsData);
      state.isFetchingWithFilter = action.payload.isFetchingWithFilter;
      state.isCanDnD = action.payload.isCanDnD;
    },

    setTodoFilters: (state, action: PayloadAction<object>) => {
      localStorage.setItem('todoFilters', JSON.stringify(action.payload));
      state.filters = { ...state.filters, ...action.payload };
      state.isListOver = false;
    },

    removeChecklist: (state, action: PayloadAction<number>) => {
      state.checklistsData = {
        ...state.checklistsData,
        data: state.checklistsData.data.filter((item: TodoItemModel) => item.id !== action.payload),
      };
    },

    deleteChecklistItem: (state, action: PayloadAction<{ checklistId: number; checklistItemId: number }>) => {
      state.checklistsData.data = state.checklistsData.data.map((item: TodoItemModel) => {
        if (item.id === action.payload.checklistId) {
          return {
            ...item,
            checklists: item.checklists.filter(
              (checklistItem: ChecklistItemModel) => checklistItem.id !== action.payload.checklistItemId,
            ),
          };
        }
        return item;
      });
    },
    changeChecklistIsOpenValue: (state, action: PayloadAction<{ checklistId: number; is_open: number }>) => {
      state.checklistsData.data = state.checklistsData.data.map((item: TodoItemModel) => {
        if (item.id === action.payload.checklistId) {
          return { ...item, is_open: action.payload.is_open };
        }
        return item;
      });
    },

    resetChecklistsData: (state) => {
      return { ...initialState, filters: state.filters };
    },
  },
});

export const {
  addChecklist,
  removeChecklist,
  deleteChecklistItem,
  setChecklistsLoading,
  toggleFetchingInitialData,
  setTodoFilters,
  setChecklistUserNotification,
  updateChecklistListItem,
  resetChecklistsData,
  addChecklistItemToTodo,
  setChecklistsData,
  changeChecklistIsOpenValue,
  setMoreChecklistsData,
  updateChecklistItemInTodo,
  setNewChecklistsData,
  setNewChecklistDataInTodo,
  uncompleteChecklistItem,
} = checklistsSlice.actions;
export default checklistsSlice.reducer;

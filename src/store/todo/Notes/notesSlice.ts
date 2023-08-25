import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { isListOver } from '../../../shared/functions/isListOver';
import { NoteItemModel } from '../../../shared/models/todo/notes/noteItemModel';
import { GetNotesDataResponseModel } from '../../../shared/models/todo/notes/getNotesDataResponseModel.model';

export type NotesFilters = {
  title?: string | null;
  shared_filter: string[];
};

export interface NotesDataState {
  notesData: any;
  filters: NotesFilters;
  isFetchingInitialData: boolean;
  isFetchingWithFilter: boolean;
  isLoading: boolean;
  isCanDnD: boolean;
  isListOver: boolean | number;
}

const initialState: NotesDataState = {
  isFetchingInitialData: false,
  notesData: null,
  isLoading: false,
  isCanDnD: false,
  filters:
    JSON.parse(localStorage.getItem('notesFilters') as string) !== null
      ? JSON.parse(localStorage.getItem('notesFilters') as string)
      : {
          title: null,
          shared_filter: null,
        },
  isListOver: false,
  isFetchingWithFilter: false,
};

export const notesSlice = createSlice({
  name: 'todoNotes',
  initialState,
  reducers: {
    addNote: (state, action: PayloadAction<NoteItemModel>) => {
      state.notesData = {
        ...state.notesData,
        data: state.notesData?.data?.length ? [action.payload, ...state.notesData.data] : [action.payload],
      };
    },
    toggleFetchingInitialData: (state, action: PayloadAction<boolean>) => {
      state.isFetchingInitialData = action.payload;
    },
    setNotesData: (
      state,
      action: PayloadAction<{
        notesData: GetNotesDataResponseModel;
        isFetchingWithFilter: boolean;
        isCanDnD: boolean;
      }>,
    ) => {
      state.notesData = action.payload.notesData;
      state.isCanDnD = action.payload.isCanDnD;
      state.isListOver = isListOver(action.payload.notesData);
      state.isFetchingWithFilter = action.payload.isFetchingWithFilter;
    },
    setNewNotesData(state, action) {
      state.notesData.data = action.payload;
    },
    updateNote: (state, action: PayloadAction<NoteItemModel>) => {
      state.notesData.data = state.notesData.data.map((item: NoteItemModel) => {
        if (item.id === action.payload.id) {
          return action.payload;
        }
        return item;
      });
    },

    setNoteUserNotification: (state, action: PayloadAction<{ id: number }>) => {
      state.notesData.data = state.notesData.data.map((item: NoteItemModel) => {
        if (item.id === action.payload.id) {
          return { ...item, userNotification: null };
        }
        return item;
      });
    },

    setNotesLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },

    setMoreNotesData: (
      state,
      action: PayloadAction<{
        notesData: GetNotesDataResponseModel;
        isFetchingWithFilter: boolean;
        isCanDnD: boolean;
      }>,
    ) => {
      if (state.notesData?.meta) {
        state.notesData = {
          ...action.payload.notesData,
          data: [...state.notesData.data, ...action.payload.notesData.data],
        };
      }
      state.isCanDnD = action.payload.isCanDnD;
      state.isListOver = isListOver(action.payload.notesData);
      state.isFetchingWithFilter = action.payload.isFetchingWithFilter;
    },

    setNotesFilters: (state, action: PayloadAction<object>) => {
      localStorage.setItem('notesFilters', JSON.stringify(action.payload));
      state.filters = { ...state.filters, ...action.payload };
      state.isListOver = false;
    },

    removeNote: (state, action: PayloadAction<number>) => {
      state.notesData = {
        ...state.notesData,
        data: state.notesData.data.filter((item: NoteItemModel) => item.id !== action.payload),
      };
    },

    changeNoteIsOpenValue: (state, action: PayloadAction<{ noteId: number; is_open: number }>) => {
      state.notesData.data = state.notesData.data.map((item: NoteItemModel) => {
        if (item.id === action.payload.noteId) {
          return { ...item, is_open: action.payload.is_open };
        }
        return item;
      });
    },

    resetNotesData: (state) => {
      return { ...initialState, filters: state.filters };
    },
  },
});

export const {
  addNote,
  setNotesFilters,
  setNotesData,
  setNotesLoading,
  removeNote,
  updateNote,
  resetNotesData,
  setNoteUserNotification,
  setNewNotesData,
  setMoreNotesData,
  changeNoteIsOpenValue,
  toggleFetchingInitialData,
} = notesSlice.actions;
export default notesSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { NotesItemModel } from '../../shared/models/notes/notesItem.model';
import { GetNotesResponseModel } from '../../shared/models/notes/getNotesResponse.model';
import { isListOver } from '../../shared/functions/isListOver';

export interface ChecklistsState {
  notesData: GetNotesResponseModel | any;
  isListOver: boolean | number;
}

const initialState: ChecklistsState = {
  notesData: { data: [] },
  isListOver: false,
};

export const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNotesItem: (state, action: PayloadAction<NotesItemModel>) => {
      state.notesData.data.unshift(action.payload);
    },
    setNotesData: (state, action: PayloadAction<GetNotesResponseModel>) => {
      state.notesData = action.payload;
      state.isListOver = isListOver(action.payload);
    },
    setMoreNotesData: (state, action: PayloadAction<GetNotesResponseModel>) => {
      state.notesData = {
        ...action.payload,
        data: [...state.notesData.data, ...action.payload.data],
      };
      state.isListOver = isListOver(action.payload);
    },
    removeNotesItem: (state, action: PayloadAction<number>) => {
      state.notesData.data = state.notesData.data.filter(
        (item: NotesItemModel) => item.id !== action.payload,
      );
    },
    updateNotesItemFormList: (state, action: PayloadAction<NotesItemModel>) => {
      state.notesData.data = state.notesData.data.map((item: NotesItemModel) => {
        if (item.id === action.payload.id) {
          return action.payload;
        }
        return item;
      });
    },
    resetNotesData: () => {
      return initialState;
    },
  },
});
export const {
  addNotesItem,
  setMoreNotesData,
  removeNotesItem,
  setNotesData,
  resetNotesData,
  updateNotesItemFormList,
} = notesSlice.actions;
export default notesSlice.reducer;

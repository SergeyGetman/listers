import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ChecklistItemModel } from '../../shared/models/checklists/checklistItem.model';
import { getChecklists } from './checklistsThunk';

export interface ChecklistsState {
  checklistData: ChecklistItemModel[];
}

const initialState: ChecklistsState = {
  checklistData: [],
};

export const checklistsSlice = createSlice({
  name: 'checklists',
  initialState,
  reducers: {
    addChecklistItem: (state, action: PayloadAction<ChecklistItemModel>) => {
      state.checklistData.unshift(action.payload);
    },
    changeChecklistItemStatus: (state, action: PayloadAction<ChecklistItemModel>) => {
      state.checklistData = state.checklistData.map((item) => {
        if (item.id === action.payload.id) {
          return action.payload;
        }
        return item;
      });
    },
    updateChecklistItemFromList: (state, action: PayloadAction<ChecklistItemModel>) => {
      state.checklistData = state.checklistData.map((item) => {
        if (item.id === action.payload.id) {
          return action.payload;
        }
        return item;
      });
    },
    deleteChecklistItem: (state, action: PayloadAction<number>) => {
      state.checklistData = state.checklistData.filter((item) => item.id !== action.payload);
    },
    resetChecklistsData: () => {
      return initialState;
    },
  },

  extraReducers: ({ addCase }) => {
    addCase(getChecklists.fulfilled, (state, { payload }) => {
      state.checklistData = payload.data;
    });
  },
});
export const {
  addChecklistItem,
  deleteChecklistItem,
  changeChecklistItemStatus,
  resetChecklistsData,
  updateChecklistItemFromList,
} = checklistsSlice.actions;
export default checklistsSlice.reducer;

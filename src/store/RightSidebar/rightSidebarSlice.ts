import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChecklistItemModel } from '../../shared/models/checklists/checklistItem.model';
import {
  createRightSidebarChecklistItem,
  createNotesItem,
  deleteChecklistItem,
  deleteNotesItem,
  getRightSidebarChecklists,
  getRightSidebarNotes,
  updateChecklistItem,
} from './rightSidebarActions';
import { NotesItemModel } from '../../shared/models/notes/notesItem.model';

export interface RightSidebar {
  isOpenRightSidebar: boolean;
  isGetInitialData: boolean;
  isShowInputLoader: boolean;
  rightSidebarSelectedTab: string;
  rightSidebarChecklistData: ChecklistItemModel[];
  rightSidebarNotesData: NotesItemModel[];
}

const initialState: RightSidebar = {
  isOpenRightSidebar: false,
  isGetInitialData: false,
  isShowInputLoader: false,
  rightSidebarSelectedTab: '',
  rightSidebarChecklistData: [],
  rightSidebarNotesData: [],
};

export const rightSidebarSlice = createSlice({
  name: 'rightSidebarSlice',
  initialState,
  reducers: {
    toggleOpenRightSidebar: (state, action: PayloadAction<boolean>) => {
      state.isOpenRightSidebar = action.payload;
    },
    toggleGetInitialData: (state, action: PayloadAction<boolean>) => {
      state.isGetInitialData = action.payload;
    },
    toggleShowInputLoader: (state, action: PayloadAction<boolean>) => {
      state.isShowInputLoader = action.payload;
    },
    setRightSidebarSelectedTab: (state, action: PayloadAction<string>) => {
      state.rightSidebarSelectedTab = action.payload;
    },

    resetRightSidebarChecklistState: (state) => {
      state.rightSidebarChecklistData = initialState.rightSidebarChecklistData;
      state.isShowInputLoader = initialState.isShowInputLoader;
      state.isGetInitialData = initialState.isGetInitialData;
    },
    resetRightSidebarNotesState: (state) => {
      state.rightSidebarNotesData = initialState.rightSidebarNotesData;
      state.isShowInputLoader = initialState.isShowInputLoader;
      state.isGetInitialData = initialState.isGetInitialData;
    },
  },
  extraReducers: ({ addCase }) => {
    addCase(getRightSidebarChecklists.fulfilled, (state, { payload }) => {
      state.rightSidebarChecklistData = payload.data;
    });
    addCase(createRightSidebarChecklistItem.fulfilled, (state, { payload }) => {
      state.rightSidebarChecklistData.unshift(payload);
    });
    addCase(updateChecklistItem.fulfilled, (state, { payload }) => {
      state.rightSidebarChecklistData = state.rightSidebarChecklistData.map((item) => {
        if (item.id === payload.id) {
          return payload;
        }
        return item;
      });
    });
    addCase(deleteChecklistItem.fulfilled, (state, { payload }) => {
      state.rightSidebarChecklistData = state.rightSidebarChecklistData.filter((item) => item.id !== payload);
    });
    addCase(getRightSidebarNotes.fulfilled, (state, { payload }) => {
      state.rightSidebarNotesData = payload.data;
    });

    addCase(createNotesItem.fulfilled, (state, { payload }) => {
      state.rightSidebarNotesData.unshift(payload);
    });
    addCase(deleteNotesItem.fulfilled, (state, { payload }) => {
      state.rightSidebarNotesData = state.rightSidebarNotesData.filter((item) => item.id !== payload);
    });
  },
});

export const {
  toggleOpenRightSidebar,
  setRightSidebarSelectedTab,
  toggleGetInitialData,
  toggleShowInputLoader,
  resetRightSidebarChecklistState,
  resetRightSidebarNotesState,
} = rightSidebarSlice.actions;
export default rightSidebarSlice.reducer;

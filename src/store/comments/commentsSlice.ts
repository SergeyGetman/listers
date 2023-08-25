import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ChecklistItemModel } from '../../shared/models/checklists/checklistItem.model';
import { isListOver } from '../../shared/functions/isListOver';
import { GetCommentsResponseModel } from '../../shared/models/comments/getCommentsResponse.model';
import { CommentsItemModel } from '../../shared/models/comments/commentsItem.model';

export interface ChecklistsState {
  commentsData: ChecklistItemModel[] | any;
  isListOver: boolean | number;
}

const initialState: ChecklistsState = {
  commentsData: [],
  isListOver: false,
};

export const commentsSlice = createSlice({
  name: 'checklists',
  initialState,
  reducers: {
    addCommentsItem: (state, action: PayloadAction<CommentsItemModel>) => {
      state.commentsData.data.push(action.payload);
    },
    removeCommentsItem: (state, action: PayloadAction<number>) => {
      state.commentsData.data = state.commentsData.data.filter(
        (item: CommentsItemModel) => item.id !== action.payload,
      );
    },
    setCommentsData: (state, action: PayloadAction<GetCommentsResponseModel>) => {
      state.commentsData = action.payload;
      state.isListOver = isListOver(action.payload);
    },
    setMoreCommentsData: (state, action: PayloadAction<GetCommentsResponseModel>) => {
      state.commentsData = {
        ...action.payload,
        data: [...action.payload.data, ...state.commentsData.data],
      };
      state.isListOver = isListOver(action.payload);
    },
    resetCommentsData: () => {
      return initialState;
    },
  },
});
export const {
  addCommentsItem,
  removeCommentsItem,
  setCommentsData,
  setMoreCommentsData,
  resetCommentsData,
} = commentsSlice.actions;
export default commentsSlice.reducer;

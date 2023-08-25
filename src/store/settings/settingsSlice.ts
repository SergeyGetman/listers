import { createSlice } from '@reduxjs/toolkit';
import { PlanModel } from '../../shared/models/plans.model';
import { getPlans } from './settingsThunk';

type SettingsType = {
  plans: {
    data: PlanModel[];
  };
};

const initialState: SettingsType = {
  plans: {
    data: [],
  },
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    resetPlansState(state) {
      state.plans = initialState.plans;
    },
  },

  extraReducers: ({ addCase }) => {
    addCase(getPlans.fulfilled, (state, { payload }) => {
      state.plans.data = payload;
    });
  },
});

export const { resetPlansState } = settingsSlice.actions;
export default settingsSlice.reducer;

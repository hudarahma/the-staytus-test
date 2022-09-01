import { createSlice } from '@reduxjs/toolkit';

export const formSlice = createSlice({
  name: 'form',
  initialState: {
    form: {},
  },
  reducers: {
    update: (state, action) => {
      state.form = action.payload;
    },
  },
});

export const { update } = formSlice.actions;
export default formSlice.reducer;

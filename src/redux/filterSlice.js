import { createSlice } from '@reduxjs/toolkit';

const filtersInitialState = '';
const filterSlice = createSlice({
  name: 'filter',
  initialState: filtersInitialState,
  reducers: {
    setFilter: {
      reducer(state, action) {
        return (state = action.payload.id);
      },
      prepare(id) {
        return {
          payload: {
            id,
          },
        };
      },
    },
  },
});

export const { setFilter } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;

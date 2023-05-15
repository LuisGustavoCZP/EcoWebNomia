import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../store'
import { IFilter } from '../../interfaces'

interface IFilterPayload 
{
  type : string;
  filter: IFilter;
}

const initialState : IFilter = {
  debts: {}
}

export const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<IFilterPayload>) => {
      state[action.payload.type] = action.payload.filter;
    }
  },
})

export const filtersState = (state : RootState) => state.filters;

// Action creators are generated for each case reducer function
export const filtersActions = filtersSlice.actions

export const filtersReducer = filtersSlice.reducer
import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { IDebt } from '../../models'
import { RootState } from '../../store'

interface IDebtsState {
  debts: IDebt[]
}

const initialState: IDebtsState = {
  debts: []
}

export const debtsSlice = createSlice({
  name: 'debts',
  initialState,
  reducers: {
    setDebts: (state, action: PayloadAction<IDebt[]>) => 
    {
      state.debts = action.payload;
    },
  },
})

export const debtsState = (state : RootState) => state.debts;

// Action creators are generated for each case reducer function
export const { setDebts } = debtsSlice.actions

export const debtsReducer = debtsSlice.reducer
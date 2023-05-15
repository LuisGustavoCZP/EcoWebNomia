import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../store'
import { IAuth } from '../../interfaces'

const initialState: IAuth = {
    token: "",
    id: -1,
    name: ""
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<IAuth>) => {
      state.token = action.payload.token;
      state.id = action.payload.id;
      state.name = action.payload.name;
    },
    removeAuth: (state) => {
        state.token = "";
        state.id = -1;
        state.name = "";
    }
  },
})

export const authState = (state : RootState) => state.auth;

// Action creators are generated for each case reducer function
export const { setAuth, removeAuth } = authSlice.actions

export const authReducer = authSlice.reducer
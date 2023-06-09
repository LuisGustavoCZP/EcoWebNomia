import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { IBaseUser } from '../../interfaces'
import { RootState } from '../../store'

interface IUsersState {
  users: IBaseUser[] | undefined
}

const initialState: IUsersState = {
  users: undefined
}

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<IBaseUser[]>) => 
    {
      state.users = action.payload;
    },
  },
})

export const usersState = (state : RootState) => state.users;

// Action creators are generated for each case reducer function
export const { setUsers } = usersSlice.actions

export const usersReducer = usersSlice.reducer
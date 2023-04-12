import { configureStore } from '@reduxjs/toolkit'
import { authReducer, usersReducer, debtsReducer } from '../features'

export const store = configureStore({
  reducer: {
    auth:authReducer,
    users:usersReducer,
    debts:debtsReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
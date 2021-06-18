import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import todoReducer from './slices/todoSlice'
import userReducer from './slices/userSlice'

export const store = configureStore({
  reducer: {
    todo: todoReducer,
    user: userReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>

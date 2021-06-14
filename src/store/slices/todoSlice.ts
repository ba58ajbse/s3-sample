import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { AppThunk, RootState } from '../store'
import { TodoType } from '../../interfaces/types'

const URL = process.env.REACT_APP_DB_URL as string

const initialState: TodoType[] = []

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    getAll: (_, action: PayloadAction<TodoType[]>) => {
      return action.payload
    },
    addTodo: (state, action: PayloadAction<TodoType>) => {
      return [
        ...state,
        {
          id: action.payload.id,
          todo: action.payload.todo,
          completed: action.payload.completed,
        },
      ]
    },
  },
})

export const { getAll, addTodo } = todoSlice.actions

export const getAllAsync = (): AppThunk => async (dispatch) => {
  const todos = await axios
    .get(URL)
    .then((res) => res.data.body.Items)
    .catch((error) => console.log(error))
  console.log({ todos })

  dispatch(getAll(todos))
}

export const addTodoAsync =
  (data: TodoType): AppThunk =>
  async (dispatch) => {
    const todo = await axios
      .post(URL, data)
      .then((res) => res.data.body)
      .catch((error) => console.log(error))
    console.log({ todo })
    dispatch(addTodo(todo))
  }

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const selectTodo = (state: RootState) => state.todo

export default todoSlice.reducer

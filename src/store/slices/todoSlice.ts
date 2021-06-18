import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { AppThunk, RootState } from '../store'
import { TodoType } from '../../interfaces/types'

const URL = process.env.REACT_APP_DB_URL as string

const initialState: TodoType[] = []
type UpdateType = {
  id: string
  completed: boolean
}
export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    getAll: (state, action: PayloadAction<TodoType[]>) => {
      return [...state, ...action.payload].filter((todo, i, self) => {
        return self.findIndex((selfTodo) => selfTodo.id === todo.id) === i
      })
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
    deleteTodo: (state, action: PayloadAction<string>) => {
      return [...state].filter((todo) => todo.id !== action.payload)
    },
    updateTodo: (state, action: PayloadAction<UpdateType>) => {
      return [...state].map((todo) => {
        if (todo.id !== action.payload.id) return todo
        return {
          ...todo,
          completed: action.payload.completed,
        }
      })
    },
  },
})

export const { getAll, addTodo, deleteTodo, updateTodo } = todoSlice.actions

export const getAllAsync =
  (token: string): AppThunk =>
  async (dispatch) => {
    const todos = await axios
      .get(URL, { headers: { Authorization: token } })
      .then((res) => res.data.body.Items)
      .catch((error) => console.log(error))

    dispatch(getAll(todos))
  }

export const addTodoAsync =
  (data: TodoType, token: string): AppThunk =>
  async (dispatch) => {
    const todo = await axios
      .post(URL, data, { headers: { Authorization: token } })
      .then((res) => res.data.body)
      .catch((error) => console.log(error))

    dispatch(addTodo(todo))
  }

export const deleteTodoAsync =
  (id: string, token: string): AppThunk =>
  async (dispatch) => {
    const resId = await axios
      .delete(URL, { params: { id: id }, headers: { Authorization: token } })
      .then((res) => res.data.body.id)
      .catch((error) => console.log(error))

    dispatch(deleteTodo(resId))
  }

export const updateTodoAsync =
  (id: string, completed: boolean, token: string): AppThunk =>
  async (dispatch) => {
    const res = await axios
      .put(URL, { id: id, completed: !completed }, { headers: { Authorization: token } })
      .then((res) => res.data.body)
      .catch((error) => console.log(error))

    dispatch(updateTodo({ id: res.id, completed: res.completed }))
  }

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const selectTodo = (state: RootState) => state.todo

export default todoSlice.reducer

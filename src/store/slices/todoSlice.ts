import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { AppThunk, RootState } from '../store'
import { TodoType } from '../../interfaces/types'
import { Auth } from 'aws-amplify'

const URL = process.env.REACT_APP_DB_URL as string

const initialState: TodoType[] = []

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
    updateTodo: (state, action: PayloadAction<Pick<TodoType, 'id' | 'completed'>>) => {
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

export const getAllAsync = (): AppThunk => async (dispatch) => {
  const token = await getJwt()
  const todos = await axios
    .get(URL, { headers: { Authorization: token } })
    .then((res) => res.data.body.Items)
    .catch((error) => console.log(error))

  dispatch(getAll(todos))
}

export const addTodoAsync =
  (data: TodoType): AppThunk =>
  async (dispatch) => {
    const token = await getJwt()
    const todo = await axios
      .post(URL, data, { headers: { Authorization: token } })
      .then((res) => res.data.body)
      .catch((error) => console.log(error))

    dispatch(addTodo(todo))
  }

export const deleteTodoAsync =
  (id: string): AppThunk =>
  async (dispatch) => {
    const token = await getJwt()
    const resId = await axios
      .delete(URL, { params: { id: id }, headers: { Authorization: token } })
      .then((res) => res.data.body.id)
      .catch((error) => console.log(error))

    dispatch(deleteTodo(resId))
  }

export const updateTodoAsync =
  (id: string, completed: boolean): AppThunk =>
  async (dispatch) => {
    const token = await getJwt()
    const res = await axios
      .put(URL, { id: id, completed: !completed }, { headers: { Authorization: token } })
      .then((res) => res.data.body)
      .catch((error) => console.log(error))

    dispatch(updateTodo({ id: res.id, completed: res.completed }))
  }

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const selectTodo = (state: RootState) => state.todo

const getJwt = async () => {
  const jwtToken = await Auth.currentSession()
    .then((session) => session.getIdToken())
    .then((idToken) => idToken.getJwtToken())
    .catch((error) => console.log(error))

  return jwtToken
}
export default todoSlice.reducer

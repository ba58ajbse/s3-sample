import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { AppThunk, RootState } from '../store'
import { TodoType } from '../../interfaces/types'
import { Auth } from 'aws-amplify'

const URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3030/dev/todos/'
    : (process.env.REACT_APP_DB_URL as string)

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

export const getAllAsync =
  (token: string): AppThunk =>
  async (dispatch) => {
    const todos = await axios
      .get(URL, { headers: { Authorization: token } })
      .then((res) => res.data.todoList)
      .catch((error) => console.log(error))

    dispatch(getAll(todos))
  }

export const addTodoAsync =
  (data: TodoType, token: string): AppThunk =>
  async (dispatch) => {
    const todo = await axios
      .post(URL, data, { headers: { Authorization: token } })
      .then((res) => res.data)
      .catch((error) => console.log(error))

    dispatch(addTodo(todo))
  }

export const deleteTodoAsync =
  (id: string, token: string): AppThunk =>
  async (dispatch) => {
    const resId = await axios
      .delete(`${URL}${id}`, { headers: { Authorization: token } })
      .then((res) => res.data.id)
      .catch((error) => console.log(error))

    dispatch(deleteTodo(resId))
  }

export const updateTodoAsync =
  (id: string, todo: string, completed: boolean, token: string): AppThunk =>
  async (dispatch) => {
    const res = await axios
      .patch(`${URL}${id}`, { todo, completed: !completed }, { headers: { Authorization: token } })
      .then((res) => res.data)
      .catch((error) => console.log(error))

    dispatch(updateTodo({ id: res.id, completed: res.completed }))
  }

const getToken = async () => {
  const session = await Auth.currentSession()
  const token = session.getIdToken().getJwtToken()

  return token
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const selectTodo = (state: RootState) => state.todo

export default todoSlice.reducer

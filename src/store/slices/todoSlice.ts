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
      if (!Array.isArray(action.payload) || !action.payload.length) {
        return state
      }
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
          createdAt: action.payload.createdAt,
          updatedAt: action.payload.updatedAt,
        },
      ]
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      return [...state].filter((todo) => todo.id !== action.payload)
    },
    updateTodo: (
      state,
      action: PayloadAction<Pick<TodoType, 'id' | 'completed' | 'updatedAt'>>
    ) => {
      return [...state].map((todo) => {
        if (todo.id !== action.payload.id) return todo
        return {
          ...todo,
          completed: action.payload.completed,
          updatedAt: action.payload.updatedAt,
        }
      })
    },
  },
})

export const { getAll, addTodo, deleteTodo, updateTodo } = todoSlice.actions

export const getAllAsync = (): AppThunk => async (dispatch) => {
  let todos = []
  const token = await getToken()
  const items = await axios
    .get(URL, { headers: { Authorization: token } })
    .then((res) => JSON.parse(res.data.body))
    .catch((error) => console.log(error))

  if (Array.isArray(items) && items.length) {
    todos = items.map((item) => {
      return { id: item.id, ...item.todos }
    })
  }

  dispatch(getAll(todos))
}

export const addTodoAsync =
  (data: Pick<TodoType, 'id' | 'todo'>): AppThunk =>
  async (dispatch) => {
    const token = await getToken()
    const body = await axios
      .post(URL, data, { headers: { Authorization: token } })
      .then((res) => JSON.parse(res.data.body))
      .catch((error) => console.log(error))

    dispatch(addTodo(body.todo))
  }

export const deleteTodoAsync =
  (id: string): AppThunk =>
  async (dispatch) => {
    const token = await getToken()
    const body = await axios
      .delete(`${URL}${id}`, { headers: { Authorization: token } })
      .then((res) => JSON.parse(res.data.body))
      .catch((error) => console.log(error))

    dispatch(deleteTodo(body.id))
  }

export const updateTodoAsync =
  (id: string, todo: string, completed: boolean): AppThunk =>
  async (dispatch) => {
    const token = await getToken()
    const res = await axios
      .patch(`${URL}${id}`, { todo, completed: !completed }, { headers: { Authorization: token } })
      .then((res) => JSON.parse(res.data.body))
      .catch((error) => console.log(error))

    dispatch(updateTodo({ id: res.id, completed: res.completed, updatedAt: res.updatedAt }))
  }

const getToken = async () => {
  const session = await Auth.currentSession()
  const token = session.getIdToken().getJwtToken()

  return token
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const selectTodo = (state: RootState) => state.todo

export default todoSlice.reducer

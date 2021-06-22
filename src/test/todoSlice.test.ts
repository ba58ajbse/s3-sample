import reducer, { addTodo, deleteTodo, getAll, updateTodo } from '../store/slices/todoSlice'
import { TodoType } from '../interfaces/types'

describe('TodoList Test', () => {
  let initialState: TodoType[] = [{ id: 'abcd1234', todo: 'JavaScript', completed: false }]

  it('get all todo list', () => {
    const payload = [{ id: 'wxyz4321', todo: 'React', completed: false }]
    const action = {
      type: getAll.type,
      payload: payload,
    }
    const state = reducer(initialState, action)
    expect(state).toEqual([...initialState, ...payload])
  })

  it('add todo list', () => {
    const payload = { id: '1234abcd', todo: 'Vue', completed: false }
    const action = {
      type: addTodo.type,
      payload: payload,
    }
    const state = reducer(initialState, action)
    expect(state).toEqual([...initialState, payload])
  })

  it('delete todo', () => {
    initialState = [
      { id: 'abcd1234', todo: 'JavaScript', completed: false },
      { id: 'efgh5678', todo: 'Vue', completed: false },
    ]
    const payload = 'efgh5678'
    const action = {
      type: deleteTodo.type,
      payload: payload,
    }
    const state = reducer(initialState, action)
    expect(state.length).toEqual(1)
    expect(state).toEqual([{ id: 'abcd1234', todo: 'JavaScript', completed: false }])
  })

  it('update todo', () => {
    initialState = [{ id: 'abcd1234', todo: 'JavaScript', completed: false }]
    const payload = { id: 'abcd1234', completed: true }
    const action = {
      type: updateTodo.type,
      payload: payload,
    }
    const state = reducer(initialState, action)
    expect(state).toEqual([{ id: 'abcd1234', todo: 'JavaScript', completed: true }])
  })
})

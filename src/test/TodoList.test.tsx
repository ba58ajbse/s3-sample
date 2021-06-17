import reducer, { getAll } from '../store/slices/todoSlice'
import { TodoType } from '../interfaces/types'

describe('TodoList Test', () => {
  const initialState: TodoType[] = [
    { id: 'abcd1234', todo: 'JavaScript', completed: false },
  ]

  it('get all todo list', () => {
    const payload = [{ id: 'wxyz4321', todo: 'React', completed: false }]
    const action = {
      type: getAll.type,
      payload: payload,
    }
    const state = reducer(initialState, action)
    expect(state).toEqual([...initialState, ...payload])
  })
})

import React, { useEffect } from 'react'
import styled from 'styled-components'
import TodoInput from './TodoInput'
import Header from './Header'
import TodoList from './TodoList'
import { setUserInfoAsync } from '../store/slices/userSlice'
import { useDispatch } from 'react-redux'

const App: React.FC = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setUserInfoAsync())
  }, [])

  return (
    <Container>
      <Header />
      <TodoInput />
      <TodoList />
    </Container>
  )
}

export default App

const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  background-color: #282c34;
`

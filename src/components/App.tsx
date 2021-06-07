import React from 'react'
import styled from 'styled-components'
import TodoInput from './TodoInput'
import { AmplifyAuthenticator } from '@aws-amplify/ui-react'
import Header from './Header'
import TodoList from './TodoList'

const App: React.FC = () => {
  return (
    <AmplifyAuthenticator>
      <Container>
        <Header />
        <TodoInput />
        <TodoList />
      </Container>
    </AmplifyAuthenticator>
  )
}

export default App

const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  background-color: #282c34;
`

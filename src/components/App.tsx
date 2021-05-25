import React from 'react'
import { Flex } from '@chakra-ui/react'
import TodoInput from './TodoInput'

const App: React.FC = () => {
  return (
    <Flex
      minHeight="100vh"
      maxWidth="full"
      align="center"
      justifyContent="center"
      backgroundColor="#282c34"
    >
      <TodoInput />
    </Flex>
  )
}

export default App

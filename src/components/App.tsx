import React from 'react'
import { Flex } from '@chakra-ui/react'
import TodoInput from './TodoInput'
import { AmplifyAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'

const App: React.FC = () => {
  return (
    <AmplifyAuthenticator>
      <AmplifySignOut />
      <Flex
        minHeight="100vh"
        width="full"
        justifyContent="center"
        backgroundColor="#282c34"
      >
        <TodoInput />
      </Flex>
    </AmplifyAuthenticator>
  )
}

export default App

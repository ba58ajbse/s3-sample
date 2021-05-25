import React from 'react'
import { Stack, Input } from '@chakra-ui/react'

const TodoInput: React.FC = () => {
  return (
    <Stack spacing={3}>
      <Input w="600px" variant="flushed" placeholder="Todo" />
    </Stack>
  )
}

export default TodoInput

import React, { useState, ChangeEvent, FormEvent } from 'react'
import { Box, Input, Button, HStack } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'

const TodoInput: React.FC = () => {
  const [value, setValue] = useState('')

  const addTodo = (e: FormEvent<HTMLFormElement>) => {
    if (value === '') return
    e.preventDefault()
    console.log(value)
    setValue('')
  }

  return (
    <Box paddingTop="32px">
      <form onSubmit={(e) => addTodo(e)}>
        <HStack spacing="16px">
          <Input
            type="text"
            width="640px"
            color="white"
            variant="flushed"
            placeholder="Todo"
            size="lg"
            value={value}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setValue(e.target.value)
            }
          />
          <Button type="submit">
            <AddIcon />
          </Button>
        </HStack>
      </form>
    </Box>
  )
}

export default TodoInput

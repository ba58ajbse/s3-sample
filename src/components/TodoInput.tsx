import React, { useState, ChangeEvent, FormEvent } from 'react'
import { Box, Input, Button } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import styled from 'styled-components'

const TodoInput: React.FC = () => {
  const [value, setValue] = useState('')

  const addTodo = (e: FormEvent<HTMLFormElement>) => {
    if (value === '') return
    e.preventDefault()
    console.log(value)
    setValue('')
  }

  return (
    <Box paddingTop="32px" maxW="880" m="0 auto">
      <StyledForm onSubmit={(e) => addTodo(e)}>
        <Input
          type="text"
          width="640px"
          color="white"
          variant="flushed"
          placeholder="Todo"
          size="lg"
          marginRight="12px"
          value={value}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setValue(e.target.value)
          }
        />
        <Button type="submit">
          <AddIcon />
        </Button>
      </StyledForm>
    </Box>
  )
}

export default TodoInput

const StyledForm = styled.form`
  text-align: center;
`

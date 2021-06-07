import { Box, List } from '@chakra-ui/layout'
import React from 'react'
import TodoItem from './TodoItem'

const TodoList: React.FC = () => {
  const todoList = [
    { id: 0, todo: 'PHP' },
    { id: 1, todo: 'JavaScript' },
    { id: 2, todo: 'Rust' },
  ]
  return (
    <Box maxW="720" m="0 auto">
      <List p="0 20px 0 20px" color="white">
        {todoList &&
          todoList.map((todo) => <TodoItem key={todo.id} todoItem={todo} />)}
      </List>
    </Box>
  )
}

export default TodoList

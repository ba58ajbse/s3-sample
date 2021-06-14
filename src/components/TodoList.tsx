import { Box, List } from '@chakra-ui/layout'
import React, { useEffect } from 'react'
import TodoItem from './TodoItem'
import { useDispatch, useSelector } from 'react-redux'
import { selectTodo, getAllAsync } from '../store/slices/todoSlice'

const TodoList: React.FC = () => {
  const todoList = useSelector(selectTodo)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllAsync())
  }, [])

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
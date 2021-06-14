import React from 'react'
import { useDispatch } from 'react-redux'
import { DeleteIcon } from '@chakra-ui/icons'
import { Checkbox, ListItem } from '@chakra-ui/react'
import { TodoType } from '../interfaces/types'
import { deleteTodoAsync } from '../store/slices/todoSlice'

type PropType = {
  todoItem: TodoType
}
const TodoItem: React.FC<PropType> = ({ todoItem }) => {
  const dispatch = useDispatch()

  const deleteTodo = async (id: string) => {
    dispatch(deleteTodoAsync(id))
  }

  return (
    <ListItem marginBottom="12px" display="flex" position="relative">
      <Checkbox marginRight="16px" iconSize="1.8" />
      {todoItem.todo}
      <DeleteIcon
        position="absolute"
        right="0"
        bottom="0"
        cursor="pointer"
        onClick={() => deleteTodo(todoItem.id)}
      />
    </ListItem>
  )
}

export default TodoItem

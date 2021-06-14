import React from 'react'
import { DeleteIcon } from '@chakra-ui/icons'
import { Checkbox, ListItem } from '@chakra-ui/react'
import { TodoType } from '../interfaces/types'

type PropType = {
  todoItem: TodoType
}
const TodoItem: React.FC<PropType> = ({ todoItem }) => {
  return (
    <ListItem marginBottom="12px" display="flex" position="relative">
      <Checkbox marginRight="16px" iconSize="1.8" />
      {todoItem.todo}
      <DeleteIcon position="absolute" right="0" bottom="0" cursor="pointer" />
    </ListItem>
  )
}

export default TodoItem
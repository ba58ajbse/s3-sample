import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DeleteIcon } from '@chakra-ui/icons'
import { ListItem } from '@chakra-ui/react'
import { TodoType } from '../interfaces/types'
import { deleteTodoAsync, updateTodoAsync } from '../store/slices/todoSlice'
import { selectUser } from '../store/slices/userSlice'
import styled from 'styled-components'

type PropType = {
  todoItem: TodoType
}

const TodoItem: React.FC<PropType> = ({ todoItem }) => {
  const dispatch = useDispatch()
  const { token } = useSelector(selectUser)

  const deleteTodo = (id: string) => {
    dispatch(deleteTodoAsync(id, token))
  }

  const toggleTodoChecked = (id: string, todo: string, completed: boolean) => {
    dispatch(updateTodoAsync(id, todo, completed, token))
  }

  return (
    <ListItem h="24px" marginBottom="12px" display="flex" position="relative">
      <StyledCheckbox
        id={todoItem.id}
        type="checkbox"
        checked={todoItem.completed}
        onChange={() => toggleTodoChecked(todoItem.id, todoItem.todo, todoItem.completed)}
      />
      <StyledLabel htmlFor={todoItem.id} completed={todoItem.completed}>
        {todoItem.todo}
      </StyledLabel>
      <DeleteIcon
        position="absolute"
        top="6px"
        right="0"
        cursor="pointer"
        onClick={() => deleteTodo(todoItem.id)}
      />
    </ListItem>
  )
}

export default TodoItem

const StyledCheckbox = styled.input`
  margin: 6px 16px 0 0;
`

const StyledLabel = styled.label<{ completed: boolean }>`
  color: ${(props) => (props.completed ? 'gray' : 'inherit')};
  text-decoration: ${(props) => (props.completed ? 'line-through' : 'none')};
`

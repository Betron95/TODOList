import styled from 'styled-components';

export const Button = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: palevioletred;
  margin: 0.5em 1em;
  padding: 0.25em 1em;
  &:hover, &:active, &:focus {
    background: palevioletred;
    color: white;
    outline: none;
  }
`

export const Head = styled.header`
  background: transparent;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: palevioletred;
  margin: 0.5em 1em;
  padding: 0.25em 1em;
`
export const Title = styled.h1`
  text-align: center;
  color: palevioletred;
`
export const NewToDo = styled.div`
  text-align: center;
`

export const ToDoListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`

export const ToDoListItemsContainer = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const ToDoListItemStyled = styled.li`
  display: flex;
  align-items: center;
  margin: 0 15px 15px 15px;
`

interface ToDoListsItemNameProps {
  readonly isActive?: boolean;
};

export const ToDoListsItemName = styled.div<ToDoListsItemNameProps>`
  padding-right: 10px;
  color: ${props => props.isActive ? 'green' : 'black'};
`

interface ToDoListItemNameProps {
  readonly completed?: boolean;
};

export const ToDoListItemName = styled.label<ToDoListItemNameProps>`
  padding-right: 10px;
  color: ${props => props.completed ? 'green' : 'black'};
  text-decoration: ${props => props.completed ? 'line-through' : 'none'};
`

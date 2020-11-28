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

export const ToDoListItemStyled = styled.div`
  display: flex;
  align-items: center;
  margin: 0 15px 15px 15px;
`

interface ToDoListItemNameProps {
  readonly isActive?: boolean;
};

export const ToDoListItemName = styled.div<ToDoListItemNameProps>`
  padding-right: 10px;
  color: ${props => props.isActive ? 'green' : 'black'};
`
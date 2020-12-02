import styled from 'styled-components';

export const Button = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: ${props => props.theme.colors.main};
  margin: 0 1em;
  padding: 0.7em 2em;
  cursor: pointer;
  &:hover, &:active, &:focus {
    background: palevioletred;
    color: white;
    outline: none;
  }
`
export const Container = styled.div`
  display: flex;
  justify-content: center;
`

export const Title = styled.h1`
  text-align: center;
  color: palevioletred;
`
export const NewToDo = styled.div`
  text-align: center;
  margin-bottom: 25px;
`

export const ToDoListItemsContainer = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const ToDoListItemStyled = styled.li`
  display: flex;
  align-items: center;
  position: relative;
  margin: 0 15px 15px 15px;
`

interface ToDoListItemNameProps {
  readonly completed?: boolean;
};

export const ToDoListItemName = styled.label<ToDoListItemNameProps>`
  margin-right: 10px;
  width: 150px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: ${props => props.completed ? 'green' : 'black'};
  text-decoration: ${props => props.completed ? 'line-through' : 'none'};
`
export const Cross = styled.span`
  position: absolute;
  right:0;
  top: 0;
  width: 5px;
  height: 5px;
  opacity: 0.3;
  &:hover {
    opacity: 1;
    cursor: pointer;
    &:before, &:after {
      background-color: red;
    }
  }
  &:before, &:after {
    position: absolute;
    top: 1px;
    left: 15px;
    content: ' ';
    height: 20px;
    width: 2px;
    background-color: #333;
    transform: rotate(45deg);
  }
  &:after {
    transform: rotate(-45deg);
  }
`

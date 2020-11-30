import React, { useState, useContext } from 'react';
import { ToDoContext } from '../../context/context';
import { Title, ToDoListItemsContainer, NewToDo, Button } from '../../styles/common';
import ToDoListItem from '../ToDoListItem/ToDoListItem';
import { IToDoList, IToDoListItem } from '../ToDoLists/ToDoLists';

export interface ToDoListProps {
  currentList: IToDoList,
}

function ToDoList({ currentList }: ToDoListProps) {
  const { addTodoListItem } = useContext(ToDoContext);
  const [itemName, setItemName] = useState('');

  const changeNewItemName = (value: string) => {
    setItemName(value);
  }

  const addNewListItem = () => {
    if (addTodoListItem) {
      addTodoListItem(currentList, itemName)
    }
    changeNewItemName('');
  }

  return (
    <div>
      <Title>To Do Items:</Title>
      <NewToDo>
        <input type="text" value={itemName} onChange={({ target: { value } }) => changeNewItemName(value)} />
        <Button onClick={addNewListItem}>Add new Item</Button>
      </NewToDo>
      <ToDoListItemsContainer>
        {currentList.items.map(({ id, text, completed }: IToDoListItem) =>
          <ToDoListItem key={id} currentList={currentList} id={id} text={text} completed={completed} />)}
      </ToDoListItemsContainer>
    </div>
  )
}

export default ToDoList;
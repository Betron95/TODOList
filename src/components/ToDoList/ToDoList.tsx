import React, {useState, useContext} from 'react';
import { ToDoContext } from '../../context/context';
import { Title, ToDoListContainer, NewToDo, Button } from '../../styles/common';
import ToDoListItem from '../ToDoListItem/ToDoListItem';
import { IToDoList } from '../ToDoLists/ToDoLists';

export interface ToDoListProps {
  currentList: IToDoList,
}

export type ToDos = {  
  [key: string]: any
};


function ToDoList({ currentList }: ToDoListProps) {
  const {addTodoListItem} = useContext(ToDoContext);
  const [itemName, setItemName] = useState('');

  const changeNewItemName = (value: any) => {
    setItemName(value);
  }
  
  return (
    <div>
      <Title>To Do Items:</Title>
      <NewToDo>
        <input type="text" value={itemName} onChange={({target: {value}}) => changeNewItemName(value)} />
        <Button onClick={() => addTodoListItem(currentList, itemName)}>Add new Item</Button>
      </NewToDo>
      <ToDoListContainer>
        {currentList.items.map((todo: string) => <ToDoListItem key={todo} currentList={currentList} text={todo} />)}
      </ToDoListContainer>
    </div>
    )
}

export default ToDoList;
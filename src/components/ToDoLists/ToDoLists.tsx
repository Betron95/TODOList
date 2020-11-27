import React, { useState } from 'react';
import { ToDoContext } from "../../context/context";
import { Button, NewToDo, Title, ToDoListContainer, ToDoListItemStyled, ToDoListItemName } from '../../styles/common';
import ToDoList from '../ToDoList/ToDoList';
import { removeList } from '../utils/utils';

export interface IToDoList {
  name: string,
  items: string[],
}

function ToDoLists() {
  const [toDoLists, setToDoLists] = useState<IToDoList[]>(
    [
      {
        name: 'first',
        items: ['1', '2', '3'],
      },
      {
        name: 'second',
        items: ['4', '5', '6'],
      },
    ]
  );

  const addTodoListItem = (list: IToDoList, item: string) => {
    setToDoLists((todoList) => {
        const a = todoList.map((tl) => {
          if(tl === list) {
             return {...tl, items: [...list.items, item]} 
          }
          return tl;
        })
        return a;
    });
  }

  const [newListName, setNewListName] = useState('');

  const addTodoList = (newListName: string) => {
    setToDoLists(() => [...toDoLists, {name: newListName, items: []}]);
    setNewListName('');
  }

  const changeNewListName = (value: any) => {
    setNewListName(value);
  }

  const [currentList, setCurrentList] = useState<IToDoList>(toDoLists[0]);

  return (
    <ToDoContext.Provider value={{toDoLists, addTodoListItem}}>
    <div className="todos">
      <NewToDo>
        <Title>Create new list:</Title>
        <input type='text' value={newListName} onChange={({target: {value}}) => changeNewListName(value)} />
        <Button onClick={() => addTodoList(newListName)}>Add</Button>
      </NewToDo>
      <ToDoListContainer>
        {toDoLists.map((list, index) => 
        <ToDoListItemStyled key={index}>
          <ToDoListItemName onClick={() => {setCurrentList(list)}}>{list.name}</ToDoListItemName>
          <Button onClick={() => removeList(list.name, toDoLists, setToDoLists)}>Remove</Button>
          </ToDoListItemStyled>
        )}
      </ToDoListContainer>
    </div>
    <ToDoList currentList={currentList} />
    </ToDoContext.Provider>
  );
}

export default ToDoLists;
import React, { useState } from 'react';
import { ToDoContext } from "../../context/context";
import { Button, NewToDo, Title, ToDoListContainer, ToDoListItemStyled, ToDoListItemName } from '../../styles/common';
import ToDoList from '../ToDoList/ToDoList';

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

  const [newListName, setNewListName] = useState('');

  const addTodoList = (newListName: string) => {
    const newList = {name: newListName, items: []};
    setToDoLists(() => [...toDoLists,newList]);
    setCurrentList(newList);
    setNewListName('');
  }

  const removeTodoList = (list: IToDoList) => {
    setToDoLists(() => toDoLists.filter((iterableList: IToDoList) => iterableList !== list));
    if(list === currentList) {
      setCurrentList(null);
    }
  }

  const addTodoListItem = (list: IToDoList, item: string) => {
    setToDoLists((todoList) => {
        return todoList.map((tl) => {
          if(tl === list) {
            const updatedList = {...tl, items: [...list.items, item]};
            setCurrentList(updatedList);
            return updatedList
          }
          return tl;
        })
    });
  }

  const removeTodoListItem = (list: IToDoList, item: string) => {
    setToDoLists((todoList) => {
        return todoList.map((tl) => {
          if(tl === list) {
            const updatedList = {...tl, items: list.items.filter((iterableItem: string) => iterableItem !== item)};
            setCurrentList(updatedList);
            return updatedList;
          }
          return tl;
        })
    });
  }

  const changeNewListName = (value: any) => {
    setNewListName(value);
  }

  const [currentList, setCurrentList] = useState<IToDoList|null>(toDoLists[0]);

  return (
    <ToDoContext.Provider value={{toDoLists, addTodoListItem, removeTodoListItem}}>
      <div>
        <NewToDo>
          <Title>Create new list:</Title>
          <input type='text' value={newListName} onChange={({target: {value}}) => changeNewListName(value)} />
          <Button onClick={() => addTodoList(newListName)}>Add</Button>
        </NewToDo>
        <ToDoListContainer>
          {toDoLists.map((list, index) => 
            <ToDoListItemStyled key={index}>
              <ToDoListItemName isActive={list === currentList} onClick={() => {setCurrentList(list)}}>{list.name}</ToDoListItemName>
              <Button onClick={() => removeTodoList(list)}>Remove</Button>
            </ToDoListItemStyled>
          )}
        </ToDoListContainer>
      </div>
      {currentList && <ToDoList currentList={currentList} />}
    </ToDoContext.Provider>
  );
}

export default ToDoLists;
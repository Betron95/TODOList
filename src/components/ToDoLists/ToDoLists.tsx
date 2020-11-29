import React, { useState } from 'react';
import { ToDoContext } from "../../context/context";
import { Button, NewToDo, Title, ToDoListContainer, ToDoListItemStyled, ToDoListsItemName } from '../../styles/common';
import ToDoList from '../ToDoList/ToDoList';

export interface IToDoListItem {
  text: string,
  completed: boolean,
}

export interface IToDoList {
  name: string,
  items: IToDoListItem[],
}

function ToDoLists() {
  const [toDoLists, setToDoLists] = useState<IToDoList[]>(
    [
      {
        name: 'first',
        items: [{text: '1', completed: false}, {text: '2', completed: false}, {text: '3', completed: false}],
      },
      {
        name: 'second',
        items: [{text: '4', completed: false}, {text: '5', completed: false}, {text: '6', completed: false}],
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
            const updatedList = {...tl, items: [...list.items, {text: item, completed: false}]};
            setCurrentList(updatedList);
            return updatedList
          }
          return tl;
        })
    });
  }

  const handleChangeCompleteListItem = (list: IToDoList, item: IToDoListItem) => {
    setToDoLists((todoList) => {
      return todoList.map((tl) => {
        if(tl === list) {
          const updatedList = {...tl, items: [...list.items.map((iterableItem) => {
            if (iterableItem.text === item.text) {
              return {...item, completed: item.completed};
            }
            return iterableItem;
          })]};
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
            const updatedList = {...tl, items: list.items.filter((iterableItem: IToDoListItem) => iterableItem.text !== item)};
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
    <ToDoContext.Provider value={{toDoLists, addTodoListItem, removeTodoListItem, handleChangeCompleteListItem}}>
      <div>
        <NewToDo>
          <Title>Create new list:</Title>
          <input type='text' value={newListName} onChange={({target: {value}}) => changeNewListName(value)} />
          <Button onClick={() => addTodoList(newListName)}>Add</Button>
        </NewToDo>
        <ToDoListContainer>
          {toDoLists.map((list, index) => 
            <ToDoListItemStyled key={index}>
              <ToDoListsItemName isActive={list === currentList} onClick={() => {setCurrentList(list)}}>{list.name}</ToDoListsItemName>
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
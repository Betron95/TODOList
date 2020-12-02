import React, { useState, useEffect } from 'react';
import { ToDoContext } from "../../context/context";
import { Container } from '../../styles/common';
import RemoveDialog from '../RemoveDialog/RemoveDialog';
import MyTabs from '../Tabs/Tabs';
import { v4 as uuidv4 } from 'uuid';
import { CircularProgress, MuiThemeProvider } from '@material-ui/core';
import { MuiTheme } from '../../styles/mui-theme';
import AddNewToDo from '../App/AddNewToDo/AddNewToDo';

export interface IToDoListItem {
  id: string,
  text: string,
  completed: boolean,
}

export interface IToDoList {
  name: string,
  items: IToDoListItem[],
}

function ToDoLists() {
  const [toDoLists, setToDoLists] = useState<IToDoList[]>([]);

  useEffect(() => {
    fetch('https://my-json-server.typicode.com/Betron95/todosServer/todos')
      .then(response => response.json())
      .then(todoLists => setToDoLists(todoLists))
  }, []);

  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [listForRemove, setListForRemove] = useState<IToDoList | null>(null);

  const handleRemoveItemHandler = (show: boolean, list?: IToDoList) => {
    setIsOpenDialog(show);
    if (list) {
      setListForRemove(list);
    }
  }

  const addTodoList = (newListName: string) => {
    const newList = { name: newListName, items: [] };
    setToDoLists(() => [...toDoLists, newList]);
  }

  const removeTodoList = (list: IToDoList | null) => {
    setToDoLists(() => toDoLists.filter((iterableList: IToDoList) => iterableList !== list));
  }

  const addTodoListItem = (list: IToDoList, item: string) => {
    setToDoLists((todoList) => {
      return todoList.map((tl) => {
        if (tl === list) {
          const updatedList = { ...tl, items: [...list.items, { id: uuidv4(), text: item, completed: false }] };
          return updatedList
        }
        return tl;
      })
    });
  }

  const handleChangeCompleteListItem = (list: IToDoList, item: IToDoListItem) => {
    setToDoLists((todoList) => {
      return todoList.map((tl) => {
        if (tl === list) {
          const updatedList = {
            ...tl, items: [...list.items.map((iterableItem) => {
              if (iterableItem.id === item.id) {
                return { ...item, completed: item.completed };
              }
              return iterableItem;
            })]
          };
          return updatedList
        }
        return tl;
      })
    });
  }

  const removeTodoListItem = (list: IToDoList, id: string) => {
    setToDoLists((todoList) => {
      return todoList.map((tl) => {
        if (tl === list) {
          const updatedList = { ...tl, items: list.items.filter((iterableItem: IToDoListItem) => iterableItem.id !== id) };
          return updatedList;
        }
        return tl;
      })
    });
  }

  return (
    <ToDoContext.Provider value={{ toDoLists, addTodoListItem, removeTodoListItem, handleChangeCompleteListItem }}>
      <MuiThemeProvider theme={MuiTheme}>
        {toDoLists.length ? <div> 
          <AddNewToDo label={'Add new todo list'} clickHandler={addTodoList} buttonText={'Add'} title={'Create new list:'} />
          <MyTabs
            toDoLists={toDoLists}
            handleRemoveItemHandler={handleRemoveItemHandler}
          />
          {isOpenDialog &&
            <RemoveDialog
              closeDialog={() => handleRemoveItemHandler(false)}
              removeHandler={() => {
                removeTodoList(listForRemove)
                handleRemoveItemHandler(false);
              }}
            />
          }
        </div> : <Container><CircularProgress size={300} /></Container>
        }
      </MuiThemeProvider>
    </ToDoContext.Provider>
  );
}

export default ToDoLists;
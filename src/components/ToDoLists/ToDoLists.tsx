import React, { useState } from 'react';
import { ToDoContext } from "../../context/context";
import { Button, NewToDo, Title } from '../../styles/common';
import RemoveDialog from '../RemoveDialog/RemoveDialog';
import MyTabs from '../Tabs/Tabs';
import { v4 as uuidv4 } from 'uuid';

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
  const [toDoLists, setToDoLists] = useState<IToDoList[]>(
    [
      {
        name: 'first',
        items: [{ id: '1', text: '1', completed: false }, { id: '2', text: '2', completed: false }, { id: '3', text: '3', completed: false }],
      },
      {
        name: 'second',
        items: [{ id: '4', text: '4', completed: false }, { id: '4', text: '5', completed: false }, { id: '6', text: '6', completed: false }],
      },
    ]
  );

  const [newListName, setNewListName] = useState('');
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
    setNewListName('');
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

  const changeNewListName = (value: string) => {
    setNewListName(value);
  }

  return (
    <ToDoContext.Provider value={{ toDoLists, addTodoListItem, removeTodoListItem, handleChangeCompleteListItem }}>
      <div>
        <NewToDo>
          <Title>Create new list:</Title>
          <input type='text' value={newListName} onChange={({ target: { value } }) => changeNewListName(value)} />
          <Button onClick={() => addTodoList(newListName)}>Add</Button>
        </NewToDo>
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
      </div>
    </ToDoContext.Provider>
  );
}

export default ToDoLists;
import React from 'react';
import { IToDoList, IToDoListItem } from "../components/ToDoLists/ToDoLists";

type ToDos = {  
  toDoLists: IToDoList[],
  addTodoListItem: (list: IToDoList, itemName: string) => void,
  removeTodoListItem: (list: IToDoList, itemName: string) => void,
  handleChangeCompleteListItem: (list: IToDoList, listItem: IToDoListItem) => void,
};

export const ToDoContext = React.createContext<Partial<ToDos>>({});
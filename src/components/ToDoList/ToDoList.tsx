import React from 'react';
import { ToDoListItemsContainer } from '../../styles/common';
import AddNewToDo from '../App/AddNewToDo/AddNewToDo';
import ToDoListItem from '../ToDoListItem/ToDoListItem';
import { IToDoList, IToDoListItem } from '../ToDoLists/ToDoLists';

export interface ToDoListProps {
  currentList: IToDoList,
}

function ToDoList({ currentList }: ToDoListProps) {
  return (
    <div>
      <AddNewToDo currentList={currentList} label={'Add new todo item'} title={'To Do Items:'} />
      <ToDoListItemsContainer>
        {currentList.items.map(({ id, text, completed }: IToDoListItem) =>
          <ToDoListItem key={id} currentList={currentList} id={id} text={text} completed={completed} />)}
      </ToDoListItemsContainer>
    </div>
  )
}

export default ToDoList;

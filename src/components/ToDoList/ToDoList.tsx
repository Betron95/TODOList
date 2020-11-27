import React, {useState, useContext} from 'react';
import { ToDoContext } from '../../context/context';
import ToDoListItem from '../ToDoListItem/ToDoListItem';
import { addNewListItem } from '../utils/utils';

export interface ToDoListProps {
  currentList: string,
  // [key: string]: string;
  // children: React.ReactNode
}
export type ToDos = {  
  [key: string]: any
};


function ToDoList({ currentList = '' }: ToDoListProps) {
  const toDos = useContext(ToDoContext);
  const currentToDoList = toDos[currentList];
  const updateToDoMethod = toDos.setToDoLists;
  const [itemName, setItemName] = useState('');

  const changeNewItemName = (value: any) => {
    setItemName(value);
  }
  
  return (
    <div className="todo">
      {currentToDoList.map((todo: string) => <ToDoListItem currentList={currentList} text={todo} />)}
      <input type="text" value={itemName} onChange={({target: {value}}) => changeNewItemName(value)} />
      <button onClick={() => addNewListItem(toDos, currentList, itemName, updateToDoMethod, setItemName)}>Add new Item</button>
    </div>
    )
}

export default ToDoList;
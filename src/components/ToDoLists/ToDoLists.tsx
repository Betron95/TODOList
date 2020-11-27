import React, { useState } from 'react';
import { ToDoContext } from "../../context/context";
import ToDoList from '../ToDoList/ToDoList';
import { addNewList, isEmptyObj, removeList } from '../utils/utils';

// export interface EventHandlerProps {
//   onClick: (e: React.MouseEvent) => void,
//   onChange: (e: React.ChangeEvent) => void
// }

function ToDoLists() {
  const [toDoLists, setToDoLists] = useState({
    first: ['1', '2', '3'],
    second: ['4', '5', '6']}
  );
  const [newListName, setNewListName] = useState('');

  const changeNewListName = (value: any) => {
    setNewListName(value);
  }

  const [currentList, setCurrentList] = useState('first');

  return (
    <ToDoContext.Provider value={{...toDoLists, setToDoLists}}>
    <div className="todos">
      <div className="new-todo">
        <p>Create new list:</p>
        <input type='text' value={newListName} onChange={({target: {value}}) => changeNewListName(value)} />
        <button onClick={() => addNewList(newListName, toDoLists, setToDoLists, changeNewListName)}>Add</button>
      </div>
      <div className="todos__list">
        {Object.keys(toDoLists).map((list, index) => 
        <div key={index} className='todos__list_item'>
          <div className='list_name' onClick={() => {setCurrentList(list)}}>{list}</div>
          <button onClick={() => removeList(list, toDoLists, setToDoLists)}>Remove</button>
          </div>
        )}
      </div>
    </div>
    {!isEmptyObj(toDoLists) && <ToDoList currentList={currentList} />}
    </ToDoContext.Provider>
  );
}

export default ToDoLists;

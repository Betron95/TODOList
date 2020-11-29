import { useState, useContext } from "react";
import { ToDoContext } from "../../context/context";
import { ToDoListItemStyled, ToDoListItemName, Button } from "../../styles/common";
import { IToDoList } from "../ToDoLists/ToDoLists";

export interface ItemProps {
  currentList: IToDoList,
  text: string,
  completed: boolean
}

function ToDoListItem({ currentList, text = '', completed = false }: ItemProps) {
  const [isChecked, setIsChecked] = useState(completed);
  const toogleCheckbox = (event: { target: HTMLInputElement }) => {
    setIsChecked(event.target.checked);
    handleChangeCompleteListItem(currentList, {text, completed: event.target.checked});
  };
  const {handleChangeCompleteListItem, removeTodoListItem} = useContext(ToDoContext);
  return (
      <ToDoListItemStyled>
        <ToDoListItemName completed={isChecked} htmlFor={text}>{text}</ToDoListItemName>
        <input type='checkbox' checked={isChecked} onChange={toogleCheckbox} id={text} />
        <Button onClick={() => removeTodoListItem(currentList, text)}>Remove</Button>
      </ToDoListItemStyled>
  );
}

export default ToDoListItem;

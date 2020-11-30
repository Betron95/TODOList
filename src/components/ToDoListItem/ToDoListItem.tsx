import { useState, useContext } from "react";
import { ToDoContext } from "../../context/context";
import { ToDoListItemStyled, ToDoListItemName, Cross } from "../../styles/common";
import RemoveDialog from "../RemoveDialog/RemoveDialog";
import { IToDoList } from "../ToDoLists/ToDoLists";

export interface ItemProps {
  currentList: IToDoList,
  text: string,
  completed: boolean
}

function ToDoListItem({ currentList, text = '', completed = false }: ItemProps) {
  const [isChecked, setIsChecked] = useState(completed);
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const toggleCheckbox = (event: { target: HTMLInputElement }) => {
    setIsChecked(event.target.checked);
    handleChangeCompleteListItem(currentList, {text, completed: event.target.checked});
  };
  const handleRemoveItemHandler = (show: boolean) => {
    setIsOpenDialog(show);
  }
  const {handleChangeCompleteListItem, removeTodoListItem} = useContext(ToDoContext);
  return (
      <ToDoListItemStyled>
        <ToDoListItemName completed={isChecked} htmlFor={text}>{text}</ToDoListItemName>
        <input type='checkbox' checked={isChecked} onChange={toggleCheckbox} id={text} />
        <Cross onClick={() => handleRemoveItemHandler(true)} />
        {isOpenDialog && 
          <RemoveDialog 
            closeDialog={() => handleRemoveItemHandler(false)} 
            removeHandler={() => removeTodoListItem(currentList, text)} 
          />
        }
      </ToDoListItemStyled>
  );
}

export default ToDoListItem;

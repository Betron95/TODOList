import { Checkbox, withStyles } from "@material-ui/core";
import { useState, useContext } from "react";
import { ToDoContext } from "../../context/context";
import { ToDoListItemStyled, ToDoListItemName, Cross } from "../../styles/common";
import RemoveDialog from "../RemoveDialog/RemoveDialog";
import { IToDoList } from "../ToDoLists/ToDoLists";

const StyledCheckbox = withStyles({
  root: {
    padding: '0',
    marginRight: '15px'
  }
})(Checkbox);

export interface ItemProps {
  currentList: IToDoList,
  id: string,
  text: string,
  completed: boolean
}

function ToDoListItem({ currentList, id, text = '', completed = false }: ItemProps) {
  const [isChecked, setIsChecked] = useState(completed);
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  const toggleCheckbox = (event: { target: HTMLInputElement }) => {
    setIsChecked(event.target.checked);
    if (handleChangeCompleteListItem) {
      handleChangeCompleteListItem(currentList, { id, text, completed: event.target.checked });
    }
  };

  const handleRemoveItemHandler = (show: boolean) => {
    setIsOpenDialog(show);
  }

  const { handleChangeCompleteListItem, removeTodoListItem } = useContext(ToDoContext);

  return (
    <ToDoListItemStyled>
      <ToDoListItemName completed={isChecked} htmlFor={id}>{text}</ToDoListItemName>
      <StyledCheckbox
        className={"custom-checkbox"}
        checked={isChecked}
        id={id}
        onChange={toggleCheckbox}
      />
      <Cross onClick={() => handleRemoveItemHandler(true)} />
      {isOpenDialog &&
        <RemoveDialog
          closeDialog={() => handleRemoveItemHandler(false)}
          removeHandler={() => removeTodoListItem && removeTodoListItem(currentList, id)}
        />
      }
    </ToDoListItemStyled>
  );
}

export default ToDoListItem;

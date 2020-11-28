import { useContext } from "react";
import { ToDoContext } from "../../context/context";
import { ToDoListContainer, ToDoListItemStyled, ToDoListItemName, Button } from "../../styles/common";
import { IToDoList } from "../ToDoLists/ToDoLists";

export interface ItemProps {
  currentList: IToDoList,
  text: string,
}

function ToDoListItem({ currentList, text = '' }: ItemProps) {
  const {removeTodoListItem} = useContext(ToDoContext);
  return (
    <ToDoListContainer>
      <ToDoListItemStyled>
        <ToDoListItemName>{text}</ToDoListItemName>
        <Button onClick={() => removeTodoListItem(currentList, text)}>Remove</Button>
      </ToDoListItemStyled>
    </ToDoListContainer>
  );
}

export default ToDoListItem;

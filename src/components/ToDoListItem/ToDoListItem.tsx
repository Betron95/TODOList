import { useContext } from "react";
import { ToDoContext } from "../../context/context";
import { ToDoListContainer, ToDoListItemStyled, ToDoListItemName, Button } from "../../styles/common";
import { IToDoList } from "../ToDoLists/ToDoLists";
import { removeListItem } from "../utils/utils";

export interface ItemProps {
  currentList: IToDoList,
  text: string,
}

function ToDoListItem({ currentList, text = '' }: ItemProps) {
  const toDos = useContext(ToDoContext);
  return (
    <ToDoListContainer>
      <ToDoListItemStyled>
        <ToDoListItemName>{text}</ToDoListItemName>
        <Button onClick={() => removeListItem(toDos, currentList.name, text)}>Remove</Button>
      </ToDoListItemStyled>
    </ToDoListContainer>
  );
}

export default ToDoListItem;

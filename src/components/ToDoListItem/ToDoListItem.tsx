import { useContext } from "react";
import { ToDoContext } from "../../context/context";
import { removeListItem } from "../utils/utils";

export interface ItemProps {
  currentList: string,
  text: string,
}

function ToDoListItem({ currentList = '', text = '' }: ItemProps) {
  const toDos = useContext(ToDoContext);
  return (
    <div className="item">
      <p>{text}</p>
      <button onClick={() => removeListItem(toDos, currentList, text)}>Remove</button>
    </div>
  );
}

export default ToDoListItem;

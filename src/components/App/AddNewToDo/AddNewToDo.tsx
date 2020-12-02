import {useState, useContext} from 'react'
import { TextField } from '@material-ui/core';
import { NewToDo, Button, Title } from '../../../styles/common';
import { ToDoContext } from '../../../context/context';
import { IToDoList } from '../../ToDoLists/ToDoLists';

interface IAddNewToDoProps {
  clickHandler?: (newList: string) => void,
  label: string,
  title: string,
  currentList?: IToDoList,
  buttonText? : string,
}

function AddNewToDo({clickHandler, currentList, label, title,  buttonText = 'Add new Item'}: IAddNewToDoProps) {

  const [name, setName] = useState('');
  const { addTodoListItem } = useContext(ToDoContext);

  const addNewListItem = () => {
    if (addTodoListItem && currentList) {
      addTodoListItem(currentList, name)
    }
  }

  const handleClick = () => {
    if(name === '') return;
    if(clickHandler) {
      clickHandler(name)
      
    } else {
      addNewListItem()
    }
    setName('');
  };

  const changeName = (value: string) => {
    setName(value);
  }

  return (
    <NewToDo>
      <Title>{title}</Title>
      <TextField
        size='small'
        label={label}
        variant="outlined"
        value={name}
        onChange={({ target: { value } }) => changeName(value)}
      />
      <Button
        onClick={handleClick}>
        {buttonText}
    </Button>
    </NewToDo>
  );
}

export default AddNewToDo;


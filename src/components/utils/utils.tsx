export function addNewList(newList:string, lists: any, setLists:any, clearName: any) {
  const listsNames = Object.keys(lists);
  if( newList === '' || listsNames.includes(newList.toLowerCase())) {
    return;
  }
  setLists({...lists, [newList]: []})
  clearName('');
}
export function removeList(list:any, lists: any, setLists:any) {
  if(list in lists) {
    const newLists = {...lists}
    delete newLists[list];
    setLists(newLists);
  }
}

export function addNewListItem(allLists: any, currentlist:string, newItem: any, updateMethod: any, clearName: any) {
  if(newItem === '') {
    return;
  }
  const newLists = {...allLists}
  delete newLists.setToDoLists;
  newLists[currentlist].push(newItem);
  updateMethod(newLists);
  clearName('');
}

export function removeListItem(todos: any, currentlist:string, item: any) {
  const newLists = {...todos}
  const setToDoLists = newLists.setToDoLists;
  delete newLists.setToDoLists;
  newLists[currentlist] = newLists[currentlist].filter((todo: string) => item !== todo);
  setToDoLists(newLists);
}


export function isEmptyObj(obj: any) {
  for (let key in obj) {
    return false;
  }
  return true;
}


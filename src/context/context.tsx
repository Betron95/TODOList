import React from 'react';

type ToDos = {  
  [key: string]: any
};

export const ToDoContext = React.createContext<Partial<ToDos>>({});
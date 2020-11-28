import React from 'react';

// (name: string, surname: string):void;
type ToDos = {  
  [key: string]: any
};

export const ToDoContext = React.createContext<Partial<ToDos>>({});
import React from 'react';
import { view as Todos } from './todos/';
import { view as Filter } from './filter/';

function TodoApp() {
  return (
    <div className="todo-wrapper" style={{padding: 12}}>
      <Todos />
      <Filter />
    </div>
  );
}

export default TodoApp;

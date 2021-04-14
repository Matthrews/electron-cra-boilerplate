import React from 'react';
import AddTodo from './addTodo';
import TodoList from './todoList';

import './style.less';

// 如果组件没有状态且没有引用refs，可使用普通函数(非匿名，非箭头函数)
export default function todos() {
  return (
    <div className="todos">
      <AddTodo />
      <TodoList />
    </div>
  );
}

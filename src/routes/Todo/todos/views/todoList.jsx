import React from 'react';
import PropTypes from 'prop-types';
import { ActionType} from 'redux-promise-middleware';
import { connect } from 'react-redux';
import { Spin } from 'antd';
import TodoItem from './todoItem';
import { toggleTodo, removeTodo } from '../actions';
import { FilterTypes } from '../../constants';

const {Pending, Fulfilled} = ActionType


const TodoList = ({ todos, onToggleTodo, onRemoveTodo }) => {
  return <Spin spinning={todos.status === Pending}>
    <ul className="todo-list">
      {todos.items && todos.items.length ?
          todos.items.map(item => (
              <TodoItem
                  key={item.id}
                  text={item.text}
                  completed={item.completed}
                  onToggle={() => onToggleTodo(item)}
                  onRemove={() => onRemoveTodo(item.id)}
              />
          )) : <div>暂无数据</div>}
    </ul>
  </Spin>
}

TodoList.defaultProps = {
  todos: {
    status: Fulfilled,
    items: [],
  },
};

TodoList.propTypes = {
  todos: PropTypes.shape({
    status: PropTypes.string,
    items: PropTypes.array,
  }),
  onToggleTodo: PropTypes.func.isRequired,
  onRemoveTodo: PropTypes.func.isRequired,
};

const selectVisibleTodos = (todos, filter) => {
  switch (filter) {
    case FilterTypes.ALL:
      return todos;
    case FilterTypes.COMPLETED: {
      return { ...todos, items: todos.items && todos.items.filter(item => item.completed) };
    }
    case FilterTypes.UNCOMPLETED:
      return { ...todos, items: todos.items && todos.items.filter(item => !item.completed) };
    default:
      throw new Error('unsupported filter');
  }
};

const mapStateToProps = state => ({
  todos: selectVisibleTodos(state.todos, state.filter),
});


const mapDispatchToProps = dispatch => ({
  onToggleTodo: (item) => {
    dispatch(toggleTodo(item));
  },
  onRemoveTodo: (id) => {
    dispatch(removeTodo(id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);


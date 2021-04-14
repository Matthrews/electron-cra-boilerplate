import { ADD_TODO, TOGGLE_TODO, REMOVE_TODO, GET_TODO } from './actionTypes';
import { request } from '../../../utils/request';

export const addTodo = (text) => {
  const item = {
    completed: false,
    text,
  };
  return {
    type: ADD_TODO,
    payload: request({ url: '/todos', method: 'post', params: item }).then(() => request({ url: '/todos' })),
  };
};

export const toggleTodo = item => ({
  type: TOGGLE_TODO,
  meta: item, // 此值会放到payload中以应对乐观更新
  payload: request({ url: `/todos/${item.id}`, method: 'put', params: { ...item, completed: !item.completed } }),
});

export const removeTodo = id => ({
  type: REMOVE_TODO,
  payload: request({ url: `/todos/${id}`, method: 'delete' }).then(() => id),
});

export const getTodos = () => {
  const apiUrl = '/todos';
  return {
    type: GET_TODO,
    payload: request({ url: apiUrl }),
  };
};

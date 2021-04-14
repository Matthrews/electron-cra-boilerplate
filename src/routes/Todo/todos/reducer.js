import { ActionType } from 'redux-promise-middleware';
import { message } from 'antd';
import {
  ADD_TODO, TOGGLE_TODO, REMOVE_TODO, GET_TODO
} from './actionTypes';

const {Pending, Fulfilled, Rejected} = ActionType

const todoReducer = (state = { status: Pending, items: [] }, action) => {
  switch (action.type) {
    case `${ADD_TODO}_${Pending}`: {
      return {
        ...state,
        status: Pending,
      };
    }
    case `${ADD_TODO}_${Fulfilled}`: {
      return {
        ...state,
        status: Fulfilled,
        items: [
          ...state.items,
          action.payload,
        ],
      };
    }
    case `${ADD_TODO}_${Rejected}`: {
      message.error('添加失败');
      return {
        ...state,
        status: Rejected,
      };
    }

    // 乐观更新示例：用PENDING替代FULFILLED,当失败时再置回
    case `${TOGGLE_TODO}_${Pending}`: {
      const item = action.meta;
      return {
        ...state,
        items: state.items.map((todoItem) => {
          if (todoItem.id === item.id) {
            return { ...todoItem, completed: !todoItem.completed };
          }
          return todoItem;
        }),
      };
    }

    case `${TOGGLE_TODO}_${Rejected}`: {
      // 更新失败后提示并恢复原值
      message.error('更新失败');
      const item = action.meta;
      return {
        ...state,
        items: state.items.map((todoItem) => {
          if (todoItem.id === item.id) {
            return { ...todoItem, completed: item.completed };
          }
          return todoItem;
        }),
      };
    }

    case `${REMOVE_TODO}_${Rejected}`: {
      message.error('删除失败');
      return state;
    }

    case `${REMOVE_TODO}_${Fulfilled}`: {
      const ret = {
        ...state,
        items: state.items.filter(todoItem => todoItem.id !== action.payload),
      };
      return ret;
    }

    case `${GET_TODO}_${Pending}`: {
      return {
        ...state,
        status: Pending,
      };
    }

    case `${GET_TODO}_${Fulfilled}`: {
      console.log('GET_TODO', state)
      return { ...state, status: Fulfilled, items: action.payload };
    }

    case `${GET_TODO}_${Rejected}`: {
      return { ...state, status: Rejected, error: action.payload };
    }

    default: {
      return state;
    }
  }
};


export default todoReducer

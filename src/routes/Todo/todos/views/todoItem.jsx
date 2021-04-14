import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox, Button } from 'antd';

import {DeleteOutlined} from '@ant-design/icons'

const TodoItem = ({
  onToggle, onRemove, completed, text,
}) => (
  <li
    className="todo-item"
    style={{
      textDecoration: completed ? 'line-through' : 'none',
    }}
  >
    <Checkbox checked={!!completed} onChange={onToggle}>{text}</Checkbox>
    <Button type="text" className="delete" onClick={onRemove}><DeleteOutlined /></Button>
  </li>
);
TodoItem.propTypes = {
  onToggle: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
};

export default TodoItem;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Input } from 'antd';
import { addTodo, getTodos } from '../actions';

const InputGroup = Input.Group;

class AddTodo extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      value: '',
    };
  }

  // 使用箭头函数可省略绑定代码
  onSubmit = (ev) => {
    ev.preventDefault();

    const inputValue = this.state.value;
    if (!inputValue.trim()) {
      return;
    }

    this.props.onAdd(inputValue);
    this.setState({ value: '' });
  }

  onInputChange = (event) => {
    this.setState({
      value: event.target.value,
    });
  }

  // react 内置函数无需bind即可使用this
  render() {
    return (
      <div className="add-todo">
        <InputGroup compact>
          <Input style={{ width: '90%' }} onChange={this.onInputChange} value={this.state.value} onPressEnter={this.onSubmit} />
          <Button style={{ width: '10%' }} onClick={this.onSubmit}> 添加 </Button>
        </InputGroup>
      </div>
    );
  }
}

AddTodo.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  onAdd: (text) => {
    dispatch(addTodo(text)).then(() => {
      dispatch(getTodos());
    });
  },
});

export default connect(null, mapDispatchToProps)(AddTodo);

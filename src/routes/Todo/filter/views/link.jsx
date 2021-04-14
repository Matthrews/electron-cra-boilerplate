import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'antd'
import { setFilter } from '../actions';
import { getTodos } from '../../todos/actions';

class Link extends React.Component {
  componentDidMount() {
    if (this.props.active) {
      this.props.onInit();
    }
  }

  render() {
    const { active, children, onClick } = this.props;
    if (active) {
      return <strong className="f-mr-sm">{children}</strong>;
    }
    return (
      <Button
        href="#"
        className="f-mr-sm"
        onClick={(ev) => {
          ev.preventDefault();
          onClick();
        }}
      >
        {children}
      </Button>
    );
  }
}

Link.propTypes = {
  active: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  onInit: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  active: state.filter === ownProps.filter,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => {
    dispatch(setFilter(ownProps.filter));
    dispatch(getTodos());
  },
  onInit: () => {
    dispatch(getTodos());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Link);

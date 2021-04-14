import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Menu } from 'antd';
import './style.css'

function TopMenu(props) {
  const { location } = props;
  const pathname = location.pathname === '/' ? '/home' : location.pathname;
  return (
    <div className="top-menu">
      <Menu theme="dark" mode="horizontal" selectedKeys={[pathname]}>
        <Menu.Item key="/home">
          <Link to="/home">首页</Link>
        </Menu.Item>
        <Menu.Item key="/todo">
          <Link to="/todo">事件</Link>
        </Menu.Item>
        <Menu.Item key="/chart">
          <Link to="/chart">图表</Link>
        </Menu.Item>
        <Menu.Item key="/editor">
          <Link to="/editor">Markdown编辑器</Link>
        </Menu.Item>
        <Menu.Item key="/about">
          <Link to="/about">关于</Link>
        </Menu.Item>
      </Menu>
    </div>
  );
}

TopMenu.propTypes = {
  location: PropTypes.object.isRequired,
};

// widthRouter 为组件提供路由相关参数 location,history,match
export default withRouter(TopMenu);

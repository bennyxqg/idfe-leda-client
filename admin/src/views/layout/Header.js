import React, { Component } from 'react';
import {withRouter} from "react-router-dom";
import { Layout, Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import '@src/assets/css/common.less'
const {Header} = Layout


class TopHeader extends Component {
  onClick(key){
    localStorage.removeItem('isLogin');
		localStorage.removeItem('userInfo');
    this.props.history.push('/login')
  }
  render() {
    const menu = (
      <Menu onClick={(value)=> {this.onClick(value)}}>
        <Menu.Item key="1">退出</Menu.Item>
      </Menu>
    );
    return (
      <Header className="top-header">
          <div className="header-box">
            <Dropdown overlay={menu}>
              <span className="ant-dropdown-link">
                用户名 <DownOutlined />
              </span>
            </Dropdown>
          </div>
      </Header>
    );
  }
}

export default withRouter(TopHeader);
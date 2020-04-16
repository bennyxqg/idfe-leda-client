import React, { Component } from 'react';
import {withRouter} from "react-router-dom";
import { Layout, Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { toLogout } from '@/http/hlogin'
import '@/assets/css/common.less'
import GlobalContext from "./GlobalContext";
const {Header} = Layout


class TopHeader extends Component {
  onClick(key){
    // localStorage.removeItem('isLogin');
    // localStorage.removeItem('userInfo');
    // toLogout()
    // setTimeout(() => {
    //   localStorage.removeItem('token');
    // }, 1000)
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    this.props.history.push('/login')

  }
  render() {
    // const globalData = React.useContext(GlobalContext);
    const menu = (
      <Menu onClick={(value)=> {this.onClick(value)}}>
        <Menu.Item key="1">退出</Menu.Item>
      </Menu>
    );
    return (
      <GlobalContext.Consumer>
        {context => (
          <Header className="top-header">
            <div className="header-box">
              <Dropdown overlay={menu}>
                <span className="ant-dropdown-link">
                  {context.userInfo.name} <DownOutlined />
                </span>
              </Dropdown>
            </div>
          </Header>
        )}
      </GlobalContext.Consumer>
    );
  }
}

export default withRouter(TopHeader);
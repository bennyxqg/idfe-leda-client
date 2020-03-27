import React, { Component } from 'react';
import { Link, withRouter} from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { menus } from '@src/router/menus'
const { Sider } = Layout;

class SideMenu extends Component {
  render() {
    const menuSelected = this.props.history.location.pathname;
    return (
      <Sider className="main-sider">
        <Menu
          selectedKeys={[menuSelected]}
          mode="inline"
          theme="dark"
        >
          {menus.map((el) => 
            (<Menu.Item key={el.path}>
              <Link to={el.path}>
                <span>{el.name}</span>
              </Link>
            </Menu.Item>)
          )}
        </Menu>
      </Sider>
    );
  }
}

export default withRouter(SideMenu);
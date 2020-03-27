import React, { Component } from 'react'
import { Layout, Menu} from 'antd';
import './home.less'

const { SubMenu } = Menu;

export default class index extends Component {
  render() {
    return (
      <div className="home">
        <div className="layout">
          <Layout style={{ minHeight: '100vh' }}>
          <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          theme="dark"
        >
          <Menu.Item key="1">
            <span>Option 1</span>
          </Menu.Item>
          <Menu.Item key="2">
            <span>Option 2</span>
          </Menu.Item>
          <Menu.Item key="3">
            <span>Option 3</span>
          </Menu.Item>
          <SubMenu
            key="sub1"
            title={
              <span>
                <span>Navigation One</span>
              </span>
            }
          >
            <Menu.Item key="5">Option 5</Menu.Item>
            <Menu.Item key="6">Option 6</Menu.Item>
            <Menu.Item key="7">Option 7</Menu.Item>
            <Menu.Item key="8">Option 8</Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub2"
            title={
              <span>
                <span>Navigation Two</span>
              </span>
            }
          >
            <Menu.Item key="9">Option 9</Menu.Item>
            <Menu.Item key="10">Option 10</Menu.Item>
            <SubMenu key="sub3" title="Submenu">
              <Menu.Item key="11">Option 11</Menu.Item>
              <Menu.Item key="12">Option 12</Menu.Item>
            </SubMenu>
          </SubMenu>
        </Menu>
            <Layout>
              头部
            </Layout>
          </Layout>
        </div>
      </div>
    )
  }
}

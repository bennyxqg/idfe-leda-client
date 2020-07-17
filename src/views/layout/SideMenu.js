import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Layout, Menu } from "antd";
import { menus } from "@/router/menus";
const { Sider } = Layout;

class SideMenu extends Component {
    renderSubMenu = (subMenu, children) => {
        return (
            <Menu.SubMenu
                key={subMenu.path?subMenu.path:'defaultMenu'}
                title={
                    <span>
                        {subMenu.icon}
                        <span>{subMenu.name}</span>
                    </span>
                }
            >
                {children}
            </Menu.SubMenu>
        );
    };

    renderMenuItem = (menuItem = [], parent) => {
        return menuItem.map((item) => (
            <Menu.Item key={(parent?parent.path:'') + item.path} to={(parent?parent.path:'') + item.path}>
                <Link to={(parent?parent.path:'') + item.path}>
                    <span>{item.name}</span>
                </Link>
            </Menu.Item>
        ));
    };

    render() {
        const menuSelected = this.props.history.location.pathname;
        const defaultOpenKeys = []

        if(/^\/.*?\/.*?$/.test(menuSelected)) {
            const matchData = menuSelected.match(/^(\/.*)?\/.*?$/)
            if(matchData.length >= 2) {
                defaultOpenKeys.push(matchData[1])
            }   
        } else if(menuSelected === '/basic' || menuSelected === '/home') {
            defaultOpenKeys.push('defaultMenu')
        }
        return (
            <Sider className="main-sider" width={260}>
                <Menu selectedKeys={[menuSelected]} defaultOpenKeys={defaultOpenKeys} mode="inline" theme="dark">
                    {menus.map((item) =>
                        item.children
                            ? this.renderSubMenu(
                                  item,
                                  this.renderMenuItem(item.children, item)
                              )
                            : this.renderMenuItem([item])
                    )}
                </Menu>
            </Sider>
        );
    }
}

export default withRouter(SideMenu);

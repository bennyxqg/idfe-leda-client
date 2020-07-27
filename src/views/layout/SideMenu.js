import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Layout, Menu } from "antd";
import { menus, adminMenus } from "@/router/menus";
import GlobalContext from "./GlobalContext";
const { Sider } = Layout;

class SideMenu extends Component {
    static contextType = GlobalContext;
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
        // 高级管理员权限
        const menusTemp = JSON.parse(JSON.stringify(menus))
        if(this.context.userInfo && this.context.userInfo.name === 'admin') {
            const adminMenusTemp = JSON.parse(JSON.stringify(adminMenus))
            menusTemp.push(...adminMenusTemp)
        }

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
                    {menusTemp.map((item) =>
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

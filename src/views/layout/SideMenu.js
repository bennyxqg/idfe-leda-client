import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Layout, Menu } from "antd";
import { menus, adminMenus } from "@/router/menus";
import GlobalContext from "./GlobalContext";
import { createFromIconfontCN } from '@ant-design/icons';
import {cloneDeep} from 'lodash'

const { Sider } = Layout;

class SideMenu extends Component {
    static contextType = GlobalContext;
    renderSubMenu = (subMenu, children) => {
        return (
            <Menu.SubMenu
                key={subMenu.path?subMenu.path:'defaultMenu'}
                icon={this.renderIcon(subMenu)}
                title={
                    <span>
                        <span>{subMenu.name}</span>
                    </span>
                }
            >
                {children}
            </Menu.SubMenu>
        );
    };

    renderIcon = (item) => {
        if(!item.icon) {
            return null
        }
        return item.icon.map((i, index) => {
            return (
                <span key={index}>{i}</span>
            )
        })
    }

    renderMenuItem = (menuItem = [], parent) => {
        return menuItem.map((item, index) => (
            <Menu.Item 
                icon={this.renderIcon(item, index)}
                key={(parent?parent.path:'') + item.path} to={(parent?parent.path:'') + item.path}>
                <Link to={(parent?parent.path:'') + item.path}>
                    <span>{item.name}</span>
                </Link>
            </Menu.Item>
        ));
    };

    render() {
        // 高级管理员权限
        const menusTemp = cloneDeep(menus) 
        if(this.context.userInfo && this.context.userInfo.name === 'admin') {
            const adminMenusTemp = cloneDeep(adminMenus) 
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
            <Sider className="main-sider" width={260} theme='light'>
                <Menu selectedKeys={[menuSelected]} defaultOpenKeys={defaultOpenKeys} mode="inline">
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

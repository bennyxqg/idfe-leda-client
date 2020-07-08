import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Layout, Menu } from "antd";
import { menus } from "@/router/menus";
const { Sider } = Layout;

class SideMenu extends Component {
    renderSubMenu = (subMenu, children) => {
        return (
            <Menu.SubMenu
                key={subMenu.path}
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

    renderMenuItem = (menuItem = []) => {
        return menuItem.map((item) => (
            <Menu.Item key={item.path} to={item.path}>
                <Link to={item.path}>
                    <span>{item.name}</span>
                </Link>
            </Menu.Item>
        ));
    };

    render() {
        const menuSelected = this.props.history.location.pathname;
        return (
            <Sider className="main-sider" width={260}>
                <Menu selectedKeys={[menuSelected]} mode="inline" theme="dark">
                    {menus.map((item) =>
                        item.children
                            ? this.renderSubMenu(
                                  item,
                                  this.renderMenuItem(item.children)
                              )
                            : this.renderMenuItem([item])
                    )}
                </Menu>
            </Sider>
        );
    }
}

export default withRouter(SideMenu);

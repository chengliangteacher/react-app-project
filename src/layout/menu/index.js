import React, { Component } from "react"
import { Menu } from 'antd';
import {
    MailOutlined  } from '@ant-design/icons';
import routes from "../../router"
const { SubMenu } = Menu;

export default class MenuApp extends Component { 
    constructor() {
        super();
        this.state = {
            tree: [],
            openKeys: [(routes[0].parentId+'')]
        }
    }

    componentDidMount() {
        this.setState({
            tree: JSON.parse(localStorage.tree).children,
        })
    }
    componentDidCatch(error) {
        console.log(error)
    }
    onOpenChange= (openKeys) => {
        openKeys.forEach(item => {
            if (item !== this.state.openKeys[0]) {
                this.setState({
                    openKeys: [item]
                })
            }
        })
    }
    //=====================================递归无限极菜单====================================//
    MenuApp = (routeArr) => {
        return (
            routeArr.map(item => {
                if (!item.hasChildren) {
                    return (
                        <Menu.Item icon={<MailOutlined />} key={item.id} onClick={() => { this.props.history.push(item.url) }}>
                            { item.text }
                        </Menu.Item>
                    )
                } else {
                    return (
                        <SubMenu key={item.id} title={item.text} icon={<MailOutlined />}>
                            {
                                this.MenuApp(item.children)
                            }
                        </SubMenu>
                    )
                }
            })
        )
    }
    render() {
        return (
            <div style={{ width: this.props.width }}>
                <Menu openKeys={this.state.openKeys} onOpenChange={this.onOpenChange} mode="inline" className="menu" inlineCollapsed={this.props.collapsed} theme="dark">
                    {
                        this.MenuApp(this.state.tree)
                    }
                </Menu>
            </div>
        )
    }
}
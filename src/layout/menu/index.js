import React, { Component } from "react"
import { Menu } from 'antd';
import {
    AppstoreOutlined  } from '@ant-design/icons';
import routes from "../../router"
import { Link } from "react-router-dom";
import tree from "../../page/login/tree.json"
const { SubMenu } = Menu;
export default class MenuApp extends Component { 
    constructor() {
        super();
        this.state = {
            tree: [],
            openKeys: [(routes[0].parentId+'')],
            selectedKeys: [routes[0].id+'']
        }
    }

    componentDidMount() {
        if (routes.some(item => item.url === this.props.history.location.pathname)) {
            this.setState({
                tree: tree.children,
                selectedKeys: [routes.filter(item => item.url === this.props.history.location.pathname)[0].id+''],
                openKeys: [routes.filter(item => item.url === this.props.history.location.pathname)[0].parentId+""]
            })
        } else {
            this.setState({
                tree: tree.children,
            })
        }
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
        if (openKeys.length === 0) {
            this.setState({
                openKeys: []
            })
        }
    }
    onSelect = (val) => {
        this.setState({
            selectedKeys: val.key
        })
    }
    //=====================================递归无限极菜单====================================//
    MenuApp = (routeArr) => {
        return (
            routeArr.map(item => {
                if (!item.hasChildren) {
                    if (item.url) {
                        return (
                            <Menu.Item icon={item.icon ? <AppstoreOutlined /> : ""} key={item.id}>
                                <Link to={item.url}>{ item.text }</Link>
                            </Menu.Item>
                        )
                    } else {
                        return (
                            <Menu.Item icon={item.icon ? <AppstoreOutlined /> : ""} key={item.id}>
                                { item.text }
                            </Menu.Item>
                        )
                    }
                } else {
                    return (
                        <SubMenu key={item.id} title={item.text} icon={item.icon ? <AppstoreOutlined /> : ""}>
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
                <Menu openKeys={this.state.openKeys} selectedKeys={this.state.selectedKeys} onOpenChange={this.onOpenChange} onSelect={this.onSelect} mode="inline" className="menu" inlineCollapsed={this.props.collapsed} theme="light">
                    {
                        this.MenuApp(this.state.tree)
                    }
                </Menu>
            </div>
        )
    }
}
import React, { Component } from "react"
import { Menu } from 'antd';
import routes from "../../router"
const { SubMenu } = Menu;

export default class MenuApp extends Component {
    componentDidMount() {
    }
    componentDidCatch(error) {
        console.log(error)
    }
    //=====================================递归无限极菜单====================================//
    MenuApp = (routeArr) => {
        return (
            routeArr.map(item => {
                if (!item.haschidren) {
                    return (
                        <Menu.Item key={item.path} onClick={() => { this.props.history.push(item.path) }}>
                            <span>{item.name}</span>
                        </Menu.Item>
                    )
                } else {
                    return (
                        <SubMenu key={item.path} title={item.name}>
                            {
                                this.MenuApp(item.chidren)
                            }
                        </SubMenu>
                    )
                }
            })
        )
    }
    render() {
        return (
            <Menu mode="inline" style={{ width: "200px" }} className="menu">
                {
                    this.MenuApp(routes)
                }
            </Menu>
        )
    }
}
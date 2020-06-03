import React from 'react';
import { Route, Redirect, Switch } from "react-router-dom";
import MenuApp from "./menu"
import routes from "../router"
import { Button } from "antd"
import "./menu/index.scss"

import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons'

export default class Layoutview extends React.Component {

  state = {
    collapsed: false,
    width: 200,
    tree: []
  }

  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
      width: this.state.collapsed ? 200 : 80,
    });
  };

  render() {
    return (
      <div>
        <div className="header d-flex align-center">
            <div style={{ width: 200, textAlign: 'center' }}>react后台管理系统模板</div>
            <div>
              <Button type="primary" onClick={this.toggleCollapsed} style={{marginLeft: '10px' }}>
                {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
              </Button>
            </div>
        </div>
        <div className="d-flex">
          <MenuApp history={this.props.history} width={this.state.width} collapsed={this.state.collapsed} />
          <div className="ml-1 content" style={{ flexGrow:1 }}>
            <Switch>
              {routes.map(item => {
                return (
                  <Route key={item.id} path={item.url} component={item.component}>
                  </Route>
                )
              })}
              <Redirect exact from="/" to={routes[0].path} />
              <Redirect to='/404' />
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}
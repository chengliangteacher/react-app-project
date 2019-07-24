import React from 'react';
import { Route, Redirect, Switch } from "react-router-dom";
import MenuApp from "./menu"
import routes from "../router"

export default class Layoutview extends React.Component {

  render() {
    return (
      <div className="d-flex">
        <MenuApp history={this.props.history} />
        <div className="ml-1 w-100 h-100">
          <div className="header">react后台管理系统模板</div>
          <Switch>
            {routes.map(item => {
              return (
                <Route key={item.path} path={item.path} component={item.component}>
                </Route>
              )
            })}
            <Redirect exact from="/" to={routes[0].path} />
            <Redirect to='/404' />
          </Switch>
        </div>
      </div>
    );
  }
}
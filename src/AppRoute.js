import React from 'react';
import {
    Route,
    Switch
} from 'react-router-dom'
import Layout from "./layout"
import Login from "./page/login"
import { connect } from "react-redux"
class AppRoute extends React.Component {
    render() {
        if (sessionStorage.token) {
            return (
                    <Switch>
                        <Route history={this.props.history} path="/login" component={Login}></Route>
                        <Layout history={this.props.history} />
                    </Switch>
            )
        } else {
            this.props.history.push("/login");
            return (
                    <Switch>
                        <Route history={this.props.history} path="/login" component={Login}></Route>
                    </Switch>
            );
        }
    }
}
export default connect(({ userInfo, baseData }) => {
    return { userInfo, baseData }
})(AppRoute)
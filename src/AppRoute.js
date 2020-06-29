import React from 'react';
import {
    BrowserRouter,
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
                <BrowserRouter>
                    <Switch>
                        <Route history={this.props.history} path="/login" component={Login}></Route>
                        <Layout history={this.props.history} />
                    </Switch>
                </BrowserRouter>
            )
        } else {
            this.props.history.push("/login");
            return (
                <BrowserRouter>
                    <Switch>
                        <Route history={this.props.history} path="/login" component={Login}></Route>
                    </Switch>
                </BrowserRouter>
            );
        }
    }
}
export default connect(({ userInfo, baseData }) => {
    return { userInfo, baseData }
})(AppRoute)
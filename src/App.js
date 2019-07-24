import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom'
import Layout from "./layout"
import Login from "./page/login"
class App extends React.Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route path="/login" component={Login}></Route>
            <Layout history={this.props.history} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
export default App
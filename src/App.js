import React from 'react';
import { Provider } from "react-redux"
import store from "./store/store.js"
import AppRoute from "./AppRoute.js"
import zhCN from 'antd/es/locale/zh_CN';
import { TransitionGroup, CSSTransition } from "react-transition-group"
import { ConfigProvider } from "antd"
class App extends React.Component {
  render() {
    return (
      <ConfigProvider locale={zhCN}>
        <TransitionGroup>
          <CSSTransition appear={true} timeout={500}>
            <Provider store={store}>
              <AppRoute history={this.props.history} />
            </Provider>
          </CSSTransition>
        </TransitionGroup>
      </ConfigProvider>
    );
  }
}
export default App
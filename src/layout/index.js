import React from 'react';
import { Route, Redirect, Switch } from "react-router-dom";
import MenuApp from "./menu"
import routes from "../router"
import { Button } from "antd"
import BreadCrumb from "./BreadCrumb"
import "./menu/index.scss"
import AddProgram from "../page/Programmanage/com/addProgram"
import EditProgram from "../page/Programmanage/com/editProgram"
import { connect } from "react-redux"
import axios from "../api/index"
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
} from '@ant-design/icons'
class Layoutview extends React.Component {

    state = {
        collapsed: false,
        width: 200,
        tree: []
    }

    //=====================================请求areaData====================================//
    getAreaData = () => {
        axios.get("/areas/allTwo").then(res => {
            this.props.dispatch({ type: "AREADATA", data: res.data });
        })
    }
    //=====================================请求食品====================================//
    getFoodData = () => {
        axios.get("/foodCatalogs").then(res => {
            this.props.dispatch({ type: "FOODDATA", data: res.data })
        })
    }
    //=====================================请求食品类型====================================//
    getFoodTypesData = () => {
        axios.get("/foodTypes/all").then(res => {
            this.props.dispatch({ type: "FOODTYPESDATA", data: res.data })
        })
    }

    toggleCollapsed = () => {
        this.setState({
            collapsed: !this.state.collapsed,
            width: this.state.collapsed ? 200 : 80,
        });
    };
    componentDidMount() {
        this.getAreaData();
        this.getFoodData();
        this.getFoodTypesData();
    }
    render() {
        return (
            <div>
                <div className="header d-flex align-center">
                    <div style={{ width: 200, textAlign: 'center' }}>react后台管理系统模板</div>
                    <div>
                        <Button type="primary" onClick={this.toggleCollapsed} style={{ marginLeft: '10px' }}>
                            {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
                        </Button>
                    </div>
                </div>
                <div className="d-flex">
                    <MenuApp history={this.props.history} width={this.state.width} collapsed={this.state.collapsed} />
                    <div style={{ flexGrow: 1 }}>
                        <BreadCrumb history={this.props.history} />
                        <div className="ml-1 content">
                            <Switch>
                                {routes.map(item => {
                                    return (
                                        <Route history={this.props.history} key={item.id} path={item.url} component={item.component}>
                                        </Route>
                                    )
                                })}
                                <Route history={this.props.history} path="/app/addProgram" component={AddProgram}>
                                </Route>
                                <Route history={this.props.history} path="/app/editProgram" component={EditProgram}>
                                </Route>
                                <Redirect exact from="/" to="/login" />
                                <Redirect to='/404' />
                            </Switch>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(({ userInfo, baseData }) => {
    return { userInfo, baseData }
})(Layoutview)
import React from 'react';
import { Route, Redirect, Switch } from "react-router-dom";
import MenuApp from "./menu"
import routes from "../router"
import { Button } from "antd"
import MenuTab from "./menu-tab/menu-tab"
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
    componentWillMount() {
        let name = "";
        routes.forEach(item => {
            if (item.url === this.props.history.location.pathname) {
                name = item.text;
            }
        })
        if (!name) {
            if (this.props.history.location.pathname === "/app/addProgram") {
                name = "新增计划"
            }
            if (this.props.history.location.pathname === "/app/editProgram") {
                name = "编辑计划"
            }
        }
        this.props.dispatch({ type: "ADDMENU", data: {...this.props.history.location, name} })
        this.props.dispatch({ type: "SETCURRENTROUTE", data: {...this.props.history.location, name} })
    }
    componentDidMount() {
        this.getAreaData();
        this.getFoodData();
        this.getFoodTypesData();
    }
    componentWillUpdate(nextProps, Props) {
        console.log(nextProps)
        //=====================================设置redux====================================//
        let name = "";
        routes.forEach(item => {
            if (item.url === nextProps.location.pathname) {
                name = item.text;
            }
        })
        if (!name) {
            if (nextProps.location.pathname === "/app/addProgram") {
                name = "新增计划"
            }
            if (nextProps.location.pathname === "/app/editProgram") {
                name = "编辑计划"
            }
        }
        this.props.dispatch({ type: "ADDMENU", data: {...nextProps.location, name,} })
        this.props.dispatch({ type: "SETCURRENTROUTE", data: nextProps.location })
    }

    handleDeleteTab = (val) => {
        this.props.dispatch({ type: "DELETEMENU", data: val })
        if (val.pathname === this.props.manyTabs.currentRoute.pathname) {
            this.props.history.push(this.props.manyTabs.menutabs[this.props.manyTabs.menutabs.length-2])
        }
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
                    <div style={{ width: `calc(100vw - ${this.state.width + 'px'})` }}>
                        <MenuTab width={this.state.width} manyTabs={this.props.manyTabs.menutabs} handleDeleteTab={(val) => this.handleDeleteTab(val)} currentMenu={this.props.manyTabs.currentRoute} history={this.props.history} />
                        <div className="ml-1 content">
                            <Switch>
                                {routes.map(item => {
                                    return (
                                        <Route history={{...this.props.history, name: item.text}} key={item.id} path={item.url} component={item.component}>
                                        </Route>
                                    )
                                })}
                                <Route history={{...this.props.history, text: "添加计划"}} path="/app/addProgram" component={AddProgram}>
                                </Route>
                                <Route history={{...this.props.history, text: "编辑计划"}} path="/app/editProgram" component={EditProgram}>
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

export default connect(({ userInfo, baseData, manyTabs }) => {
    return { userInfo, baseData, manyTabs }
})(Layoutview)
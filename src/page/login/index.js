import React, { Component } from "react"
import { Form, Input, Button, Card } from 'antd';
import axios from "../../api/index"
import md5 from "js-md5"
import {connect} from 'react-redux'
import tree from "./tree.json"
class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            validateUrl: "",
            formInfo: {
                userName: "",
                password: "",
                code: "",
            },
            loading: false,
            temp: ""
        }
    }
    componentDidMount() {
        this.getValidate();
    }
    handleLogin = () => {
        this.setState({
            loading: true
        })
        const params = {
            code: this.state.formInfo.code,
            password: md5(
                this.state.formInfo.password
            ).toUpperCase(),
            username: this.state.formInfo.userName
        }
        axios({
            url: `/login?code=${params.code}&password=${params.password}&username=${params.username}`,
            method: "post",
            headers: {
                codeKey: this.state.temp
            }
        }).then(res => {
            // localStorage.tree = JSON.stringify(tree);
            this.props.dispatch({type: "MENU", data: tree});
            localStorage.userInfo = JSON.stringify(res.data.userInfo);
            sessionStorage.token = res.data.userInfo.token;
            // this.props.history.push("/app/programmanage")
            window.location.href = "/app/programmanage"
        }).finally(() => {
            this.setState({
                loading: false
            })
        })
    }
    getValidate = () => {
        const temp = new Date().getTime();
        this.setState({
            temp: temp
        })
        sessionStorage.removeItem("_select_app_p1");
        sessionStorage.setItem("code", temp.toString());
        this.setState({
            validateUrl: "http://sz.xrdev.cn/inspection/gifCode?d=" + temp
        })
    }
    onValuesChange = (val, vals) => {
        this.setState({
            formInfo: vals
        })
    }
    onFinish = () => {
        this.handleLogin()
    }
    render() {
        const formItemLayout = {
            labelCol: {
                span: 5
            },
            wrapperCol: {
                span: 24
            },
        };
        return (
            <div className="w-100 d-flex center login" style={{ height: "100vh" }}>
                <div className="w-20" style={{ minWidth: 300 }}>
                    <Card hoverable>
                        <Form {...formItemLayout} onFinish={this.onFinish} onValuesChange={this.onValuesChange} scrollToFirstError>
                            <Form.Item name="userName" label="用户名" rules={[{ required: true, message: '请输入用户名' }]}>
                                <Input
                                    placeholder="请输入用户名"
                                    disabled={this.state.loading}
                                    type="text"
                                />
                            </Form.Item>
                            <Form.Item label="密码" name="password" rules={[{ required: true, message: '请输入密码' }]}>
                                <Input
                                    placeholder="请输入密码"
                                    type="password"
                                    disabled={this.state.loading}
                                    
                                />
                            </Form.Item>
                            <Form.Item label="验证码" name="code" rules={[{ required: true, message: '请输入验证码' }]}>
                                <div className="d-flex">
                                    <Input
                                        placeholder="请输入验证码"
                                        disabled={this.state.loading}
                                        type="text"
                                    />
                                    <img className="w-50" src={this.state.validateUrl} onClick={() => { this.getValidate(); }} alt="logo" />
                                </div>
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" loading={this.state.loading} className="w-100" htmlType="submit">登录</Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </div>
            </div>
        )
    }
}


export default connect(({userInfo, baseData}) => {
    return {userInfo, baseData}
})(Login)
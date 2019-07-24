import React, { Component } from "react"
import { Form, Icon, Input, Button, Checkbox, Divider, Card } from 'antd';
import axios from "axios"
import md5 from "js-md5"
export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userName: "",
            password: "",
            code: "",
            validateUrl: ""
        }
    }
    componentDidMount() {
        this.getValidate();
    }
    handleLogin = () => {
        const params = {
            code: this.state.code,
            password: md5(
                this.state.password
            ).toUpperCase(),
            username: this.state.userName
        }
        axios.post("/inspection/login", { params }).then(res => {
            console.log(res);
        })
    }
    getValidate = () => {
        const temp = new Date().getTime();
        sessionStorage.removeItem("_select_app_p1");
        sessionStorage.setItem("code", temp.toString());
        this.setState({
            validateUrl: "/inspection/gifCode?d=" + temp
        })
    }
    render() {
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 5 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 12 },
            },
        };
        return (
            <div className="w-100 d-flex center">
                <div className="w-30">
                    <Card>
                        <Form {...formItemLayout}>
                            <Form.Item label="用户名">
                                <Input
                                    placeholder="请输入用户名"
                                    type="text"
                                    onChange={
                                        (e) => {
                                            this.setState(
                                                {
                                                    userName: e.target.value,
                                                }
                                            )
                                        }
                                    }
                                />
                            </Form.Item>
                            <Form.Item label="密码">
                                <Input
                                    placeholder="请输入密码"
                                    type="password"
                                    onChange={
                                        (e) => {
                                            this.setState(
                                                {
                                                    password: e.target.value,
                                                }
                                            )
                                        }
                                    }
                                />
                            </Form.Item>
                            <Form.Item label="验证码">
                                <div>
                                    <Input
                                        placeholder="请输入验证码"
                                        type="password"
                                        onChange={
                                            (e) => {
                                                this.setState(
                                                    {
                                                        code: e.target.value,
                                                    }
                                                )
                                            }
                                        }
                                    />
                                    <img src={this.state.validateUrl} />
                                </div>
                            </Form.Item>
                            <div>
                                <Button className="w-50" onClick={this.handleLogin}>登录</Button>
                            </div>
                        </Form>
                    </Card>
                </div>
            </div>
        )
    }
}
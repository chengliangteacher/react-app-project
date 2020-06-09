import React from "react"
import { Card, Button, Form, Input, Select, Cascader, Row, Col } from "antd"
import axios from "../../../api/index"
const { Option } = Select;
export default class AddProgram extends React.Component {
    constructor() {
        super();
        this.state = {
            foodTypesData: JSON.parse(localStorage.foodTypesData),
            planTypeData: []
        }
    }
    handleGoBack = () => {
        this.props.history.goBack();
    }

    getPlanTypeData = () => {
        axios.get("/planTasks/planTypes").then(res => {
            const data = JSON.parse(JSON.stringify(res.data));
            this.setState({
                planTypeData: JSON.parse(JSON.stringify(data)).filter(item => !item.parentId).map(item => {
                    item.value = item.id;
                    item.label = item.name;
                    item.children = JSON.parse(JSON.stringify(data)).filter(item2 => item2.parentId === item.id).map(item3 => {
                        item3.value = item3.id;
                        item3.label = item3.name;
                        return item3;
                    })
                    return item;
                })
            })
        })
    }

    componentDidMount() {
        this.getPlanTypeData();
    }

    render() {
        return (
            <Card title="新增计划">
                <Button type="primary" onClick={this.handleGoBack}>返回</Button>
                <Form layout="inline" >
                    <Row>
                        <Col span={6}>
                            <Form.Item
                                label="计划名称"
                                style={{ width: "100%" }}
                                name="username">
                                <Input style={{ width: "100%" }} allowClear placeholder="请输入计划名称" />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                label="计划类型"
                                name="username">
                                <Cascader options={this.state.planTypeData} placeholder="请选择计划类型" />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                label="食品类型"
                                name="username">
                                <Select placeholder="请选择食品类型" style={{ width: 200 }}>
                                    {
                                        this.state.foodTypesData.map(item => {
                                            return <Option key={item.id} value={item.id}>{item.name}</Option>
                                        })
                                    }
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                label="方案编号"
                                name="username">
                                <Input allowClear placeholder="请输入方案编号" />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Card>
        )
    }
}
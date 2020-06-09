import React, { Component } from 'react';
import { Card, Form, Input, Cascader,Select,Button,Tabs,Table } from "antd"
import axios from "../../api"
const { Option } = Select;
const { TabPane } = Tabs;
class Programmanage extends Component {
    constructor() {
        super();
        this.state = {
            loading: false,
            planTypeData: [],
            foodTypeData: JSON.parse(localStorage.foodTypesData),
            data: [],
            columns: [
                {
                    title: "#",
                    align: 'center',
                    type: "key",
                    dataIndex: "key",
                    render: (tag, item) => {
                        return <div>{ item.num }</div>
                    }
                },
                {
                    title: "计划名称",
                    align: 'center',
                    key: "name",
                    dataIndex: "name"
                },
                {
                    title: "食品类型",
                    align: 'center',
                    key: "foodTypeName",
                    dataIndex: "foodTypeName"
                },
                {
                    title: "计划类型",
                    key: "planTypeName",
                    align: 'center',
                    dataIndex: "planTypeName"
                },
                {
                    title: "计划年份",
                    align: 'center',
                    key: "year",
                    dataIndex: "year"
                },
                {
                    title: "计划截至时间",
                    align: 'center',
                    key: "endDate",
                    dataIndex: "endDate"
                },
                {
                    title: "创建时间",
                    align: 'center',
                    key: "createDate",
                    dataIndex: "createDate",
                    filtered: true
                },
                {
                    align: 'center',
                    title: "操作"
                },
            ],
            state: "5",
            pagination: {
                current: 1,
                pageSize: 20,
                total: 0,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: total => `共 ${total} 条`
            },
            name: "",
            planTypeId: null,
            planSmallTypeId: null,
            foodTypeId: null,
            code: ""
        }
    }
    componentDidMount() {
        this.getPlanTypeData();
        this.getData(this.state.state);
    }
    onChange = (value) => {
        this.setState({
            state: value,
            pagination: {
                current: 1,
                pageSize: 20,
                total: 0,
            }
        })
        this.getData(value);
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
    //=====================================表格数据====================================//
    getData = (value, pagination={}) => {
        const params = {};
        params.pageSize = pagination.pageSize ? pagination.pageSize :this.state.pagination.pageSize;
        params.pageNum = pagination.current ? pagination.current : this.state.pagination.current;
        params.state = value ? value : this.state.state;
        params.code = this.state.code ? this.state.code : null;
        params.name = this.state.name ? this.state.name : null;
        params.foodTypeId = this.state.foodTypeId;
        params.planTypeId = this.state.planTypeId;
        params.planSmallTypeId = this.state.planSmallTypeId;
        this.setState({
            loading: true
        })
        axios.get("/plans", { params }).then(res => {
            this.setState((state) => {
                return {
                    data: res.data.map((item, index) => Object.assign(item, { num: index+1})),
                    loading: false,
                    pagination: {
                        current: state.pagination.current,
                        pageSize: state.pagination.pageSize,
                        total: res.total,
                    }
                }
            })
        })
    }
    //=====================================分页====================================//
    handleTableChange = (pagination, filters, sorter) => {
        this.setState((state) => {
            return {
                pagination: {
                    current: pagination.current,
                    pageSize: pagination.pageSize,
                    total: state.pagination.total,
                }
            }
        })
        this.getData(this.state.state,pagination)
    }
    handleNameChange = (e) => {
        this.setState({
            name: e.target.value
        })
    }
    handleCascaderChange = (value) => {
        if (value.length) {
            this.setState({
                planTypeId: value[0],
                planSmallTypeId: value[1]
            })
        } else {
            this.setState({
                planTypeId: null,
                planSmallTypeId: null
            })
        }
    }
    handleFoodChange = (value) => {
        this.setState({
            foodTypeId: value
        })
    }
    handleCodeChange = (e) => {
        this.setState({
            code: e.target.value
        })
    }
    addProgram = () => {
        this.props.history.push("/app/addProgram")
    }
    render() {
        const { state, pagination } = this.state
        return (
            <Card title="计划指定">
                <Form layout="inline" >
                    <Form.Item
                        label="计划名称"
                        name="username">
                        <Input onChange={this.handleNameChange} allowClear placeholder="请输入计划名称" />
                    </Form.Item>
                    <Form.Item
                        label="计划类型"
                        name="username">
                        <Cascader onChange={this.handleCascaderChange} options={this.state.planTypeData} placeholder="请选择计划类型" />
                    </Form.Item>
                    <Form.Item
                        label="食品类型"
                        name="username">
                        <Select placeholder="请选择食品类型" onChange={this.handleFoodChange} style={{ width:200 }}>
                            {
                                this.state.foodTypeData.map(item => {
                                return <Option key={item.id} value={item.id}>{item.name}</Option>
                                })
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="方案编号"
                        name="username">
                        <Input onChange={this.handleCodeChange} allowClear placeholder="请输入方案编号" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" onClick={() => { this.getData(state) }}>搜索</Button>
                    </Form.Item>
                </Form>
                <Tabs activeKey={this.state.state} onChange={this.onChange}>
                    <TabPane tab="待提交" key="5"></TabPane>
                    <TabPane tab="待审批" key="1"></TabPane>
                    <TabPane tab="审批通过" key="2"></TabPane>
                    <TabPane tab="已停用" key="3"></TabPane>
                </Tabs>
                <Button type="primary" onClick={this.addProgram}>新增计划</Button>
                <Table pagination={pagination}  onChange={this.handleTableChange} loading={ this.state.loading } rowKey={item => item.id} dataSource={this.state.data} columns={this.state.columns} />
            </Card>
        )
    }
}
export default Programmanage
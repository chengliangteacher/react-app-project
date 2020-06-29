import React, { Component } from 'react';
import { Card, Form, Input, Cascader,Select,Button,Tabs,Table, Modal } from "antd"
import axios from "../../api"
import { connect } from "react-redux"
const { Option } = Select;
const { TabPane } = Tabs;
class Programmanage extends Component {
    constructor() {
        super();
        this.state = {
            loading: false,
            planTypeData: [],
            data: [],
            btnLoading: false,
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
                    title: "操作",
                    render: (val) => {
                        if (this.state.state === "5") {
                            return (
                                <div>
                                    <Button loading={this.state.btnLoading} type="link" onClick={() => { this.handleDel(val.id) }}>删除</Button>
                                    <Button loading={this.state.btnLoading} type="link" onClick={() => { this.handelEit(val.id) }}>编辑</Button>
                                    <Button loading={this.state.btnLoading} type="link" onClick={() => { this.handleSub(val.id) }}>提交</Button>
                                </div>
                            )
                        }
                    }
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
            formInfo: {
                name: "",
                planTypeId: [],
                // planSmallTypeId: null,
                foodTypeId: "",
                code: ""
            }
        }
    }
    componentDidMount() {
        this.getPlanTypeData();
        this.getData(this.state.state);
    }
    //=====================================tab切换====================================//
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
    //=====================================请求计划类型====================================//
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
    //=====================================请求表格数据====================================//
    getData = (value, pagination={}) => {
        const params = {};
        params.pageSize = pagination.pageSize ? pagination.pageSize :this.state.pagination.pageSize;
        params.pageNum = pagination.current ? pagination.current : this.state.pagination.current;
        params.state = value ? value : this.state.state;
        params.code = this.state.formInfo.code ? this.state.formInfo.code : null;
        params.name = this.state.formInfo.name ? this.state.formInfo.name : null;
        params.foodTypeId = this.state.formInfo.foodTypeId ? this.state.formInfo.foodTypeId : null;
        params.planTypeId = this.state.formInfo.planTypeId.length > 1 ? this.state.formInfo.planTypeId[0] : null;
        params.planSmallTypeId = this.state.formInfo.planTypeId.length > 1 ? this.state.formInfo.planTypeId[1] : null;
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
    //=====================================新增计划====================================//
    addProgram = () => {
        this.props.history.push("/app/addProgram")
    }
    //=====================================form表单取值====================================//
    onValuesChange = (val, vals) => {
        this.setState({
            formInfo: vals
        })
    }
    //=====================================编辑====================================//
    handelEit = (val) => {
        this.props.history.push({
            pathname: "/app/editProgram",
            state: {
                id: val
            }
        });
    }
    //=====================================删除计划====================================//
    handleDel = (val) => {
        const modal =Modal.warning({
            title: "是否删除所选数据",
            content: "删除后此数据无法找回",
            okText: "确定",
            maskClosable: true,
            onOk: () => {
                this.setState({
                    btnLoading: true
                })
                axios.delete(`/plans/${val}`).then(res => {
                    modal.destroy();
                    this.getData();
                }).finally(() => {
                    this.setState({
                        btnLoading: false
                    })
                })

            },
        })
    }
    handleSub = (val) => {
        const modal =Modal.warning({
            title: "是否提交所选数据",
            content: "提交后数据状态会发生改变",
            okText: "确定",
            maskClosable: true,
            onOk: () => {
                this.setState({
                    btnLoading: true
                })
                axios.put(`/plans/commitPlan/${val}`).then(res => {
                    modal.destroy();
                    this.setState({
                        state: "1"
                    })
                    this.getData("1");
                }).finally(() => {
                    this.setState({
                        btnLoading: false
                    })
                })

            },
            onCancel: () => {
                modal.destroy();
            }
        })
    }
    render() {
        const { state, pagination } = this.state
        const { foodTypesData } = this.props.baseData;
        return (
            <Card title="计划指定">
                <Form layout="inline" initialValues={{ planTypeId: [], name: "", code: "" }} onValuesChange={this.onValuesChange}>
                    <Form.Item
                        label="计划名称"
                        name="name">
                        <Input allowClear placeholder="请输入计划名称" />
                    </Form.Item>
                    <Form.Item
                        label="计划类型"
                        name="planTypeId">
                        <Cascader allowClear options={this.state.planTypeData} placeholder="请选择计划类型" />
                    </Form.Item>
                    <Form.Item
                        label="食品类型"
                        name="foodTypeId">
                        <Select allowClear placeholder="请选择食品类型" style={{ width:200 }}>
                            {
                                foodTypesData.map(item => {
                                return <Option key={item.id} value={item.id}>{item.name}</Option>
                                })
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="方案编号"
                        name="code">
                        <Input allowClear placeholder="请输入方案编号" />
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
export default connect(({ userInfo, baseData }) => {
    return { userInfo, baseData }
})(Programmanage)
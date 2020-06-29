import React from "react"
import { Card, Button, Table, Form, Select, InputNumber, Row, Col, Upload,message, Modal } from "antd"
import axios from "../../../../api/index"
import { connect } from "react-redux"
import { UploadOutlined } from '@ant-design/icons';
const { Option } = Select;
const formItemLayout = {
    labelCol: {
        xxl: {
            span: 8
        },
    },
};
class SetFood extends React.Component {
    constructor() {
        super();
        this.state = {
            columns: [
                {
                    title: "#",
                    align: 'center',
                    type: "key",
                    dataIndex: "key",
                    render: (tag, item) => {
                        return <div>{item.num}</div>
                    }
                },
                {
                    title: "食品大类",
                    align: 'center',
                    key: "level1Name",
                    dataIndex: "level1Name"
                },
                {
                    title: "食品亚类",
                    align: 'center',
                    key: "level2Name",
                    dataIndex: "level2Name"
                },
                {
                    title: "食品次亚类",
                    key: "level3Name",
                    align: 'center',
                    dataIndex: "level3Name"
                },
                {
                    title: "食品细类",
                    align: 'center',
                    key: "level4Name",
                    dataIndex: "level4Name"
                },
                {
                    title: "抽检批次",
                    align: 'center',
                    key: "amount",
                    dataIndex: "amount",
                    render: (tag, val) => {
                        if (this.state.editId === val.id) {
                            return (
                                <InputNumber onBlur={(e) => { this.onBlurNumber(val, e) }} defaultValue={val.amount} />
                            )
                        } else {
                            return (<div>{val.amount}</div>)
                        }
                    }
                },
                {
                    title: "已实施批次",
                    align: 'center',
                    key: "alreadyAmount",
                    dataIndex: "alreadyAmount",
                    filtered: true
                },
                {
                    align: 'center',
                    title: "操作",
                    render: (tag, val) => {
                        return (
                            <Button type="link" disabled={this.state.btnLoading} onClick={() => { this.handleEdit(val.id) }}>编辑</Button>
                        )
                    }
                },
            ],
            tableData: [],
            loading: false,
            btnLoading: false,
            pagination: {
                current: 1,
                pageSize: 10,
                total: 0,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: total => `共 ${total} 条`
            },
            formInfo: {
                level1Id: null,
                level2Id: null,
                level3Id: null,
                level4Id: null,
                amount: 1
            },
            level2FoodData: [],
            level3FoodData: [],
            level4FoodData: [],
            editId: null,
            selectedRowKeys: []
        }
    }
    handleEdit = (val) => {
        this.setState({
            editId: val
        })
    }
    onBlurNumber = (val, e) => {
        const data = {};
        data.alreadyAmount = val.alreadyAmount;
        data.amount = e.target.value;
        data.level = 4;
        data.level1Id = val.level1Id;
        data.level1Name = val.level1Name;
        data.level2Id = val.level2Id;
        data.level2Name = val.level2Name;
        data.level3Id = val.level3Id;
        data.level3Name = val.level3Name
        data.level4Id = val.level4Id;
        data.level4Name = val.level4Name;
        data.planId = val.planId;
        this.setState({
            btnLoading: true
        })
        axios.put(`/planFoodCatalogs/${val.id}`, data).then(res => {
            this.getData();
        }).finally(() => {
            this.setState({
                btnLoading: false
            })
        })
        this.setState({
            editId: null
        })
    }
    getData = () => {
        this.setState({
            loading: true
        })
        const params = {
            pageNum: this.state.pagination.current,
            pageSize: this.state.pagination.pageSize,
            planId: this.props.planId
        }
        axios.get("/planFoodCatalogs", { params }).then(res => {
            this.setState({
                tableData: res.data.map((item, index) => Object.assign(item, { num: index + 1 }))
            })
        }).finally(() => {
            this.setState({
                loading: false
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
                    showSizeChanger: true,
                    showQuickJumper: true,
                    showTotal: total => `共 ${total} 条`
                }
            }
        }, () => {
            this.getData();
        })
    }
    //=====================================form表单变量====================================//
    onValuesChange = (val, vals) => {
        this.setState({
            formInfo: vals
        })
    }
    componentDidMount() {
        this.getData();
    }
    changeLevel1Chnage = (val) => {
        this.setState({
            level2FoodData: this.props.baseData.foodData.filter(item => item.parentId === val),
            level3FoodData: [],
            level4FoodData: [],
        })
        this.refs.setfood.setFieldsValue({
            level2Id: undefined,
            level3Id: undefined,
            level4Id: undefined,
        })
    }
    changeLevel2Chnage = (val) => {
        this.setState({
            level3FoodData: this.props.baseData.foodData.filter(item => item.parentId === val),
            level4FoodData: [],
        })
        this.refs.setfood.setFieldsValue({
            level3Id: undefined,
            level4Id: undefined,
        })
    }
    changeLevel3Chnage = (val) => {
        this.setState({
            level4FoodData: this.props.baseData.foodData.filter(item => item.parentId === val),
        })
        this.refs.setfood.setFieldsValue({
            level4Id: undefined,
        })
    }
    onFinish = () => {
        const data = { ...this.state.formInfo }
        if (data.level1Id) {
            data.level1Name = this.props.baseData.foodData.filter(item => item.level === 1).filter(item => item.id === data.level1Id)[0].name;
        }
        if (data.level2Id) {
            data.level2Name = this.state.level2FoodData.filter(item => item.id === data.level2Id)[0].name;
        }
        if (data.level3Id) {
            data.level3Name = this.state.level3FoodData.filter(item => item.id === data.level3Id)[0].name;
        }
        if (data.level4Id) {
            data.level4Name = this.state.level4FoodData.filter(item => item.id === data.level4Id)[0].name;
        }
        data.planId = this.props.planId
        this.setState({
            btnLoading: true
        })
        axios.post("/planFoodCatalogs", data).then(res => {
            this.getData();
        }).finally(() => {
            this.setState({
                btnLoading: false
            })
        })
    }
    onFinishFailed = () => {

    }
    //=====================================删除====================================//
    handleDel = () => {
        this.setState({
            btnLoading: true
        })
        axios.delete(`/planFoodCatalogs/${this.state.selectedRowKeys.join(',')}`).then(res => {
            this.getData()
        }).finally(() => {
            this.setState({
                btnLoading: false
            })
        })
    }
    //=====================================选择表格多选框====================================//
    changeRowSelection = (selectedRowKeys, selectedRows) => {
        this.setState({
            selectedRowKeys,
        })
        console.log(selectedRowKeys, selectedRows)
    }
    //=====================================下载模板====================================//
    downLoadModal = () => {
        window.location.href = `http://sz.xrdev.cn/inspection/planFoodCatalogs/export/${this.props.planId}`
    }
    render() {
       const props = {
            name: "file",
            showUploadList:false,
            action: `http://sz.xrdev.cn/inspection/planFoodCatalogs/import/${this.props.planId}`,
            onChange: (info) => {
                console.log(info);
                if (info.file.status === "done") {
                    if (info.file.response.code === 200) {
                        this.getData();
                        message.success("上传成功")
                    } else {
                        Modal.error({
                            title: "操作失败",
                            content: info.file.response.msg ? info.file.response.msg : "请联系管理员"
                        })
                    }
                }
                if (info.file.status === "error") {
                    message.error("上传失败")
                }
            }
        }
        return (
            <Card title="设置食品分类" bordered={false}>
                <Form ref="setfood" initialValues={{ amount: 1 }} {...formItemLayout} style={{ marginBottom: 10 }} onFinish={this.onFinish} onFinishFailed={this.onFinishFailed} onValuesChange={this.onValuesChange}>
                    <Row>
                        <Col xxl={6} xl={6} lg={8} md={8} sm={12} xs={24}>
                            <Form.Item
                                label="食品大类"
                                name="level1Id">
                                <Select style={{ width: "100%" }} disabled={this.state.btnLoading} onChange={this.changeLevel1Chnage} allowClear placeholder="请选择食品大类">
                                    {
                                        this.props.baseData.foodData.filter(item => item.level === 1).map(item => {
                                            return <Option key={item.id} value={item.id}>{item.name}</Option>
                                        })
                                    }
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xxl={6} xl={6} lg={8} md={8} sm={12} xs={24}>
                            <Form.Item
                                label="食品亚类"
                                name="level2Id">
                                <Select style={{ width: "100%" }} disabled={this.state.btnLoading} onChange={this.changeLevel2Chnage} allowClear placeholder="请选择食品亚类">
                                    {
                                        this.state.level2FoodData.map(item => {
                                            return <Option key={item.id} value={item.id}>{item.name}</Option>
                                        })
                                    }
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xxl={6} xl={6} lg={8} md={8} sm={12} xs={24}>
                            <Form.Item
                                label="食品次亚类"
                                name="level3Id">
                                <Select style={{ width: "100%" }} disabled={this.state.btnLoading} onChange={this.changeLevel3Chnage} allowClear placeholder="请选择食品次亚类">
                                    {
                                        this.state.level3FoodData.map(item => {
                                            return <Option key={item.id} value={item.id}>{item.name}</Option>
                                        })
                                    }
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xxl={6} xl={6} lg={8} md={8} sm={12} xs={24}>
                            <Form.Item
                                label="食品细类"
                                name="level4Id">
                                <Select style={{ width: "100%" }} disabled={this.state.btnLoading} allowClear placeholder="请选择食品细类">
                                    {
                                        this.state.level4FoodData.map(item => {
                                            return <Option key={item.id} value={item.id}>{item.name}</Option>
                                        })
                                    }
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xxl={6} xl={6} lg={8} md={8} sm={12} xs={24}>
                            <Form.Item
                                label="批次"
                                name="amount">
                                <InputNumber disabled={this.state.btnLoading} style={{ width: "100%" }} min={1} />
                            </Form.Item>
                        </Col>
                        <Col xxl={6} xl={6} lg={8} md={8} sm={12} xs={24}>
                            <Form.Item wrapperCol={{ offset: 5 }}>
                                <Button loading={this.state.btnLoading} htmlType="submit" type="primary">添加</Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
                <div className="d-flex">
                    <Upload { ...props }>
                        <Button type="primary" disabled={this.state.btnLoading || this.state.loading} style={{ marginRight: 10 }}><UploadOutlined />导入食品分类</Button>
                    </Upload>
                    <Button type="primary" disabled={this.state.btnLoading || this.state.loading} onClick={ this.downLoadModal } style={{ marginRight: 10 }}>下载模板</Button>
                    <Button type="danger" disabled={this.state.btnLoading || this.state.loading} onClick={this.handleDel}>批量删除</Button>
                </div>
                <Table rowSelection={{ onChange: this.changeRowSelection }} pagination={this.state.pagination} onChange={this.handleTableChange} loading={this.state.loading} rowKey={item => item.id} dataSource={this.state.tableData} columns={this.state.columns} />
            </Card>
        )
    }
}
export default connect(({ userInfo, baseData }) => {
    return { userInfo, baseData }
})(SetFood)
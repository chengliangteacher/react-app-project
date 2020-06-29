import React from "react"
import axios from "../../../api/index"
import moment from "moment"
import SetFood from "./com/set-food"
import { Card, Button, Form, Input, Select, Cascader, Row, Col, DatePicker, InputNumber, Radio, Divider } from "antd"
import { connect } from "react-redux"
import { Fragment } from "react"
const { Option } = Select;
// const [form] = Form.useForm();
const formItemLayout = {
    labelCol: {
        span: 6
    },
    // wrapperCol: { span: 14 },
};
class EditProgram extends React.Component {
    constructor() {
        super();
        this.state = {
            editId: null,
            planTypeData: [],
            indeterminate: false,
            checkAll: false,
            checkedList: [],
            open: false,
            companyData: [],
            organData: [],
            regulationPlans: [],
            formInfo: {
                amount: 0,
                areaId: [],
                detectionCompanyId: null,
                endDate: "",
                foodTypeId: null,
                name: "",
                planClassify: "",
                planTypeId: [],
                ruleId: null,
                sampleCompanyId: null,
                specialWay: 0,
                taskSourceId: null,
                feeTemplateId: null
            },
            feeTemplateData: [],
            feetemplateDisabled: true,
            loading: false,
            planData: []
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
                }),
                planData: res.data
            })
        })
    }

    getRegulationPlans = () => {
        axios.get("/regulationPlans").then(res => {
            this.setState({
                regulationPlans: res.data
            })
        })
    }

    getCompanyData = () => {
        axios.get("/plan/companys").then(res => {
            this.setState({
                companyData: res.data
            })
        })
    }

    getOrangeData = () => {
        axios.get("/plan/organizations").then(res => {
            this.setState({
                organData: res.data
            })
        })
    }

    componentDidMount() {
        this.getPlanTypeData();
        this.getCompanyData();
        this.getOrangeData();
        this.getRegulationPlans();
        this.setState({
            editId: this.props.history.location.state ? this.props.history.location.state.id : null
        })
        this.getoneplan(this.props.history.location.state.id);
    }

    onCheckAllChange = (e) => {
        this.setState({
            indeterminate: false,
            checkAll: e.target.checked,
        });
    }

    onFinish = () => {
        this.setState({
            loading: true
        })
        const data = {};
        data.amount = this.state.formInfo.amount;
        data.name = this.state.formInfo.name;
        data.feeTemplateId = this.state.formInfo.feeTemplateId;
        data.year = moment(this.state.formInfo.year).format("YYYY");
        data.endDate = moment(this.state.formInfo.endDate).format("YYYY-MM-DD HH:mm:ss");
        data.sampleCompanyId = this.state.formInfo.sampleCompanyId;
        data.planClassify = this.state.formInfo.planClassify;
        data.specialWay = this.state.formInfo.specialWay;
        data.ruleId = this.state.formInfo.ruleId;
        data.name = this.state.formInfo.name;
        data.foodTypeId = this.state.formInfo.foodTypeId;
        data.areaId = 3;
        data.areaIds = this.state.formInfo.areaId.join(",");
        data.detectionCompanyId = this.state.formInfo.detectionCompanyId;
        data.taskSourceId = this.state.formInfo.taskSourceId;
        const areaName = [];
        this.props.baseData.areaData.forEach(item => {
            if (this.state.formInfo.areaId.some(item2 => item2 === item.id)) {
                areaName.push(item.name)
            }
        })
        data.areaNames = areaName.join(",");
        data.taskSource = this.state.organData.filter(item => item.id === this.state.formInfo.taskSourceId)[0].orgName;
        data.sampleCompanyName = this.state.companyData.filter(item => item.id === this.state.formInfo.sampleCompanyId)[0].companyName;
        data.detectionCompanyName = this.state.companyData.filter(item => item.id === this.state.formInfo.detectionCompanyId)[0].companyName;
        data.foodTypeName = this.props.baseData.foodTypesData.filter(item => item.id === this.state.formInfo.foodTypeId)[0].name;
        data.planTypeName = this.state.planData.filter(item => item.id === this.state.formInfo.planTypeId[0])[0].name;
        data.planTypeId = this.state.formInfo.planTypeId[0];
        data.planSmallTypeId = this.state.formInfo.planTypeId[1];
        data.planSmallTypeName = this.state.planData.filter(item => item.id === this.state.formInfo.planTypeId[1])[0].name;
        data.planSmallTypeCode = this.state.planData.filter(item => item.id === this.state.formInfo.planTypeId[1])[0].code;
        console.log(data);
        axios.put(`/plans/${this.state.editId}`, data).then(res => {
            // this.props.history.push("/app/programmanage")
        }).finally(() => {
            this.setState({
                loading: false
            })
        })
    }

    onFinishFailed = () => {
    }

    onValuesChange = (val, vals) => {
        console.log(11111);
        let isbool = false;
        let key = Object.keys(val)[0];
        if (key === "sampleCompanyId" || key === "detectionCompanyId" || key === "taskSourceId" || key === "planTypeId") {
            isbool = true
        } else {
            isbool = false
        }
        if (vals.sampleCompanyId && vals.detectionCompanyId && vals.taskSourceId && vals.planTypeId.length !== 0) {
            if (isbool) {
                this.getFeetemplateData(vals)
            }
            this.setState({
                formInfo: vals,
                feetemplateDisabled: false
            })
        } else {
            this.setState({
                formInfo: vals,
                feetemplateDisabled: true
            })
        }
    }

    onFieldsChange = (val, vals) => {
    }


    getFeetemplateData = (vals) => {
        axios.get(`/plan/getFeeTemplates?sampleCompanyId=${vals.sampleCompanyId}&detectionCompanyId=${vals.detectionCompanyId}&taskSourceId=${vals.taskSourceId}&planSmallTypeId=${vals.planTypeId[1]}`).then(res => {
            this.setState({
                feeTemplateData: res.data
            })
        })
    }


    getoneplan = (val) => {
        this.setState({
            loading: true
        })
        axios.get(`/plans/${val}`).then(res => {
            this.setState({
                feetemplateDisabled: false,
                formInfo: {
                    feetemplateDisabled: false,
                    amount: res.data.plan.amount,
                    areaId: res.data.plan.areaIds.split(",").map(item => Number(item)),
                    detectionCompanyId: res.data.plan.detectionCompanyId,
                    endDate: moment(res.data.plan.endDate, "YYYY-MM-DD hh:mm:ss"),
                    year: moment(res.data.plan.year, "YYYY"),
                    foodTypeId: res.data.plan.foodTypeId,
                    name: res.data.plan.name,
                    planClassify: res.data.plan.planClassify,
                    planTypeId: [res.data.plan.planTypeId, res.data.plan.planSmallTypeId],
                    ruleId: res.data.plan.ruleId,
                    sampleCompanyId: res.data.plan.sampleCompanyId,
                    specialWay: res.data.plan.specialWay,
                    taskSourceId: res.data.plan.taskSourceId,
                    feeTemplateId: res.data.plan.feeTemplateId
                }
            }, () => {
                this.getFeetemplateData(this.state.formInfo)
            })
            this.refs.formInfo.setFieldsValue(
                {
                    amount: res.data.plan.amount,
                    areaId: res.data.plan.areaIds.split(",").map(item => Number(item)),
                    detectionCompanyId: res.data.plan.detectionCompanyId,
                    endDate: moment(res.data.plan.endDate, "YYYY-MM-DD hh:mm:ss"),
                    year: moment(res.data.plan.year, "YYYY"),
                    foodTypeId: res.data.plan.foodTypeId,
                    name: res.data.plan.name,
                    planClassify: res.data.plan.planClassify,
                    planTypeId: [res.data.plan.planTypeId, res.data.plan.planSmallTypeId],
                    ruleId: res.data.plan.ruleId,
                    sampleCompanyId: res.data.plan.sampleCompanyId,
                    specialWay: res.data.plan.specialWay,
                    taskSourceId: res.data.plan.taskSourceId,
                    feeTemplateId: res.data.plan.feeTemplateId
                }
            )
        }).finally(() => {
            this.setState({
                loading: false
            })
        })
    }

    render() {
        return (
            <Fragment>
                <Card bordered={false} title={
                    <span>
                        <Button type="primary" style={{ marginRight: 10 }} disabled={this.state.loading} size="small" onClick={this.handleGoBack}>返回</Button>
                        <span>编辑计划</span>
                    </span>
                }>
                    <Form initialValues={{ amount: 1, specialWay: 0, planTypeId: [], areaId: [] }} onFinish={this.onFinish} onFinishFailed={this.onFinishFailed} ref="formInfo" {...formItemLayout} onValuesChange={this.onValuesChange} onFieldsChange={this.onFieldsChange}>
                        <Row>
                            <Col xxl={6} xl={6} lg={8} md={8} sm={12} xs={24}>
                                <Form.Item
                                    label="计划名称"
                                    className="w-100"
                                    name="name"
                                    rules={[{ required: true, message: '请输入计划名称' }]}>
                                    <Input disabled={this.state.loading} style={{ width: 192 }} allowClear placeholder="请输入计划名称" />
                                </Form.Item>
                            </Col>
                            <Col xxl={6} xl={6} lg={8} md={8} sm={12} xs={24}>
                                <Form.Item
                                    label="计划类型"
                                    className="w-100"
                                    rules={[{ required: true, message: '请选择计划类型' }]}
                                    name="planTypeId">
                                    <Cascader disabled={this.state.loading} style={{ width: 192 }} options={this.state.planTypeData} placeholder="请选择计划类型" />
                                </Form.Item>
                            </Col>
                            <Col xxl={6} xl={6} lg={8} md={8} sm={12} xs={24}>
                                <Form.Item
                                    label="食品类型"
                                    className="w-100"
                                    rules={[{ required: true, message: '请选择食品类型' }]}
                                    name="foodTypeId">
                                    <Select disabled={this.state.loading} style={{ width: 192 }} allowClear placeholder="请选择食品类型">
                                        {
                                            this.props.baseData.foodTypesData.map(item => {
                                                return <Option key={item.id} value={item.id}>{item.name}</Option>
                                            })
                                        }
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col xxl={6} xl={6} lg={8} md={8} sm={12} xs={24}>
                                <Form.Item
                                    label="计划年份"
                                    className="w-100"
                                    rules={[{ required: true, message: '请选择计划年份' }]}
                                    name="year">
                                    <DatePicker disabled={this.state.loading} style={{ width: 192 }} allowClear placeholder="请选择计划年份" picker="year" />
                                </Form.Item>
                            </Col>
                            <Col xxl={6} xl={6} lg={8} md={8} sm={12} xs={24}>
                                <Form.Item
                                    label="计划地区"
                                    className="w-100"
                                    rules={[{ required: true, message: '请选择计划地区' }]}
                                    name="areaId">
                                    <Select disabled={this.state.loading} dropdownMatchSelectWidth={false} mode="multiple" maxTagCount={1} style={{ width: 192 }} allowClear placeholder="请选择计划地区">
                                        {
                                            this.props.baseData.areaData.map(item => {
                                                return <Option key={item.id} value={item.id}>{item.name}</Option>
                                            })
                                        }
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col xxl={6} xl={6} lg={8} md={8} sm={12} xs={24}>
                                <Form.Item
                                    label="计划截至时间"
                                    rules={[{ required: true, message: '请选择计划截至时间' }]}
                                    className="w-100"
                                    name="endDate">
                                    <DatePicker disabled={this.state.loading} style={{ width: 192 }} showTime={{ format: 'HH:mm:ss' }} format="YYYY-MM-DD HH:mm:ss" allowClear placeholder="请选择计划截至时间" />
                                </Form.Item>
                            </Col>
                            <Col xxl={6} xl={6} lg={8} md={8} sm={12} xs={24}>
                                <Form.Item
                                    label="计划总批次"
                                    className="w-100"
                                    rules={[{ required: true, message: '请输入计划总批次' }]}
                                    name="amount">
                                    <InputNumber disabled={this.state.loading} min={1} style={{ width: 192 }} />
                                </Form.Item>
                            </Col>
                            <Col xxl={6} xl={6} lg={8} md={8} sm={12} xs={24}>
                                <Form.Item
                                    label="抽样机构"
                                    className="w-100"
                                    rules={[{ required: true, message: '请选择抽样机构' }]}
                                    name="sampleCompanyId">
                                    <Select disabled={this.state.loading} style={{ width: 192 }} allowClear placeholder="请选择抽样机构">
                                        {
                                            this.state.companyData.map(item => {
                                                return <Option key={item.id} value={item.id}>{item.companyName}</Option>
                                            })
                                        }
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col xxl={6} xl={6} lg={8} md={8} sm={12} xs={24}>
                                <Form.Item
                                    label="检验机构"
                                    className="w-100"
                                    rules={[{ required: true, message: '请选择抽检验机构' }]}
                                    name="detectionCompanyId">
                                    <Select disabled={this.state.loading} style={{ width: 192 }} allowClear placeholder="请选择检验机构">
                                        {
                                            this.state.companyData.map(item => {
                                                return <Option key={item.id} value={item.id}>{item.companyName}</Option>
                                            })
                                        }
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col xxl={6} xl={6} lg={8} md={8} sm={12} xs={24}>
                                <Form.Item
                                    label="任务来源"
                                    className="w-100"
                                    rules={[{ required: true, message: '请选择任务来源' }]}
                                    name="taskSourceId">
                                    <Select disabled={this.state.loading} style={{ width: 192 }} allowClear placeholder="请选择任务来源">
                                        {
                                            this.state.organData.map(item => {
                                                return <Option key={item.id} value={item.id}>{item.orgName}</Option>
                                            })
                                        }
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col xxl={6} xl={6} lg={8} md={8} sm={12} xs={24}>
                                <Form.Item
                                    label="制定类型"
                                    className="w-100"
                                    rules={[{ required: true, message: '请选择制定类型' }]}
                                    name="planClassify">
                                    <Select disabled={this.state.loading} style={{ width: 192 }} allowClear placeholder="请选择制定类型">
                                        <Option value={1}>以食品类型制定</Option>
                                        <Option value={2}>以受检单位制定</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col xxl={6} xl={6} lg={8} md={8} sm={12} xs={24}>
                                <Form.Item
                                    label="特殊下达"
                                    className="w-100"
                                    rules={[{ required: true, message: '请选择选择下达方式' }]}
                                    name="specialWay">
                                    <Radio.Group disabled={this.state.loading}>
                                        <Radio value={1}>是</Radio>
                                        <Radio value={0}>否</Radio>
                                    </Radio.Group>
                                </Form.Item>
                            </Col>
                            <Col xxl={6} xl={6} lg={8} md={8} sm={12} xs={24}>
                                <Form.Item
                                    label="校验规则"
                                    className="w-100"
                                    rules={[{ required: true, message: '请选择选择校验规则' }]}
                                    name="ruleId">
                                    <Select disabled={this.state.loading} style={{ width: 192 }} allowClear placeholder="请选择校验规则">
                                        {
                                            this.state.regulationPlans.map(item => {
                                                return <Option key={item.id} value={item.id}>{item.name}</Option>
                                            })
                                        }
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col xxl={6} xl={6} lg={8} md={8} sm={12} xs={24}>
                                <Form.Item
                                    label="价格模板"
                                    className="w-100"
                                    rules={[{ required: true, message: '请选择选择价格模板' }]}
                                    name="feeTemplateId">
                                    <Select style={{ width: 192 }} disabled={this.state.feetemplateDisabled || this.state.loading} allowClear placeholder="请选择价格模板">
                                        {
                                            this.state.feeTemplateData.map(item => {
                                                return <Option key={item.id} value={item.id}>{item.name}</Option>
                                            })
                                        }
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                                <Form.Item wrapperCol={{ offset: 1 }}>
                                    <Divider orientation="left">操作</Divider>
                                    <Button type="primary" style={{ width: 100 }} loading={this.state.loading} htmlType="submit">保存</Button>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Card>
                <SetFood planId={ this.props.history.location.state.id } />
            </Fragment>
        )
    }
}


export default connect(({ userInfo, baseData }) => {
    return { userInfo, baseData }
})(EditProgram)
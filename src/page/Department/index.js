import React, { Component } from 'react';
import { Row, Col, DatePicker, Card, Table } from "antd"
// import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/bar';  //折线图是line,饼图改为pie,柱形图改为bar
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';
import ReactEcharts from 'echarts-for-react';
import AreaTable from "./areaTable.js"
import axios from "../../api/index"
class Department extends Component {
    constructor() {
        super();
        this.state = {
            exportData: [],
            columns_cj: [
                {
                    title: "抽检类型",
                    align: 'center',
                    key: "planTypeName",
                    dataIndex: "planTypeName",
                    render: (text, row, index) => {
                        return {
                            children: <span>{text}</span>,
                            props: {
                                rowSpan: index === 0 ? this.state.cjData.length : 0
                            }
                        }
                    }
                },
                {
                    title: "抽检环节",
                    align: 'center',
                    key: "enterpriseLinkName",
                    dataIndex: "enterpriseLinkName"
                },
                {
                    title: "抽检批次",
                    align: 'center',
                    key: "totalAmount",
                    dataIndex: "totalAmount"
                },
                {
                    title: "合格批次",
                    align: 'center',
                    key: "passAmount",
                    dataIndex: "passAmount"
                },
                {
                    title: "不合格批次",
                    align: 'center',
                    key: "notPassAmount",
                    dataIndex: "notPassAmount"
                },
                {
                    title: "问题批次",
                    align: 'center',
                    key: "problemAmount",
                    dataIndex: "problemAmount"
                },
                {
                    title: "问题发现率",
                    align: 'center',
                    key: "problemRate",
                    dataIndex: "problemRate"
                },
                {
                    title: "家次数",
                    align: 'center',
                    key: "jcs",
                    dataIndex: "jcs"
                },
                {
                    title: "家数",
                    align: 'center',
                    key: "js",
                    dataIndex: "js"
                },
                {
                    title: "项次数",
                    align: 'center',
                    key: "items",
                    dataIndex: "items"
                },
            ],
            columns_fx: [
                {
                    title: "抽检类型",
                    align: 'center',
                    key: "planTypeName",
                    dataIndex: "planTypeName",
                    render: (text, row, index) => {
                        return {
                            children: <span>{text}</span>,
                            props: {
                                rowSpan: index === 0 ? this.state.cjData.length : 0
                            }
                        }
                    }
                },
                {
                    title: "抽检环节",
                    align: 'center',
                    key: "enterpriseLinkName",
                    dataIndex: "enterpriseLinkName"
                },
                {
                    title: "抽检批次",
                    align: 'center',
                    key: "totalAmount",
                    dataIndex: "totalAmount"
                },
                {
                    title: "不判定批次",
                    align: 'center',
                    key: "notJudAmount",
                    dataIndex: "notJudAmount"
                },
                {
                    title: "问题批次",
                    align: 'center',
                    key: "problemAmount",
                    dataIndex: "problemAmount"
                },
                {
                    title: "合格率",
                    align: 'center',
                    key: "passRate",
                    dataIndex: "passRate"
                },
                {
                    title: "家次数",
                    align: 'center',
                    key: "jcs",
                    dataIndex: "jcs"
                },
                {
                    title: "家数",
                    align: 'center',
                    key: "js",
                    dataIndex: "js"
                },
                {
                    title: "项次数",
                    align: 'center',
                    key: "items",
                    dataIndex: "items"
                },
                {
                    title: "不合格项次数",
                    align: 'center',
                    key: "notPassItems",
                    dataIndex: "notPassItems"
                },
            ],
            columns: [
                {
                    title: "序号",
                    align: 'center',
                    type: "key",
                    dataIndex: "key",
                    width: 80,
                    render: (tag, item) => {
                        return <div>{ item.num }</div>
                    }
                },
                {
                    title: "样品名称",
                    align: 'center',
                    width: 100,
                    key: "sampleName",
                    dataIndex: "sampleName"
                },
                {
                    title: "受检单位名称",
                    align: 'center',
                    width: 250,
                    key: "enterpriseName",
                    dataIndex: "enterpriseName"
                },
                {
                    title: "受检单位地址",
                    width: 250,
                    key: "enterpriseAddress",
                    align: 'center',
                    dataIndex: "enterpriseAddress"
                },
                {
                    title: "食品大类",
                    width: 120,
                    align: 'center',
                    key: "level1Name",
                    dataIndex: "level1Name"
                },
                {
                    title: "食品亚类",
                    width: 120,
                    align: 'center',
                    key: "level2Name",
                    dataIndex: "level2Name"
                },
                {
                    title: "食品次亚类",
                    width: 120,
                    align: 'center',
                    key: "level3Name",
                    dataIndex: "level3Name",
                },
                {
                    title: "食品细类",
                    width: 120,
                    align: 'center',
                    key: "level4Name",
                    dataIndex: "level4Name",
                },
                {
                    title: "报告结论",
                    width: 200,
                    align: 'center',
                    key: "detectionResultConclusion",
                    dataIndex: "detectionResultConclusion",
                },
                {
                    align: 'center',
                    width: 200,
                    title: "操作",
                    render: (val) => {
                    }
                },
            ],
            cjData: [],
            fxData: [],
            loading_export: false,
            options: {
            },
            pagination: {
                current: 1,
                pageSize: 20,
                total: 0,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: total => `共 ${total} 条`
            },
            loading: false,
            data: [],
            visible: false,
            regionName: ""
        }
    }
    componentDidMount() {
        this.getExportData();
        this.getAreaDataNew();
        this.getStatisticsData();
    }

    getExportData = () => {
        this.setState({
            loading_export: true
        })
        const data = {
            state: 12,
            year: 2020
        }
        axios.post("/plan/getExportDataNew", data).then(res => {
            this.setState({
                cjData: res.data.exportDataVOList.filter(item => item.planTypeName === "监督抽检"),
                fxData: res.data.exportDataVOList.filter(item => item.planTypeName === "风险监测"),
            })
        }).finally(() => {
            this.setState({
                loading_export: false
            })
        })
    }


    getStatisticsData = () => {
        const data = {};
        data.state = 12;
        data.year = 2020;
        this.setState({
            loading: true
        })
        axios.post(`/statisticsTotalsNew?pageNum=${this.state.pagination.current}&&pageSize=${this.state.pagination.pageSize}`, data).then(res => {
            this.setState({
                data: res.data.map((item, index) => Object.assign(item, { num: index+1 })),
                pagination: {
                    current: this.state.pagination.current,
                    pageSize: this.state.pagination.pageSize,
                    total: res.total,
                    showSizeChanger: true,
                    showQuickJumper: true,
                    showTotal: total => `共 ${total} 条`
                }
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
            this.getStatisticsData()
        })
    }

    getAreaDataNew = () => {
        axios.post("/plan/getAreaDataNew", { year: 2020, endDate: "", startDate: "" }).then(res => {
            const data = []
            res.data.forEach(item => {
                data.push(
                    {
                        "area": item.regionName,
                        "抽样数量": item.sampleAmount ? item.sampleAmount : 0,
                        "检验数量": item.detectionAmount ? item.detectionAmount : 0,
                        "不合格数量": item.notPassAmount ? item.notPassAmount : 0,
                        "已处置数量": item.disposal ? item.disposal : 0,
                    },
                )
            })
            this.setState({
                options: {
                    tooltip: {
                        show: true,
                        trigger: "axis",
                        axisPointer: {
                            type: "shadow"
                        },
                        // formatter: '{b0}: {c0}<br />{b1}: {c1}<br />{b2}: {c2}<br />{b3}:{c3}'
                    },
                    xAxis: { type: 'value' },
                    yAxis: {
                        type: "category",
                        nameTextStyle: {
                            color: "green"
                        }
                    },
                    dataset: {
                        dimensions: ['area', '抽样数量', '检验数量', '不合格数量', "已处置数量"],
                        source: data
                    },
                    legend: {
                        show: true,
                        bottom: 10
                    },
                    // Declare several bar series, each will be mapped
                    // to a column of dataset.source by default.
                    series: [
                        {type: "bar", itemStyle: { color: "blue" }},
                        {type: "bar", itemStyle: { color: "green" }},
                        {type: "bar", itemStyle: { color: "red" }},
                        {type: "bar", itemStyle: { color: "#eee" }},
                    ]
                }
            }, () => {
                console.log(this.state.options)
            })
        })
    }


    onclick = {
        'click': this.clickEchartsBar.bind(this)
    }

    clickEchartsBar(e) {
        this.setState({
            visible: true,
            regionName: e.name

        }, () => {
            this.refs.areatable.getData();
        })
    }
    setVisible = (val) => {
        this.setState({
            visible: val
        })
    }

    render() {
        return (
            <div gutter={10}>
                <Row>
                    <Col span={24}>
                        <DatePicker style={{ width: 200, margin: 10 }} picker="year" placeholder="计划年份" />
                    </Col>
                    <Col span={16}>
                        <Card bordered={false} title="汇总数据">
                            <Table bordered={true} pagination={false} loading={this.state.loading_export} rowKey={(item, index) => index} dataSource={this.state.cjData} columns={this.state.columns_cj} />
                            <Table bordered={true} pagination={false} loading={this.state.loading_export} rowKey={(item, index) => index} dataSource={this.state.fxData} columns={this.state.columns_fx} />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card title="区域统计" bordered={false}>
                            <ReactEcharts ref="echarts" onEvents={this.onclick} option={this.state.options} theme="Imooc" style={{ width: "100%",height: '600px' }} />
                            <AreaTable ref="areatable" visible={this.state.visible} regionName={this.state.regionName} setVisible={this.setVisible} />
                        </Card>
                    </Col>
                    <Col span={24}>
                        <Card title="明细数据" bordered={false}></Card>
                        <Table pagination={this.state.pagination} showSorterTooltip={true} onChange={this.handleTableChange} loading={ this.state.loading } rowKey={item => item.id} dataSource={this.state.data} columns={this.state.columns} />
                    </Col>
                </Row>
            </div>
        )
    }
}
export default Department
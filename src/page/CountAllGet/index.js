import React, { Component } from 'react';
import { Card, Tabs, Row, Col } from "antd"
import 'echarts/lib/chart/bar';  //折线图是line,饼图改为pie,柱形图改为bar
import 'echarts/lib/chart/tree';  //折线图是line,饼图改为pie,柱形图改为bar
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';
import ReactEcharts from 'echarts-for-react';
import { TransitionGroup, CSSTransition } from "react-transition-group"
import axios from "../../api/index"
const { TabPane } = Tabs
let options2 = {};
class CountAllGet extends Component {
    constructor() {
        super();
        this.state = {
            tabs: [
                {
                    key: "1",
                    tab: "计划类型"
                },
                {
                    key: "2",
                    tab: "抽样环节"
                },
                {
                    key: "3",
                    tab: "业态"
                },
                {
                    key: "4",
                    tab: "受检单位所在区"
                },
                {
                    key: "5",
                    tab: "生产企业所在省"
                },
                {
                    key: "6",
                    tab: "抽样时间(月)"
                },
                {
                    key: "7",
                    tab: "抽样时间(季)"
                },
                {
                    key: "8",
                    tab: "食品大类"
                },
                {
                    key: "9",
                    tab: "食品细类"
                },
                {
                    key: "10",
                    tab: "检验项目"
                },
            ],
            key: "1",
            options: {},
            options2: {},
            data: {},
            barName: "",
            treeData: [],
        }
        this.echartsReact = React.createRef();
        this.echarts = React.createRef();
    }

    componentDidMount() {
        this.getData();
    }

    getData = () => {
        const params = {
            type: this.state.key,
            quota: 1
        }
        this.echarts.getEchartsInstance().showLoading();
        axios.get("/sampleorigins", { params }).then(res => {
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
                    xAxis: { type: 'category' },
                    yAxis: {
                        type: "value",
                    },
                    dataset: {
                        source: res.data.map(item => {
                            return {
                                name: item.host,
                                "深圳抽检": item.ratio
                            }
                        })
                    },
                    legend: {
                        show: true,
                        right: 10
                    },
                    // Declare several bar series, each will be mapped
                    // to a column of dataset.source by default.
                    series: [
                        { type: "bar", itemStyle: { color: "#336699" }, label: { show: true, position: "top", formatter: (val) => (val.value['深圳抽检']).toFixed(2) + "%" } },
                    ]
                }
            })
        }).finally(() => {
            this.echarts.getEchartsInstance().hideLoading();
        })
    }

    onclick = {
        'click': this.clickEchartsBar.bind(this)
    }

    clickEchartsBar(e) {
        const data = {
            name: e.name,
            children: this.state.tabs.filter(item => item.key !== "10" && item.key !== this.state.key).map(item => { return { name: item.tab, type: this.state.key + "," + item.key, host: e.name, children: []} })
        }

        options2 = {
            title: {
                text: `${this.state.tabs.filter(item => item.key === this.state.key)[0].tab}[${e.name}]不合格样品率成因分析`,
                left: "center"

            },
            series: [
                {
                    type: "tree",
                    data: [data],
                    // roam: true,
                    label: {
                        position: "top"
                    },
                    symbolSize: 7,
                    expandAndCollapse: true,
                    initialTreeDepth: -1,
                    layout: "radial"
                    // symbol: "pin"
                    // layout: 'radial',
                }
            ]
        }
        if (this.state.barName) {
            this.echartsReact.getEchartsInstance().setOption(options2)
        }
        this.setState({
            barName: e.name,
        })
    }
    changeTab = (key) => {
        this.setState({
            key,
            barName: ""
        }, () => {
            this.getData();
        })
    }


    renderTree = () => {
        if (this.state.key && this.state.barName) {
            return (
                <TransitionGroup>
                    <CSSTransition appear={true} timeout={500}>
                        <ReactEcharts ref={ (e) => { this.echartsReact = e } } onEvents={this.treeclick} option={options2} theme="Imooc" style={{ height: '1000px', backgroundColor: "#eeeeee" }} />
                    </CSSTransition>
                </TransitionGroup>
            )
        } else {
            return;
        }
    }

    treeclick = {
        'click': this.clickEchartsTree.bind(this)
    }

    clickEchartsTree(e) {
        if (e.data.children.length === 0) {
            if (this.state.tabs.some(item => item.tab === e.name)) {
                const data = {
                    host: e.data.host,
                    type: e.data.type,
                }
                this.echartsReact.getEchartsInstance().showLoading();
                axios.post("/sampleoriginsmuch/1", data).then(res => {
                    this.echartsReact.getEchartsInstance().setOption({});
                    this.dealTreeData(options2.series[0].data, e.data, res.data);
                    this.echartsReact.getEchartsInstance().setOption(this.echartsReact.props.option)
                }).finally(() => {
                this.echartsReact.getEchartsInstance().hideLoading();
                })
            } else {
                this.echartsReact.getEchartsInstance().setOption({});
                this.dealTreeData2(options2.series[0].data, e.data);
                this.echartsReact.getEchartsInstance().setOption(this.echartsReact.props.option);
            }
        }
    }

    dealTreeData2 = (data, val) => {
        const current = this.state.tabs.filter(item => !val.type.split(",").some(item2 => item2 === item.key || item.key === "10")).map(item => {
            return {
                name: item.tab,
                type: val.type + "," + item.key,
                host: val.host,
                children: [],
            }
        })
        data.forEach(item => {
            if (item.name === val.name && item.type === val.type && item.host === val.host) {
                item.children = current
            }
            if (item.children) {
                this.dealTreeData2(item.children, val)
            }
        })
    }

    dealTreeData = (data, val, cut) => {
        const current = cut.map(item => {
            return {
                name: item.host,
                value: item.ratio,
                host: val.host + "," + item.host,
                type: val.type,
                children: [],
            }
        })
        data.forEach(item => {
            if (item.name === val.name && item.type === val.type && item.host === val.host) {
                item.children = current
            }
            if (item.children) {
                this.dealTreeData(item.children, val, cut);
            }
        })
    }

    getTreeNodedata = (val) => {
        const data = {
            host: val.host,
            type: val.type,
        }
        axios.post("/sampleoriginsmuch/1", data).then(res => {
            const data2 = JSON.parse(JSON.stringify(this.state.treeData));
            // this.dealTreeData(data2, val, res.data);
            const current = res.data.map(item => {
                return {
                    name: item.host,
                    value: item.ratio,
                    host: val.host + "," + item.host,
                    type: val.type,
                    animationDelayUpdate: function (idx) {
                        return idx * 100
                    },
                    children: []
                }
            })
            val.data.children = current
            this.setState({
                treeData: data2,
                options2: {
                    title: {
                        text: `${this.state.tabs.filter(item => item.key === this.state.key)[0].tab}[${this.state.barName}]不合格样品率成因分析`,
                        left: "center"

                    },
                    series: [
                        {
                            type: "tree",
                            data: data2,
                            // roam: true,
                            label: {
                                position: "top"
                            },
                            symbolSize: 7,
                            expandAndCollapse: true,
                            // symbol: "pin"
                            // layout: 'radial',
                        }
                    ]
                }
            })
        })
    }


    render() {
        return (
            <div>
                <Card title="成因分析" bordered={false}>
                    <Tabs defaultValue="1" type="card" onChange={this.changeTab}>
                        {
                            this.state.tabs.map(item => {
                                return (
                                    <TabPane tab={item.tab} key={item.key}></TabPane>
                                )
                            })
                        }
                    </Tabs>
                    <Row>
                        <Col span={24}>
                            <ReactEcharts ref={ (e) => { this.echarts = e } } onEvents={this.onclick} option={this.state.options} theme="Imooc" style={{ height: '500px' }} />
                        </Col>
                        <Col span={24}>
                            {this.renderTree()}
                        </Col>
                    </Row>
                </Card>
            </div>
        )
    }
}
export default CountAllGet
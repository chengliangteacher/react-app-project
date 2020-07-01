import React, { Component } from 'react';
import axios from "axios"
import 'echarts/lib/chart/bar';  //折线图是line,饼图改为pie,柱形图改为bar
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/visualMap';
import 'echarts/lib/component/markPoint';
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts/lib/echarts';
import china from "../../province/china.json"
import { Row, Col } from "antd"
echarts.registerMap("中国", china)
class LoadingTasks extends Component {
    constructor() {
        super();
        this.state = {
            sampleData: [],
            mapOptions: {}
        }
        this.mapEcharts = React.createRef();
    }
    componentDidMount() {
        this.getMapData();
    }
    getMapData = () => {
        this.mapEcharts.getEchartsInstance().showLoading();
        axios({
            url: "https://vi.xrdata.net/draw/special/flow/map/distribution?year=2020&type=0",
            method: "get",
            headers: {
                authorization: "eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1OTU5ODk2MDUsInN1YiI6InN6X3Zpc3VhbCIsImNyZWF0ZWQiOjE1OTMzOTc2MDUwMzl9.7rsNSjRb048Nbov0d-bL4j9Ckdd3MSWOo55GB_Kcjug"
            }
        }).then(res => {
            let minarr = JSON.parse(JSON.stringify(res.data.data.provinces ? res.data.data.provinces : []));
            let maxarr = JSON.parse(JSON.stringify(res.data.data.provinces ? res.data.data.provinces : []));
            this.setState({
                mapOptions: {
                    visualMap: {
                        show: false,
                        type: "piecewise",
                        min: minarr.sort((a, b) => a.unqualifiedRate - b.unqualifiedRate)[0].unqualifiedRate,
                        max: maxarr.sort((a, b) => b.unqualifiedRate - a.unqualifiedRate)[0].unqualifiedRate,
                        text: ['高', '低'],
                        realtime: true,
                        calculable: true,
                        minOpen: true,
                        inRange: {
                            color: ['rgba(0, 36, 76, 1)', 'rgba(0,97, 152, 1)']
                        },
                        itemWidth: 40,
                        itemHeight: 10,
                        itemGap: 3,
                        itemSymbol: "none",
                        textStyle: {
                            color: "white"
                        },
                        // formatter: function (value) {
                        //     return 'aaaa' + value; // 范围标签显示内容。
                        // }
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: function (params) {
                            console.log(params)
                            return `${params.name}<br />抽样批次数： ${params.data ? params.data.batchCounts : 0}<br />不合格率： ${params.value ? params.value + "%" : 0}`
                        }

                    },
                    geo: {
                        map: "中国",
                        roam: true,
                        label: {
                            show: true,
                            color: "white"
                        },
                        itemStyle: {
                            borderColor: "#0bfef8",
                            areaColor: "rgba(0, 36, 76, 1)"
                        },
                        markPoint: {
                            symbol: "none",
                            symbolSize: 0
                        },
                        emphasis: {
                            label: {
                                color: "white"
                            },
                            itemStyle: {
                                areaColor: "rgba(9, 183, 225, 0.5)",
                                borderColor: "rgba(9, 183, 225, 0.5)",
                            }
                        },
                        data: res.data.data.provinces.map(item => {
                            return {
                                name: item.areaName,
                                value: item.unqualifiedRate,
                                unqualifiedBatchCounts: item.unqualifiedBatchCounts,
                                batchCounts: item.batchCounts,
                            }
                        })
                    },
                    series: [
                        {
                            type: "lines",
                            geoIndex: 0,
                            effect: {
                                show: true
                            },
                            data: res.data.data.provinces.map(item => {
                                return {
                                    coords: [
                                        [item.latitude, item.longitude],
                                        [res.data.data.local.latitude, res.data.data.local.longitude],
                                    ],
                                    name: item.areaName
                                }
                            })
                        }
                    ]
                }
            })
        }).finally(() => {
            this.mapEcharts.getEchartsInstance().hideLoading();
        })
    }
    render() {
        return (
            <div className="loadingTasks">
                <Row gutter={5} className="h-100">
                    <Col span={24} className="h-100">
                        <div className="bg-tm h-100">
                            <ReactEcharts ref={(e) => { this.mapEcharts = e }} option={this.state.mapOptions} theme="Imooc" className="h-100" />
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}
export default LoadingTasks
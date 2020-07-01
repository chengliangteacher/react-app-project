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
import shenzen from "../../province/shenzhen.json"
import { Row, Col } from "antd"
echarts.registerMap("深圳", shenzen)
class LoadingTasks extends Component {
    constructor() {
        super();
        this.state = {
            sampleData: [],
            sampleOptions: {},
            sampleHomeOptions: {},
            mapOptions: {},
            sampleBarOptions: {},
            sampleTreeMapOptions: {},
            sampleLinkOptions: {},
        }
        this.sampleEcharts = React.createRef();
        this.sampleHomeEcharts = React.createRef();
        this.mapEcharts = React.createRef();
        this.sampleBarEcharts = React.createRef();
        this.sampleTreeMapEcharts = React.createRef();
        this.sampleLinkEcharts = React.createRef();
    }
    componentDidMount() {
        this.getSampleData();
        this.getSampleHomeData();
        this.getMapData();
        this.getSampleBarData();
        this.getSampleTreeMapData();
        this.getSampleLinkData();
    }
    getSampleData = () => {
        this.sampleEcharts.getEchartsInstance().showLoading();
        axios({
            url: "https://vi.xrdata.net/draw/survey/sampling/distribution/unit/batch?year=2020&pageSize=7&currentPage=1&planAttr=",
            method: "get",
            headers: {
                authorization: "eyJhbGciOiJIUzI1NiJ9.eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1OTU5ODk2MDUsInN1YiI6InN6X3Zpc3VhbCIsImNyZWF0ZWQiOjE1OTMzOTc2MDUwMzl9.7rsNSjRb048Nbov0d-bL4j9Ckdd3MSWOo55GB_Kcjug-bL4j9Ckdd3MSWOo55GB_Kcjug"
            }
        }).then(res => {
            const data = res.data.code !==200 ? [] : res.data.data.rows
            this.setState({
                sampleData: data,
                sampleOptions: {
                    tooltip: {
                        show: true,
                        trigger: "axis",
                        axisPointer: {
                            type: "shadow"
                        },

                    },
                    legend: {
                        type: "plain",
                        show: false,
                    },
                    padding: 2,
                    xAxis: {
                        type: "value",
                        axisLine: {
                            show: true
                        },
                        axisLabel: {
                            show: true,
                            formatter: function (value, index) {
                                return value / 1000 + "k"
                            },
                            color: "white"
                        }
                    },
                    yAxis: {
                        type: "category",
                        axisLabel: {
                            show: true,
                            color: "white"
                        },
                    },
                    grid: {
                        left: 100,
                        right: 10,
                        top: 5,
                        bottom: 20
                    },
                    dataset: {
                        dimensions: ["product", "抽样批次数"],
                        source: data.map(item => {
                            return {
                                product: item.organizationName.length > 7 ? item.organizationName.substring(0, 7) + "..." : item.organizationName,
                                "抽样批次数": item.batchCounts
                            }
                        })
                    },
                    itemStyle: {
                        color: "#00afff",

                    },
                    series: [
                        {
                            barWidth: 20,
                            type: "bar",
                            label: {
                                show: true,
                                position: "right",
                            }
                        }
                    ]
                }
            })
        }).finally(() => {
            this.sampleEcharts.getEchartsInstance().hideLoading();
        })
    }
    getSampleHomeData = () => {
        this.sampleHomeEcharts.getEchartsInstance().showLoading();
        axios({
            url: "https://vi.xrdata.net/draw/survey/sampling/distribution/unit/sampled?year=2020&pageSize=7&currentPage=1&planAttr=",
            method: "get",
            headers: {
                authorization: "eyJhbGciOiJIUzI1NiJ9.eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1OTU5ODk2MDUsInN1YiI6InN6X3Zpc3VhbCIsImNyZWF0ZWQiOjE1OTMzOTc2MDUwMzl9.7rsNSjRb048Nbov0d-bL4j9Ckdd3MSWOo55GB_Kcjug-bL4j9Ckdd3MSWOo55GB_Kcjug"
            }
        }).then(res => {
            console.log(res);
            const data = res.data.code !==200 ? [] : res.data.data.rows
            this.setState({
                sampleData: data,
                sampleHomeOptions: {
                    tooltip: {
                        show: true,
                        trigger: "axis",
                        axisPointer: {
                            type: "shadow"
                        },

                    },
                    legend: {
                        type: "plain",
                        show: false,
                    },
                    padding: 2,
                    xAxis: {
                        type: "value",
                        axisLine: {
                            show: true
                        },
                        axisLabel: {
                            show: true,
                            formatter: function (value, index) {
                                return value / 1000 + "k"
                            },
                            color: "white"
                        }
                    },
                    yAxis: {
                        type: "category",
                        axisLabel: {
                            color: "white"
                        }
                    },
                    grid: {
                        left: 100,
                        right: 10,
                        top: 5,
                        bottom: 20
                    },
                    dataset: {
                        dimensions: ["product", "被抽样单位数"],
                        source: data.map(item => {
                            return {
                                product: item.organizationName.length > 7 ? item.organizationName.substring(0, 7) + "..." : item.organizationName,
                                "被抽样单位数": item.sampledUnitCounts
                            }
                        })
                    },
                    itemStyle: {
                        color: "#00afff",

                    },
                    series: [
                        {
                            barWidth: 20,
                            type: "bar",
                            label: {
                                show: true,
                                position: "right"
                            }
                        }
                    ]
                }
            })
        }).finally(() => {
            this.sampleHomeEcharts.getEchartsInstance().hideLoading();
        })
    }
    getMapData = () => {
        this.mapEcharts.getEchartsInstance().showLoading();
        axios({
            url: "https://vi.xrdata.net/draw/survey/sampling/map/distribution/area?year=2020&planAttr=",
            method: "get",
            headers: {
                authorization: "eyJhbGciOiJIUzI1NiJ9.eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1OTU5ODk2MDUsInN1YiI6InN6X3Zpc3VhbCIsImNyZWF0ZWQiOjE1OTMzOTc2MDUwMzl9.7rsNSjRb048Nbov0d-bL4j9Ckdd3MSWOo55GB_Kcjug-bL4j9Ckdd3MSWOo55GB_Kcjug"
            }
        }).then(res => {
            let minarr = JSON.parse(JSON.stringify(res.data.code === 200 ? res.data.data : []));
            let maxarr = JSON.parse(JSON.stringify(res.data.code === 200 ? res.data.data : []));
            this.setState({
                mapOptions: {
                    visualMap: {
                        type: "piecewise",
                        min: minarr.length !== 0 ? minarr.sort((a, b) => a.batchCounts - b.batchCounts)[0].batchCounts : 0,
                        max: maxarr.length !== 0 ? maxarr.sort((a, b) => b.batchCounts - a.batchCounts)[0].batchCounts : 0,
                        text: ['高', '低'],
                        realtime: true,
                        calculable: true,
                        minOpen: true,
                        inRange: {
                            color: ['rgba(1, 1, 1, 0)', '#2c5f79']
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
                            return `${params.name}<br />抽样批次数： ${params.value}<br />被抽样单位家次数： ${params.data.sampledUnitCounts}`
                        }

                    },
                    series: [{
                        type: "map",
                        map: "深圳",
                        roam: true,
                        label: {
                            show: true,
                            color: "white"
                        },
                        itemStyle: {
                            borderColor: "#0bfef8",
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
                                areaColor: "rgba(255, 200, 0, 0.3)",
                                borderColor: "rgba(255, 200, 0)",
                            }
                        },
                        data: (res.data.data || []).map(item => {
                            return {
                                name: item.areaName,
                                value: item.batchCounts,
                                sampledUnitCounts: item.sampledUnitCounts
                            }
                        })
                    }]
                }
            })
        }).finally(() => {
            this.mapEcharts.getEchartsInstance().hideLoading();
        })
    }
    getSampleBarData = () => {
        this.sampleBarEcharts.getEchartsInstance().showLoading();
        axios({
            url: "https://vi.xrdata.net/draw/survey/sampling/distribution/link?year=2020&areaId=&planAttr=",
            method: "get",
            headers: {
                authorization: "eyJhbGciOiJIUzI1NiJ9.eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1OTU5ODk2MDUsInN1YiI6InN6X3Zpc3VhbCIsImNyZWF0ZWQiOjE1OTMzOTc2MDUwMzl9.7rsNSjRb048Nbov0d-bL4j9Ckdd3MSWOo55GB_Kcjug-bL4j9Ckdd3MSWOo55GB_Kcjug"
            }
        }).then(res => {
            this.setState({
                sampleBarOptions: {
                    tooltip: {
                        show: true,
                        trigger: "item",
                    },
                    legend: {
                        show: true,
                        data: (res.data.code === 200 ? res.data.data : []).map(item => item.linkName),
                        bottom: 0,
                        textStyle: {
                            color: "white"
                        }
                    },
                    itemStyle: {
                        // color: "#00afff",
                    },
                    color: ["rgb(255, 194, 28)", "rgb(0, 219, 89)","rgb(0, 175, 255)"],
                    series: [
                        {
                            type: 'pie',
                            radius: ['50%', '70%'],
                            center: ['40%', '50%'],
                            data: (res.data.code === 200 ? res.data.data : []).map(item => {
                                return {
                                    name: item.linkName,
                                    value: item.batchCounts,
                                }
                            }),
                            emphasis: {
                                itemStyle: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                }
            })
        }).finally(() => {
            this.sampleBarEcharts.getEchartsInstance().hideLoading();
        })
    }
    getSampleTreeMapData = () => {
        this.sampleTreeMapEcharts.getEchartsInstance().showLoading();
        axios({
            url: "https://vi.xrdata.net/draw/survey/sampling/distribution/category?year=2020&pageSize=999999&currentPage=1&planAttr=",
            method: "get",
            headers: {
                authorization: "eyJhbGciOiJIUzI1NiJ9.eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1OTU5ODk2MDUsInN1YiI6InN6X3Zpc3VhbCIsImNyZWF0ZWQiOjE1OTMzOTc2MDUwMzl9.7rsNSjRb048Nbov0d-bL4j9Ckdd3MSWOo55GB_Kcjug-bL4j9Ckdd3MSWOo55GB_Kcjug"
            }
        }).then(res => {
            this.setState({
                sampleTreeMapOptions: {
                    tooltip: {
                        show: true,
                        trigger: "item",
                    },
                    // legend: {
                    //     show: true,
                    //     data: res.data.data.map(item => item.linkName),
                    //     bottom: 0,
                    //     textStyle: {
                    //         color: "white"
                    //     }
                    // },
                    series: [
                        {
                            type: 'treemap',
                            radius: ['50%', '70%'],
                            center: ['40%', '50%'],
                            nodeClick: false,
                            leafDepth: 1,
                            breadcrumb: {
                                show: false
                            },
                            itemStyle: {
                                color: "#0086b3"
                            },
                            data: (res.data.code === 200 ? res.data.data.rows : []).map(item => {
                                return {
                                    name: item.categoryName,
                                    value: item.batchCounts,
                                    itemStyle: {
                                        color: "#0086b3"
                                    }
                                }
                            }),
                        }
                    ]
                }
            })
        }).finally(() => {
            this.sampleTreeMapEcharts.getEchartsInstance().hideLoading();
        })
    }
    getSampleLinkData = () => {
        this.sampleLinkEcharts.getEchartsInstance().showLoading();
        axios({
            url: "https://vi.xrdata.net/draw/survey/sampling/distribution/year?year=2020&age=2019&areaId=&planAttr=",
            method: "get",
            headers: {
                authorization: "eyJhbGciOiJIUzI1NiJ9.eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1OTU5ODk2MDUsInN1YiI6InN6X3Zpc3VhbCIsImNyZWF0ZWQiOjE1OTMzOTc2MDUwMzl9.7rsNSjRb048Nbov0d-bL4j9Ckdd3MSWOo55GB_Kcjug-bL4j9Ckdd3MSWOo55GB_Kcjug"
            }
        }).then(res => {
            axios({
                url: "https://vi.xrdata.net/draw/survey/sampling/distribution/year?year=2020&age=2020&areaId=&planAttr=",
                method: "get",
                headers: {
                    authorization: "eyJhbGciOiJIUzI1NiJ9.eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1OTU5ODk2MDUsInN1YiI6InN6X3Zpc3VhbCIsImNyZWF0ZWQiOjE1OTMzOTc2MDUwMzl9.7rsNSjRb048Nbov0d-bL4j9Ckdd3MSWOo55GB_Kcjug-bL4j9Ckdd3MSWOo55GB_Kcjug"
                }
            }).then(res2 => {
                this.setState({
                    sampleLinkOptions: {
                        tooltip: {
                            show: true,
                            trigger: "axis",
                            axisPointer: {
                                type: "shadow"
                            },
    
                        },
                        legend: {
                            show: true,
                            data: ["2019", "2020"],
                            textStyle: {
                                color: "#fff"
                            },
                            right: 10
                        },
                        padding: 2,
                        xAxis: {
                            type: "category",
                            axisLine: {
                                show: true
                            },
                            axisLabel: {
                                color: "white"
                            },
                            data: (res.data.code === 200 ? res.data.data : []).map(item => item.samplingMouth+"月")
                        },
                        yAxis: {
                            type: "value",
                            axisLabel: {
                                color: "white"
                            }
                        },
                        grid: {
                            left: 100,
                            right: 10,
                            top: 30,
                            bottom: 20
                        },
                        series: [
                            {
                                name: "2019",
                                type: "line",
                                label: {
                                    // show: true,
                                },
                                symbol: "circle",
                                symbolSize: 8,
                                data: (res.data.code === 200 ? res.data.data : []).map(item => item.batchCounts),
                                itemStyle: {
                                    color: "#00afff",
                                },
                            },
                            {
                                name: "2020",
                                type: "line",
                                label: {
                                    // show: true,
                                },
                                itemStyle: {
                                    color: "#00db59",
                                },
                                symbol: "circle",
                                symbolSize: 8,
                                data: (res2.data.code === 200 ? res2.data.data : []).map(item => item.batchCounts)
                            },
                        ]
                    }
                })
            })
        }).finally(() => {
            this.sampleLinkEcharts.getEchartsInstance().hideLoading();
        })
    }
    render() {
        return (
            <div className="loadingTasks">
                <Row gutter={5} className="h-100">
                    <Col span={6} className="h-65">
                        <div className="bg-tm h-50">
                            <ReactEcharts ref={(e) => { this.sampleEcharts = e }} option={this.state.sampleOptions} theme="Imooc" className="h-100" />
                        </div>
                        <div className="bg-tm h-50">
                            <ReactEcharts ref={(e) => { this.sampleHomeEcharts = e }} option={this.state.sampleHomeOptions} theme="Imooc" className="h-100" />
                        </div>
                    </Col>
                    <Col span={12} className="h-65">
                        <div className="bg-tm h-100">
                            <ReactEcharts ref={(e) => { this.mapEcharts = e }} option={this.state.mapOptions} theme="Imooc" className="h-100" />
                        </div>
                    </Col>
                    <Col span={6} className="h-65">
                        <div className="bg-tm h-50">
                            <ReactEcharts ref={(e) => { this.sampleBarEcharts = e }} option={this.state.sampleBarOptions} theme="Imooc" className="h-100"/>
                        </div>
                        <div className="bg-tm h-50">
                            <ReactEcharts ref={(e) => { this.sampleTreeMapEcharts = e }} option={this.state.sampleTreeMapOptions} theme="Imooc" className="h-100"/>
                        </div>
                    </Col>
                    <Col span={24} style={{ marginTop: 5,height: "34%" }}>
                        <div className="bg-tm h-100">
                            <ReactEcharts ref={(e) => { this.sampleLinkEcharts = e }} option={this.state.sampleLinkOptions} theme="Imooc" className="h-100" />
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}
export default LoadingTasks
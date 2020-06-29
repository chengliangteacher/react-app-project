import React, { Component } from 'react';
import axios from "../../api/index"
import { Modal, Tabs, Table } from "antd";
const { TabPane } = Tabs;
class AreaTable extends Component {
    constructor() {
        super();
        this.state = {
            tab: [
                {
                    tab: '全部数据',
                    key: "0"
                },
                {
                    tab: '监督抽检',
                    key: "1"
                },
                {
                    tab: '日常监督',
                    key: "4,5,6,8"
                },
                {
                    tab: '专项抽检',
                    key: "7,9,10,11,12,18"
                },
                {
                    tab: '执法抽检',
                    key: "14"
                },
                {
                    tab: '监督抽检',
                    key: "13"
                },
                {
                    tab: '评价性抽检',
                    key: "16,17"
                },
                {
                    tab: '风险监测',
                    key: "15"
                },
            ],
            key: "0",
            pagination: {
                current: 1,
                pageSize: 10,
                total: 0,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: total => `共 ${total} 条`
            },
            data: [],
            loading: false,
            columns: [
                {
                    title: "序号",
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
                    align: 'center',
                    key: "level3Name",
                    dataIndex: "level3Name",
                },
                {
                    title: "食品细类",
                    align: 'center',
                    key: "level4Name",
                    dataIndex: "level4Name",
                },
                {
                    title: "检验项目",
                    align: 'center',
                    key: "detectionItemAmount",
                    dataIndex: "detectionItemAmount",
                },
            ],
        }
    }
    handleOk = () => {
        this.props.setVisible(false)
        this.setState({
            key: "0"
        })
    }
    handleCancel = () => {
        this.props.setVisible(false)
        this.setState({
            key: "0"
        })
    }

    getData = () => {
        const data = {
            pageNum: this.state.pagination.current,
            pageSize: this.state.pagination.pageSize,
            regionName: this.props.regionName
        }
        this.setState({
            loading: true
        })
        axios.post(`/plan/getDetectionData/${this.state.key}`, data).then(res => {
            this.setState((state) => {
                return {
                    data: res.data.map((item, index) => Object.assign(item, { num: index + 1 })),
                    pagination: {
                        current: state.pagination.current,
                        pageSize: state.pagination.pageSize,
                        total: res.total,
                        showSizeChanger: true,
                        showQuickJumper: true,
                        showTotal: total => `共 ${total} 条`
                    }
                }
            })
        }).finally(() => {
            this.setState({
                loading: false
            })
        })
    }

    changeTab = (key) => {
        this.setState({
            key,
            pagination: {
                current: 1,
                pageSize: 10,
                total: 0,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: total => `共 ${total} 条`
            }
        }, () => {
            this.getData();
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
            this.getData()
        })
    }

    render() {
        return (
            <div>
                <Modal
                    title="区域明细"
                    visible={this.props.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    width={800}
                >
                    <Tabs defaultValue="0" onChange={this.changeTab}>
                        {
                            this.state.tab.map((item) => {
                                return (
                                    <TabPane key={item.key} tab={item.tab}></TabPane>
                                )
                            })
                        }
                    </Tabs>
                    <Table pagination={this.state.pagination} showSorterTooltip={true} onChange={this.handleTableChange} loading={this.state.loading} rowKey={(item, index) => index} dataSource={this.state.data} columns={this.state.columns} />
                </Modal>
            </div>
        )
    }
}
export default AreaTable
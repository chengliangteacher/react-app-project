import React, { Component } from 'react';
import { Table } from "antd"
import axios from "../../api"
class TestA extends Component {
    constructor() {
        super();
        this.state = {
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
                    title: "预算总费用(万元)",
                    align: 'center',
                    key: "total",
                    dataIndex: "total"
                },
                {
                    align: 'center',
                    title: "操作"
                },
            ]
        }
    }
    componentWillMount() {
        axios.get("http://sz.xrdev.cn/inspection/planTasks?state=2&&pageNum=1&&pageSize=20").then(res => {
            this.setState({
                data: res.data.map((item, index) => Object.assign(item, { key: item.id, num: index+1 }))
            })
        })
    }
    render() {
        return (
            <div>
                <Table dataSource={this.state.data} columns={this.state.columns} bordered pagination={false} />
            </div>
        )
    }
}
export default TestA
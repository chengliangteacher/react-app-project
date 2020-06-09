import React, { Component } from 'react';
import axios from "../../api"
import { Table, Card } from "antd"
class ReferralProgram extends Component {
    state = {
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
        ]
    }
    componentDidMount() {
        this.getData();
    }
    handelClick = () => {
        this.props.history.push({
            pathname: "/app/programmanage",
            state: {
                id: 10
            }
        })
    }
    getData = () => {
        axios.get("/commendPlans").then(res => {
            this.setState({
                data: res.data.map((item, index) => Object.assign(item, {num: index+1}))
            })
        })
    }
    render() {
        return (
            <Card title="推荐计划列表">
                <Table dataSource={this.state.data} columns={this.state.columns} />
            </Card>
        )
    }
}
export default ReferralProgram
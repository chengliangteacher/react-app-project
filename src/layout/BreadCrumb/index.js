import React from "react";
import { Breadcrumb } from "antd"
import routes from "../../router";
export default class BreadCrumb extends React.Component {
    constructor() {
        super();
        this.state = {
            bread: []
        }
    }

    componentDidMount() {
        this.setState({
            bread: []
        })
        let curentRoute = {}
        routes.forEach(item => {
            if (item.url === this.props.history.location.pathname) {
                curentRoute = item;
            }
        })
        if (localStorage.tree && Number(curentRoute.parentId) !== 0) {
            JSON.parse(localStorage.tree).children.forEach(item => {
                if (Number(item.id) === Number(curentRoute.parentId)) {
                    this.setState({
                        bread: this.state.bread.push(item.text)
                    })
                }
            })
        }
        this.setState({
            bread: this.state.bread.push(curentRoute.text)
        })
    }

    render() {
        return (
            <Breadcrumb>
                {
                    [].map(item => {
                        return (
                            <Breadcrumb.Item key={item}>
                                <span>{item}</span>
                            </Breadcrumb.Item>
                        )
                    })
                }
            </Breadcrumb>
        )
    }
}
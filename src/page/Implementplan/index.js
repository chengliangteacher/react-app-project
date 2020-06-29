import React, { Component } from 'react';
import { Skeleton } from "antd"
class Implementplan extends Component {
    render() {
        return (
            <div>
                <Skeleton active avatar paragraph={{ rows: 20 }} size="large" />
            </div>
        )
    }
}
export default Implementplan
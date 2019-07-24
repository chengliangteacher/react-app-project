import React, { Component } from 'react';
import { Link } from "react-router-dom";
class TestA extends Component {
    render() {
        console.log(this.props)
        return (
            <Link to="/b">a</Link>
        )
    }
}
export default TestA
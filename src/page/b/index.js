import React, { Component } from 'react';
import { Link } from "react-router-dom";
class TestB extends Component {
    render() {
        return (
            <Link to="/a">b</Link>
        )
    }
}
export default TestB
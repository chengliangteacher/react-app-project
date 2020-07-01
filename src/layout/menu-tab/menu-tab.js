import React from "react";
import { Link } from "react-router-dom";
import { CloseOutlined, StepBackwardOutlined,StepForwardOutlined } from "@ant-design/icons"
import "./menu-tab.scss"
let leftInterval = null;
let rightInterval = null;
export default class MenuTab extends React.Component {
    constructor() {
        super();
        this.state = {
            data: []
        }
        this.navTab = React.createRef();
    }
    componentDidMount() {
    }

    handleTagClick = (val) => {
        this.props.history.push(val);
    }

    showCloseIcon = (val) => {
        if (val.isClose) {
            if (val.pathname === this.props.currentMenu.pathname) {
                return (
                    <CloseOutlined onClick={() => { this.props.handleDeleteTab(val) }}>
                        {/* <Link to={this.props.manyTabs[this.props.manyTabs.length-1]}></Link> */}
                    </CloseOutlined>
                )
            }else {
                return <CloseOutlined onClick={() => { this.props.handleDeleteTab(val) }} />
            }
        } else {
            return
        }
    }

    handleLeftClick = () => {
        if (leftInterval) {
            clearInterval(leftInterval)
        }
        let num = 1
        leftInterval = setInterval(() => {
            if (num === 80) {
                clearInterval(leftInterval)
            }
            this.navTab.scrollLeft -= 1
            num ++
        }, 5);
    }

    handleRightClick = () => {
        if (rightInterval) {
            clearInterval(rightInterval)
        }
        let num = 1
        rightInterval = setInterval(() => {
            if (num === 80) {
                clearInterval(rightInterval)
            }
            this.navTab.scrollLeft += 1
            num ++
        }, 5);
    }

    render() {
        return (
            <div className="menu-tab" style={{ width: `calc(100vw - ${this.props.width + 'px'})` }}>
                <div className="left-icon" onClick={this.handleLeftClick}>
                    <StepBackwardOutlined />
                </div>
                <div ref={e => { this.navTab = e }} className="nav-tabs" style={{ width: `calc(100vw - ${this.props.width + 'px'})` }}>
                    {
                        this.props.manyTabs.map((item, index) => {
                            if (item.pathname === this.props.currentMenu.pathname) {
                                return <span className="ant-tag ant-tag-blue" style={{ cursor: "pointer" }} color="blue" key={index}>
                                    {item.name}
                                    {
                                        this.showCloseIcon(item)
                                    }
                                </span>
                            } else {
                                return (<span className="ant-tag" style={{ cursor: "pointer" }} key={index}>
                                    <Link to={item}>
                                        {item.name}
                                    </Link>
                                    {
                                        this.showCloseIcon(item)
                                    }
                                </span>)
                            }
                        })
                    }
                </div>
                <div className="right-icon" onClick={this.handleRightClick}>
                    <StepForwardOutlined/>
                </div>
            </div>
        )
    }
}
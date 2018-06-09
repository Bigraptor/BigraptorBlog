import React, { Component } from "react";
import styles from "./WriteList.scss";
import classNames from "classnames/bind";
import moment from "moment";

const cx = classNames.bind(styles);

class WriteList extends Component{
    render(){

        const dateFormat = "YYYY-MM-DD hh:mm";
        const date = moment(this.props.created).format(dateFormat);

        return(
            <div className = {cx("wrapper")}>
                <div className = {cx("title")}>
                    {this.props.title}
                </div>
                <div className = {cx("content")}>
                    {this.props.content}
                </div>
                <div className = {cx("footer")}>
                    <span className = {cx("category")}>{this.props.category}</span>
                    <span className = {cx("date")}>{date}</span>
                </div>
            </div>
        );
    };
};

export default WriteList;
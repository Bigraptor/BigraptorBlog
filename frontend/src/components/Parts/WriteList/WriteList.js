import React, { Component } from "react";
import styles from "./WriteList.scss";
import classNames from "classnames/bind";
import moment from "moment";
import ShowMoreText from "react-show-more-text";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

class WriteList extends Component{
    render(){

        const dateFormat = "YYYY-MM-DD hh:mm";
        const date = moment(this.props.created).format(dateFormat);

        return(
            <div className = {cx("wrapper")}>
                <div className = {cx("title")}>
                    <Link to = {"/"+this.props.no} className = {cx("link")}>
                        {this.props.title}
                    </Link>
                </div>
                <div className = {cx("content")}>
                    <ShowMoreText
                    lines={3}
                    more=''
                    less='Show less'
                    anchorClass=''
                    >
                        {this.props.content}
                    </ShowMoreText>
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
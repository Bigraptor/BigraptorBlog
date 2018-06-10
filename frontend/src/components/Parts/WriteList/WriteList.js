import React, { Component } from "react";
import styles from "./WriteList.scss";
import classNames from "classnames/bind";
import moment from "moment";
import ShowMoreText from "react-show-more-text";

const cx = classNames.bind(styles);

class WriteList extends Component{
    render(){

        const dateFormat = "YYYY-MM-DD hh:mm";
        const date = moment(this.props.created).format(dateFormat);
        const content = this.props.content.split('\n').map( (line) => {
            return (<span>{line}<br/></span>); //////////////// textarea에서 db로 값을 저장하게 된다면, 엔터는 공백으로 저장이됩니다. 이것을 <br />로 치환하는식입니다.
        });

        return(
            <div className = {cx("wrapper")}>
                <div className = {cx("title")}>
                    {this.props.title}
                </div>
                <div className = {cx("content")}>
                    <ShowMoreText
                    lines={3}
                    more=''
                    less='Show less'
                    anchorClass=''
                    >
                        {content}
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
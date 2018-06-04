import React, { Component } from "react";
import styles from "./Content.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

class Content extends Component{
    render(){
        return (
            <div className = {cx("wrapper")}>
                여기에 전체 글 리스트가 올라올 예정입니다.
            </div>
        );
    };
};

export default Content;
import React, { Component } from "react";
import styles from "./Write.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

class WriteForm extends Component{

    render(){
        return (
            <div className = {cx("write-wrapper")}>
                글쓰기 라우터
            </div>
        );
    };
};

export default WriteForm;
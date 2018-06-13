import React, { Component } from "react";
import styles from "./CommentInput.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

class CommentInput extends Component{
    render(){
        return(
            <div className = {cx("wrapper")}>
                <div>
                    아이디
                </div>
                <div>
                    <textarea name = "comment" />
                </div>
                <div className = {cx("send-btn")}>
                    <div>Send</div>
                </div>
            </div>
        );
    };
};

export default CommentInput;
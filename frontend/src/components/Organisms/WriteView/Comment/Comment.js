import React, { Component } from "react";
import styles from "./Comment.scss";
import classNames from "classnames/bind";
import { connect } from "react-redux";

const cx = classNames.bind(styles);

class Comment extends Component{
    render(){
        return(
            <div className = {cx("wrapper")}>
                <div className = {cx("comment-count")}>
                    {this.props.commentstatus.list.length} comments
                </div>
                <div className = {cx("comment-content")}>
                    {this.props.children}
                </div>
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        commentstatus : state.comment.comm
    };
};

const mapDispatchToProps = (dispatch) => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
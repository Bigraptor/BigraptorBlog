import React from "react";
import styles from "./Comment.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const Comment = ( {children} ) => {
    return(
        <div className = {cx("wrapper")}>
            <div className = {cx("comment-count")}>
                7comments
            </div>
            <div className = {cx("comment-content")}>
                {children}
            </div>
        </div>
    );
};

export default Comment;
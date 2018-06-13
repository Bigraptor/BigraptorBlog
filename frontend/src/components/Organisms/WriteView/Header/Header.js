import React from "react";
import styles from "./Header.scss";
import classNames from "classnames/bind";
import moment from "moment";

const cx = classNames.bind(styles);

const Header = ({title, category, date}) => {

    const dateFormat = "YYYY-MM-DD hh:mm";
    const modidate = moment(date).format(dateFormat);

    return (
        <div className = {cx("wrapper")}>
            <div className = {cx("category")}>
                {category}
            </div>
            <div className = {cx("title")}>
                {title}
            </div>
            <div className = {cx("footer")}>
                <span>
                    Bigraptor
                </span>
                <span>
                    {modidate}
                </span>
            </div>
        </div>
    );
};

export default Header;
import React from "react";
import styles from "./WriteTemplate.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const WriteTemplate = ( { header, children } ) => {
    return (
        <div className = {cx("wrapper")}>
            <header className = {cx("header")}>
                {header}
            </header>
            <main className = {cx("main")}>
                {children}
            </main>
        </div>
    );
};

export default WriteTemplate;
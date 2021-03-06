import React from "react";
import styles from "./ScreenMask.scss";
import classNames from "classnames/bind";
import LoginModal from "../../Organisms/LoginModal/LoginModal.js";

const cx = classNames.bind(styles);

const ScreenMask = () => {
    return(
        <div className = {cx("screen-wrapper")}>
            <LoginModal />
        </div>
    )
};

export default ScreenMask;
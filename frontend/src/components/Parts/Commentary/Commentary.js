import React, {Component} from "react";
import styles from "./Commentary.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

class Commentary extends Component{
    render(){
        return(
            <div className = {cx("wrapper")}>
                <div className = {cx("image")}>
                    <div>
                        이미지
                    </div>
                </div>
                <div className = {cx("section")}>
                    <div className = {cx("section-header")}>
                        아이디<span>날짜</span>
                    </div>
                    <div className = {cx("section-content")}>
                        초대장 보내드렸습니다.<br/>
                        초대장 보내드렸습니다.<br/>
                        초대장 보내드렸습니다.<br/>
                        초대장 보내드렸습니다.<br/>
                        
                    </div>
                </div>
            </div>
        );
    };
};

export default Commentary;
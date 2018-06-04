import React, { Component } from "react";
import styles from "./LoginModal.scss";
import classNames from "classnames/bind";
import { hideLoginModal } from "../../actions/showLogin";
import { connect } from "react-redux";

const cx = classNames.bind(styles);

class LoginModal extends Component{

    constructor(props){
        super(props);
        this.state = {
            showjoin : false
        };

        this._hidelogin = this._hidelogin.bind(this);
        this._showjoin = this._showjoin.bind(this);
    };

    _hidelogin(){
        this.props.hideloginmodal();
    };

    _showjoin(){
        this.setState({
            showjoin : true
        });
    };

    render(){

        const loginmodal = (
            <div>
                <div className = {cx("header")}>
                    로그인하기
                </div>
                <div className = {cx("arti")}>
                    <input type = "text" name = "id" placeholder = "아이디"/>
                    <input type = "password" name = "pw" placeholder = "비밀번호"/>
                    <div className = {cx("login-btn")}>
                        로그인
                    </div>
                    <div className = {cx("join-wrapper")}>
                        <span onClick = {this._showjoin}>
                            회원가입
                        </span>
                    </div>
                </div>
            </div>
        );

        const joinmodal = (
            <div>
                <div className = {cx("header")}>
                    회원가입
                </div>
                <div className = {cx("arti")}>
                    <input type = "text" name = "id" placeholder = "아이디"/>
                    <input type = "password" name = "pw" placeholder = "비밀번호"/>
                    <input type = "text" name = "nickname" placeholder = "닉네임" />
                    <div className = {cx("login-btn")}>
                        회원가입
                    </div>
                </div>
            </div>
        );

        return(
            <div className = {cx("wrapper", {
                join : this.state.showjoin
            })}>
                <div className = {cx("gradient")}>
                </div>
                <div className = {cx("icon")}>
                    <i className = "fas fa-times" onClick = {this._hidelogin}/>
                </div>  
                {this.state.showjoin ? joinmodal : loginmodal}
            </div>
        );
    };
};

const mapStateToProps = (state) => {
    return {
        hidelogin : state.showlogin.show
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        hideloginmodal : () => {
            return dispatch(hideLoginModal());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal);
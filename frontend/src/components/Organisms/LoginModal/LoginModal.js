import React, { Component } from "react";
import styles from "./LoginModal.scss";
import classNames from "classnames/bind";
import { hideLoginModal } from "../../actions/showLogin";
import { joinRequest, joinReset, LoginRequest } from "../../actions/account";
import { connect } from "react-redux";

const cx = classNames.bind(styles);

class LoginModal extends Component{

    constructor(props){
        super(props);
        this.state = {
            showjoin : false,
            id : "",
            pw : "",
            nickname : ""
        };

        this._hidelogin = this._hidelogin.bind(this);
        this._showjoin = this._showjoin.bind(this);
        this._change = this._change.bind(this);
        this._join = this._join.bind(this);
        this._login = this._login.bind(this);
    };

    _hidelogin(){
        this.props.hideloginmodal();
        this.props.joinreset();
    };

    _showjoin(){
        this.setState({
            showjoin : true
        });
    };

    _change(e){
        let a = {};
        a[e.target.name] = e.target.value;
        this.setState(a);
    }

    _join(){
        this.props.joinrequest(this.state.id, this.state.pw, this.state.nickname).then(
            () => {
                if(this.props.joinstatus.status === "SUCCESS"){
                    this.setState({
                        id : "",
                        pw : "",
                        nickname : "",
                        showjoin : false
                    });
                }
            }
        );
    };

    _login(){
        this.props.loginrequest(this.state.id, this.state.pw).then(
            () => {
                if(this.props.loginstatus.status === "SUCCESS"){
                    console.log("성공")
                }
            }
        );
    };

    render(){

        const error1 = (
            <div className = {cx("error")}>
                아이디는 소문자만 지원합니다.
            </div>
        );
        const error2 = (
            <div className = {cx("error")}>
                비밀번호가 짧습니다.
            </div>
        );
        const error3 = (
            <div className = {cx("error")}>
                닉네임을 입력하세요.
            </div>
        );
        const error4 = (
            <div className = {cx("error")}>
                아이디가 존재합니다.
            </div>
        );
        const error5 = (
            <div className = {cx("error")}>
                닉네임이 존재합니다.
            </div>
        );

        const loginmodal = (
            <div>
                <div className = {cx("header")}>
                    로그인하기
                </div>
                <div className = {cx("arti")}>
                    <input type = "text" name = "id" placeholder = "아이디" value = {this.state.id} onChange = {this._change} />
                    <input type = "password" name = "pw" placeholder = "비밀번호" value = {this.state.pw} onChange = {this._change} />
                    <div className = {cx("login-btn")} onClick = {this._login}>
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
                    <input type = "text" name = "id" placeholder = "아이디" value = {this.state.id} onChange = {this._change} />
                    {this.props.joinstatus.error === 1? error1 : ""}
                    {this.props.joinstatus.error === 4? error4 : ""}
                    <input type = "password" name = "pw" placeholder = "비밀번호" value = {this.state.pw} onChange = {this._change} />
                    {this.props.joinstatus.error === 2? error2 : ""}
                    <input type = "text" name = "nickname" placeholder = "닉네임" value = {this.state.nickname} onChange = {this._change} />
                    {this.props.joinstatus.error === 3? error3 : ""}
                    {this.props.joinstatus.error === 5? error5 : ""}
                    <div className = {cx("login-btn")} onClick = {this._join}>
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
        hidelogin : state.showlogin.show,
        joinstatus : state.account.join,
        loginstatus : state.account.login
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        hideloginmodal : () => {
            return dispatch(hideLoginModal());
        },
        joinrequest : (id, pw, nickname) => {
            return dispatch(joinRequest(id, pw, nickname));
        },
        joinreset : () => {
            return dispatch(joinReset());
        },
        loginrequest : (id, pw) => {
            return dispatch(loginRequest(id, pw));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal);
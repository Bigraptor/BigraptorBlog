import React, { Component } from "react";
import styles from "./CommentInput.scss";
import classNames from "classnames/bind";
import { commentRequest, comment } from "../../actions/comment";
import { connect } from "react-redux";

const cx = classNames.bind(styles);

class CommentInput extends Component{

    constructor(props){
        super(props);
        this.state = {
            comment : ""
        };

        this._commentWrite = this._commentWrite.bind(this);
        this._change = this._change.bind(this);
    };

    _change(e){
        const a = {};
        a[e.target.name] = e.target.value;
        this.setState(a);
    };

    _commentWrite(){
        this.props.commentrequest(this.props.params.no,this.props.loginstatus.nickname, this.state.comment).then( () => {
            window.location.reload();
        });
    };

    render(){

        const login = (
            <div>
                <div className = {cx("nickname")}>
                    {this.props.loginstatus.nickname}
                </div>
                <div>
                    <textarea name = "comment" placeholder = "욕설, 성적인 발언등은 경고없이 삭제하며 법적조치를 취할 수 있습니다. 신중히 남겨주세요."
                                value = {this.state.comment} onChange = {this._change}/>
                </div>
                <div className = {cx("send-btn")} onClick = {this._commentWrite}>
                    <div>Send</div>
                </div>
            </div>
        );

        const notlogin = (
            <div className = {cx("notlogin")}>
                댓글을 남기려면 로그인이 필요합니다.
            </div>
        )

        return(
            <div className = {cx("wrapper")}>
                {this.props.tokenstatus.isLoggedin ? login : notlogin}
            </div>
        );
    };
};

const mapStateToProps = (state) => {
    return {
        loginstatus : state.account.login,
        tokenstatus : state.account.token
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        commentrequest : (no, nickname, content) => {
            return dispatch(commentRequest(no, nickname, content));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentInput);
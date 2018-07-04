import React, { Component } from "react";
import styles from "./CommentInput.scss";
import classNames from "classnames/bind";
import { commentRequest, commentModifyLoadRequest, commentModifyRequest, commentReplyRequest, commentReplyModifyRequest, commentReplyModifyLoadRequest } from "../../actions/comment";
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
        this._commentModify = this._commentModify.bind(this);
        this._commentReply = this._commentReply.bind(this);
        this._replyModify = this._replyModify.bind(this);
    };

    componentDidMount(){
        if(this.props.modify){
            this.props.commentmodifyloadrequest(this.props.params.no ,this.props.id).then( () => {  
                this.setState({
                    comment : this.props.commentstatus.exactcomment
                });
            });
        }else if(this.props.modifyreply){
            this.props.commentreplymodifyloadrequest(this.props.params.no, this.props.id, this.props.oid).then(
                () => {
                    this.setState({
                        comment : this.props.commentstatus.replycomment
                    });
                }
            );
        };
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

    _commentModify(){
        this.props.commentmodifyrequest(this.props.params.no, this.props.id, this.state.comment).then(
            () => {
                if(this.props.commentstatus.status === "SUCCESS"){
                    console.log(this.props.commentstatus)
                    window.location.reload();
                };
            }
        );
    };

    _commentReply(){
        this.props.commentreplyrequest(this.props.params.no, this.props.id, this.state.comment, this.props.loginstatus.nickname, this.props.author).then(
            () => {
                window.location.reload();
            }
        );
    };

    _replyModify(){
        this.props.commentreplymodifyrequest(this.props.params.no, this.props.id, this.props.oid, this.state.comment).then(
            () => {
                window.location.reload();
            }
        );
    };

    render(){

        const writebtn = (
            <div onClick = {this._commentWrite}>
                Send
            </div>
        );

        const modifybtn = (
            <div onClick = {this._commentModify}>
                수정
            </div>            
        );

        const modifyreplybtn = (
            <div onClick = {this._replyModify}>
                수정
            </div>                
        )

        const replybtn = (
            <div onClick = {this._commentReply}>
                답글등록
            </div>  
        );

        const login = (
            <div>
                <div className = {cx("nickname")}>
                    {this.props.loginstatus.nickname}
                </div>
                <div>
                    <textarea name = "comment" placeholder = "욕설, 성적인 발언등은 경고없이 삭제하며 법적조치를 취할 수 있습니다. 신중히 남겨주세요."
                                value = {this.state.comment} onChange = {this._change}/>
                </div>
                <div>
                    <div className = {cx("send-btn")}>{this.props.modify ? modifybtn : this.props.modifyreply ? modifyreplybtn : this.props.reply ? replybtn : writebtn}</div>
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
        tokenstatus : state.account.token,
        commentstatus : state.comment.comm
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        commentrequest : (no, nickname, content) => {
            return dispatch(commentRequest(no, nickname, content));
        },
        commentmodifyloadrequest : (no, id) => {
            return dispatch(commentModifyLoadRequest(no, id));
        },
        commentmodifyrequest : (no, id, content) => {
            return dispatch(commentModifyRequest(no, id, content));
        },
        commentreplyrequest : (no, id, content, nickname, author) => {
            return dispatch(commentReplyRequest(no, id, content, nickname, author));
        },
        commentreplymodifyrequest : (no, id, oid, content) => {
            return dispatch(commentReplyModifyRequest(no, id, oid, content));
        },
        commentreplymodifyloadrequest : (no, id, oid) => {
            return dispatch(commentReplyModifyLoadRequest(no, id, oid));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentInput);
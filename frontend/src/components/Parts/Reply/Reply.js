import React, {Component} from "react";
import styles from "./Reply.scss";
import classNames from "classnames/bind";
import moment from "moment";
import CommentInput from "../CommentInput/CommentInput.js";
import { commentReplyDeleteRequest } from "../../actions/comment";
import { connect } from "react-redux";

const cx = classNames.bind(styles);

class Reply extends Component{

    constructor(props){
        super(props);
        this.state = {
            showsubmenu : false,
            showreply : false,
            showmodify : false
        };

        this._mouseover = this._mouseover.bind(this);
        this._mouseout = this._mouseout.bind(this);
        this._reply = this._reply.bind(this);
        this._modify = this._modify.bind(this);
        this._delete = this._delete.bind(this);
    };
    
    _mouseover(){
        this.setState({
            showsubmenu : true
        });
    };

    _mouseout(){
        this.setState({
            showsubmenu : false
        });
    };

    _reply(){
        this.setState({
            showreply : !this.state.showreply
        });
    };

    _modify(){
        this.setState({
            showmodify : !this.state.showmodify
        });
    };

    _delete(){
        this.props.commentreplydeleterequest(this.props.params.no, this.props.id, this.props.oid).then(
            () => {
                window.location.reload();
            }
        );
    };

    render(){
        
        const dateFormat = "YYYY-MM-DD hh:mm";
        const date = moment(this.props.created).format(dateFormat);
    
        const enter = this.props.content.split('\n').map( (line, i) => {
            return (<span key = {i}>{line}<br/></span>);
        });

        const reply = (
            <div>
                <CommentInput id = {this.props.id} params = {this.props.params} author = {this.props.author} reply/>
            </div>
        );
        
        const modify = (
            <div>
                <CommentInput id = {this.props.id} params = {this.props.params} oid = {this.props.oid} modifyreply />
            </div>
        );

        return(
            <div>
                <div className = {cx("wrapper")} onMouseOver = {this._mouseover} onMouseOut = {this._mouseout}>
                    <div className = {cx("inner")}>
                        <div className = {cx("image")}>
                            <div>
                                <img src = {this.props.author === "Bigraptor" ? "/raptor.png" : "/user.png"} alt = "profile"/>
                            </div>
                        </div>
                        <div className = {cx("section")}>
                            <div className = {cx("section-header")}>
                                <div className = {cx("id", {
                                        owner : this.props.author === "Bigraptor"
                                    })}>
                                    {this.props.author}
                                    {this.props.author === "Bigraptor" && <img src =  "/level/level_11.gif"  alt = "profile_level" />}
                                </div>
                                <span>{date}</span>
                                <div className = {cx("submenu", {
                                    mouseover : this.state.showsubmenu
                                })}>
                                    {this.props.tokenstatus.isLoggedin ? <span onClick = {this._reply}>답글</span> : ""}
                                    {this.props.author === this.props.loginstatus.nickname ? <span onClick = {this._modify}>수정</span> : ""}
                                    {this.props.author === this.props.loginstatus.nickname || this.props.loginstatus.admin ? <span onClick = {this._delete}>삭제</span> : ""}
                                </div>
                            </div>
                            <div className = {cx("section-content")}>
                                <div>
                                    @{this.props.defaultwriter}
                                </div>
                                {enter}
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    {this.state.showmodify ? modify : ""}
                </div>
                <div>
                    {this.state.showreply ? reply : ""}
                </div>
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        loginstatus : state.account.login,
        tokenstatus : state.account.token
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        commentreplydeleterequest : (no, id, oid) => {
            return dispatch(commentReplyDeleteRequest(no, id, oid));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Reply);
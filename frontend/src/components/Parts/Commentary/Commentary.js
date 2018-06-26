import React, {Component} from "react";
import styles from "./Commentary.scss";
import classNames from "classnames/bind";
import CommentInput from "../CommentInput/CommentInput.js";
import Reply from "../Reply/Reply.js";
import { commentDeleteRequest } from "../../actions/comment";
import moment from "moment";
import { connect } from "react-redux";

const cx = classNames.bind(styles);

class Commentary extends Component{

    constructor(props){
        super(props);
        this.state = {
            showsubmenu : false,
            showmodify : false,
            showreply : false
        };

        this._mouseover = this._mouseover.bind(this);
        this._mouseout = this._mouseout.bind(this);
        this._modify = this._modify.bind(this);
        this._delete = this._delete.bind(this);
        this._reply = this._reply.bind(this);
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

    _modify(){
        this.setState({
            showmodify : !this.state.showmodify
        });
    };

    _delete(){
        this.props.commentdeleterequest(this.props.params.no, this.props.id).then( () => {
            window.location.reload();
        });
    };

    _reply(){
        this.setState({
            showreply : !this.state.showreply
        });
    };

    render(){

        const comment = this.props.content.split('\n').map( (line, i) => {
            return (<span key = {i}>{line}<br/></span>); //////////////// textarea에서 db로 값을 저장하게 된다면, 엔터는 공백으로 저장이됩니다. 이것을 <br />로 치환하는식입니다.
        });

        const dateFormat = "YYYY-MM-DD hh:mm";
        const date = moment(this.props.created).format(dateFormat);

        const modify = (
            <div>
                <CommentInput id = {this.props.id} params = {this.props.params} modify />
            </div>
        );

        const reply = (
            <div>
                <CommentInput id = {this.props.id} params = {this.props.params} author = {this.props.author} reply/>
            </div>
        )

        const replymap = this.props.reply.map( ( a, i) => {
            return <Reply key = {i} defaultwriter = {a.defaultwriter} author = {a.author} content = {a.content} 
                        created = {a.created} id = {this.props.id} params = {this.props.params} oid = {a._id}/>
        } );

        return(
            <div>
                <div className = {cx("wrapper")} onMouseOver = {this._mouseover} onMouseOut = {this._mouseout}>
                    <div className = {cx("image")}>
                        <div>
                            <img src = {this.props.author === "Bigraptor" ? "/raptor.png" : "/user.png"} alter = "프로필 이미지"/>
                        </div>
                    </div>
                    <div className = {cx("section")}>
                        <div className = {cx("section-header")}>
                            <div className = {cx("id", {
                                owner : this.props.author === "Bigraptor"
                            })}>
                                {this.props.author}
                                <img src = {this.props.author === "Bigraptor" ? "/level/level_19.gif" : ""} />
                            </div>
                            <span>{date}</span>
                            <div className = {cx("submenu", {
                                mouseover : this.state.showsubmenu
                            })}>
                                {this.props.tokenstatus.isLoggedin ? <span onClick = {this._reply}>답글</span> : ""}
                                {this.props.author == this.props.loginstatus.nickname ? <span onClick = {this._modify}>수정</span> : ""}
                                {this.props.author == this.props.loginstatus.nickname || this.props.loginstatus.admin ? <span onClick = {this._delete}>삭제</span> : ""}
                            </div>
                        </div>
                        <div className = {cx("section-content")}>
                            {comment}
                        </div>
                    </div>
                </div>
                <div>
                    {this.state.showmodify ? modify : ""}
                </div>
                <div>
                    {this.state.showreply ? reply : ""}
                </div>
                <div>
                    {replymap}
                </div>
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
        commentdeleterequest : (no, id) => {
            return dispatch(commentDeleteRequest(no, id));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Commentary);
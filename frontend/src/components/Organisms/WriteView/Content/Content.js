import React, {Component} from "react";
import Header from "../Header/Header.js";
import styles from "./Content.scss";
import classNames from "classnames/bind";
import Article from "../Article/Article.js";
import Comment from "../Comment/Comment.js";
import Commentary from "../../../Parts/Commentary/Commentary.js";
import CommentInput from "../../../Parts/CommentInput/CommentInput.js";
import { exactPostRequest, postDeleteRequest } from "../../../actions/post";
import { commentLoadRequest } from "../../../actions/comment";
import { connect } from "react-redux";

const cx = classNames.bind(styles);

class Content extends Component{

    componentDidMount(){
        this.props.exactpostrequest(this.props.params.no);
        this.props.commentloadrequest(this.props.params.no);
    };

    _delete = (no) => {
        this.props.postdeleterequest(no).then(
            () => {
                window.location.href = "/";
            }
        );
    };

    render(){

        const commentmap = this.props.commentstatus.list.map( (b, i) => {
            return <Commentary key = {i} author = {b.author} content = {b.content} created = {b.created} 
                    id = {b._id} params = {this.props.params} reply = {b.reply}/> });
        
        const postmap = (
            <div>
                <Header title = {this.props.poststatus.exactpost.title} category = {this.props.poststatus.exactpost.category} date = {this.props.poststatus.exactpost.created} />
                <Article article = {this.props.poststatus.exactpost.content} admin = {this.props.loginstatus.admin} params = {this.props.params} delete = {this._delete}/>
                <Comment>
                    {commentmap}
                </Comment>
                <CommentInput params = {this.props.params} />
            </div>
        );

        return (
            <div className = {cx("wrapper")}>
                {postmap}
            </div>
        );
    };
};

const mapStateToProps = (state) => {
    return {
        poststatus : state.post.load,
        commentstatus : state.comment.comm,
        loginstatus : state.account.login
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        exactpostrequest : (no) => {
            return dispatch(exactPostRequest(no));
        },
        commentloadrequest : (no) => {
            return dispatch(commentLoadRequest(no));
        },
        postdeleterequest : (no) => {
            return dispatch(postDeleteRequest(no));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Content);
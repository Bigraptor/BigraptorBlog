import React, {Component} from "react";
import Header from "../Header/Header.js";
import styles from "./Content.scss";
import classNames from "classnames/bind";
import Article from "../Article/Article.js";
import Comment from "../Comment/Comment.js";
import Commentary from "../../../Parts/Commentary/Commentary.js";
import CommentInput from "../../../Parts/CommentInput/CommentInput.js";
import { exactPostRequest } from "../../../actions/post";
import { commentLoadRequest } from "../../../actions/comment";
import { connect } from "react-redux";

const cx = classNames.bind(styles);

class Content extends Component{

    componentDidMount(){
        this.props.exactpostrequest(this.props.params.no);
        this.props.commentloadrequest(this.props.params.no).then(()=>{
            console.log(this.props.commentstatus.list);
        });
    };

    render(){

        const commentmap = this.props.commentstatus.list.map( (b, i) => {
            return <Commentary key = {i} author = {b.author} content = {b.content} created = {b.created} 
                    id = {b._id} params = {this.props.params} reply = {b.reply}/> });

        const postmap = this.props.poststatus.post.map( (a, i) => {
            return (
                <div key = {i}>
                    <Header title = {a.title} category = {a.category} date = {a.created} />
                    <Article  article = {a.content} />
                    <Comment>
                        {commentmap}
                    </Comment>
                    <CommentInput params = {this.props.params}/>
                </div>
            );
        } );

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
        commentstatus : state.comment.comm
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        exactpostrequest : (no) => {
            return dispatch(exactPostRequest(no));
        },
        commentloadrequest : (no) => {
            return dispatch(commentLoadRequest(no));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Content);
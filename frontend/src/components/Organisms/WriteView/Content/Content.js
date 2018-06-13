import React, {Component} from "react";
import Header from "../Header/Header.js";
import styles from "./Content.scss";
import classNames from "classnames/bind";
import Article from "../Article/Article.js";
import Comment from "../Comment/Comment.js";
import Commentary from "../../../Parts/Commentary/Commentary.js";
import CommentInput from "../../../Parts/CommentInput/CommentInput.js";
import { exactPostRequest } from "../../../actions/post";
import { connect } from "react-redux";

const cx = classNames.bind(styles);

class Content extends Component{

    componentDidMount(){
        this.props.exactpostrequest(this.props.params.no);
    };

    render(){

        const map = this.props.poststatus.post.map( (a, i) => {
            return (
                <div key = {i}>
                    <Header title = {a.title} category = {a.category} date = {a.created} />
                    <Article  article = {a.content} />
                    <Comment>
                        <Commentary />
                    </Comment>
                    <CommentInput />
                </div>
            );
        } );

        return (
            <div className = {cx("wrapper")}>
                {map}
            </div>
        );
    };
};

const mapStateToProps = (state) => {
    return {
        poststatus : state.post.load
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        exactpostrequest : (no) => {
            return dispatch(exactPostRequest(no));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Content);
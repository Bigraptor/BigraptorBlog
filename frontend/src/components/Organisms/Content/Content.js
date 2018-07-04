import React, { Component } from "react";
import styles from "./Content.scss";
import classNames from "classnames/bind";
import WriteList from "../../Parts/WriteList/WriteList.js";
import { postLoadRequest, postBringRequest } from "../../actions/post";
import Pagination from "../../Parts/Pagination/Pagination.js";
import CategoryPagination from "../../Parts/CategoryPagination/CategoryPagination.js";
import { connect } from "react-redux";

const cx = classNames.bind(styles);

class Content extends Component{

    componentDidMount(){
        if(typeof this.props.params.category === "string"){
            let category = this.props.params.category;
            if(typeof window.location.href.split("/")[6] === "undefined"){
                this.props.postloadrequest(category, 1);
            }else {
                this.props.postloadrequest(category, window.location.href.split("/")[6]);
            }
        } else{
            if(typeof window.location.href.split("/")[4] === "undefined"){
                this.props.postbringrequest(1);
            }else{
                this.props.postbringrequest(window.location.href.split("/")[4]*1);
            }
        };
    };

    render(){

        const map = this.props.postload.posts.map( (post) => {
            return <WriteList key = {post.no} category = {post.category} title = {post.title} content = {post.content} created = {post.created} no = {post.no} id = {post._id} thumbnail = {post.thumbnail} />
        });

        return (
            <div className = {cx("wrapper")}>
                <div className = {cx("content")} >
                    {map}
                </div>
                <div className = {cx("pagination")} >
                    {(typeof this.props.params.category !== "string") ? <Pagination /> : <CategoryPagination params = {this.props.params}/>}
                </div>
            </div>
        );
    };
};

const mapStateToProps = (state) => {
    return {
        postload : state.post.load
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        postloadrequest : (category, skip) => {
            return dispatch(postLoadRequest(category, skip));
        },
        postbringrequest : (no) => {
            return dispatch(postBringRequest(no));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Content);
import React, { Component } from "react";
import styles from "./Content.scss";
import classNames from "classnames/bind";
import WriteList from "../../Parts/WriteList/WriteList.js";
import { postLoadRequest } from "../../actions/post";
import { connect } from "react-redux";

const cx = classNames.bind(styles);

class Content extends Component{

    componentDidMount(){
        if(typeof this.props.params.category === "string"){
            let category = this.props.params.category;
            this.props.postloadrequest(category);
        } else{
            this.props.postloadrequest();
        }
    };

    render(){

        const map = this.props.postload.post.map( (a) => {
            return <WriteList key = {a.no} category = {a.category} title = {a.title} content = {a.content} created = {a.created} no = {a.no} />
        });

        return (
            <div className = {cx("wrapper")}>
                <div className = {cx("content")} >
                    {map}
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
        postloadrequest : (category) => {
            return dispatch(postLoadRequest(category));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Content);
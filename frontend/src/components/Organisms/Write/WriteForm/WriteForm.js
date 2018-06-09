import React, { Component } from "react";
import styles from "./WriteForm.scss";
import classNames from "classnames/bind";
import WriteHeader from "../WriteHeader/WriteHeader.js";
import { postWriteRequest } from "../../../actions/post";
import { connect } from "react-redux";

const cx = classNames.bind(styles);

class WriteForm extends Component{

    constructor(props){
        super(props);
        this.state = {
            content : ""
        };

        this._change = this._change.bind(this);
        this._create = this._create.bind(this);
    };

    _change(e){
        const a = {};
        a[e.target.name] = e.target.value;
        this.setState(a);
    }

    _create(title, category){
        this.props.postWriterequest(title, this.state.content, category).then(() => {
            if(this.props.postwritestatus.status = "SUCCESS"){
                window.location.href = "/";
            }
        })
    };

    render(){
        return (
            <div className = {cx("write-wrapper")}>
                <div className = {cx("header")}>
                    <WriteHeader create = {this._create} />
                </div>
                <div className = {cx("content-title")}>
                    <textarea name = "content" placeholder = "내용을 입력하세요" value = {this.state.content} onChange = {this._change}/>
                </div>
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        postwritestatus : state.post.write
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        postWriterequest : (title, content, category) => {
            return dispatch(postWriteRequest(title, content, category))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(WriteForm);
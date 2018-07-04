/* eslint-disable import/first */
import React, { Component } from "react";
import styles from "./WriteForm.scss";
import classNames from "classnames/bind";
import WriteHeader from "../WriteHeader/WriteHeader.js";
import { postWriteRequest, postModifyRequest } from "../../../actions/post";
import { connect } from "react-redux";
////////////
import $ from 'jquery';
window.jQuery = $;
import ReactSummernote from 'react-summernote';
import 'react-summernote/dist/react-summernote.css';
import 'react-summernote/lang/summernote-ko-KR'
import 'bootstrap/dist/js/bootstrap.bundle.js';
import 'bootstrap/js/dist/modal.js';
import 'bootstrap/js/dist/dropdown.js';
import 'bootstrap/js/dist/tooltip.js';
import 'bootstrap/dist/css/bootstrap.css';
// import Util from 'bootstrap/js/src/util';
// global.Util = Util;
require('bootstrap');
//////////

const cx = classNames.bind(styles);

class WriteForm extends Component{

    constructor(props){
        super(props);
        this.state = {
            content : ""
        };

        this._create = this._create.bind(this);
        this._modify = this._modify.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onImageUpload = this.onImageUpload.bind(this);
    };

    onChange(contents) {
        this.setState({
            content : contents
        });

    };

    _create(title, category){
        this.props.postWriterequest(title, this.state.content, category).then(() => {
            if(this.props.postwritestatus.status === "SUCCESS"){
                window.location.href = "/";
            }
        })
    };

    _modify(title){
        this.props.postmodifyrequest(title, this.state.content, this.props.params.no).then(
            () => {
                window.location.href = "/"+this.props.params.no
            }
        );
    };
    
    onImageUpload(files){
        this.sendFile(files[0]);
    };

    sendFile(file){
        const data = new FormData();
        data.append("uploadFile", file);
        $.ajax({
            data : data,
            type : "POST",
            url : "/post/imageupload",
            cache : false,
            contentType : false,
            processData : false,
            success : function(data) {
                ReactSummernote.insertImage(data.result.path.substring(6));
            }
        });
    };

    checkDefaultValue(){
        if(window.location.href.split('/')[4] === "modify"){
            return this.props.poststatus.exactpost.content
        }
    }

    render(){
        return (
            <div className = {cx("write-wrapper")}>
                <div className = {cx("header")}>
                    <WriteHeader create = {this._create} modify = {this._modify} title = {this.props.poststatus.exactpost.title}/>
                </div>
                <div className = {cx("content-title")}>
                <ReactSummernote
                    value = {this.checkDefaultValue()}
                    name = "content"
                    className = "summernote"
                    options={{
                    lang: 'ko-KR',
                    height: "812",
                    dialogsInBody: true,
                    toolbar: [
                        ['style', ['style']],
                        ['font', ['bold', 'underline', 'clear']],
                        ['fontname', ['fontname']],
                        ['para', ['ul', 'ol', 'paragraph']],
                        ['table', ['table']],
                        ['insert', ['link', 'picture', 'video']],
                        ['view', ['fullscreen', 'codeview']]
                    ]
                    }}
                    onChange={this.onChange}
                    onImageUpload={this.onImageUpload}
                />
                </div>
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        postwritestatus : state.post.write,
        poststatus : state.post.load
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        postWriterequest : (title, content, category) => {
            return dispatch(postWriteRequest(title, content, category))
        },
        postmodifyrequest : (title, content, no) => {
            return dispatch(postModifyRequest(title, content, no));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(WriteForm);
import * as types from "./ActionTypes.js";
import axios from "axios";

export function commentRequest(no, nickname, content){
    return (dispatch) => {
        return axios.post("/post/writecomment/"+no, {nickname, content}).then(
            (response) => {
                dispatch(comment());
            }
        );
    };
};

export function commentLoadRequest(no){
    return (dispatch) => {
        return axios.get("/post/loadcomment/"+no).then(
            (response) => {
                dispatch(commentLoad(response.data.comment.comment));
            }
        );
    };
};

export function commentModifyLoadRequest(no, id){
    return (dispatch) => {
        return axios.post("/post/exactloadcomment/"+ no, {id}).then( 
            (response) => {
                dispatch(commentModifyLoad(response.data.comment));
        });
    };
};

export function commentModifyRequest(no, id, content){
    return (dispatch) => {
        return axios.put("/post/modifycomment/" + no, {id, content}).then( 
            (response) => {
                console.log("낄낄")
                dispatch(commentModify());
            }
        );
    };
};

export function commentDeleteRequest(no, id){
    return (dispatch) => {
        return axios.post("/post/deletecomment/"+no, {id}).then(
            (response) => {
                dispatch(commentDelete());
            }
        );
    };
};

export function commentReplyRequest(no, id, content, nickname, author){
    return (dispatch) => {
        return axios.post("/post/reply/"+no, {id, content, nickname, author}).then(
            (response) => {
                dispatch(commentReply());
            }
        );
    };
};

export function commentReplyModifyRequest(no, id, oid, content){
    return (dispatch) => {
        return axios.put("/post/modifyreply/" + no, {id, oid, content}).then(
            (response) => {
                dispatch(commentReplyModify());
            }
        );
    };
};

export function commentReplyModifyLoadRequest(no, id, oid){
    return (dispatch) => {
        return axios.post("/post/modifyreplyload/" + no, { id, oid }).then(
            (response) => {
                dispatch(commentReplyModifyLoad(response.data.comment));
            }
        );
    };
};

export function commentReplyDeleteRequest(no, id, oid){
    return (dispatch) => {
        return axios.post("/post/deletereply/"+no, { id, oid }).then(
            (response) => {
                dispatch(commentReplyDelete());
            }
        );
    };
};

export function comment(){
    return {
        type : types.COMMENT
    };
};

export function commentLoad(comment){
    return {
        type : types.COMMENT_LOAD,
        comment
    };
};

export function commentModifyLoad(comment){
    return {
        type : types.COMMENT_MODIFY_LOAD,
        comment
    };
};

export function commentModify(){
    return {
        type : types.COMMENT_MODIFY
    };
};

export function commentDelete(){
    return {
        type : types.COMMENT_DELETE
    };
};

export function commentReply(){
    return {
        type : types.COMMENT_REPLY
    };
};

export function commentReplyModify(){
    return {
        type : types.COMMENT_REPLY_MODIFY
    };
};

export function commentReplyModifyLoad(comment){
    return {
        type : types.COMMENT_REPLY_MODIFY_LOAD,
        comment
    };
};

export function commentReplyDelete(){
    return {
        type : types.COMMENT_REPLY_DELETE
    };
};
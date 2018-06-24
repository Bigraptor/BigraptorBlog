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
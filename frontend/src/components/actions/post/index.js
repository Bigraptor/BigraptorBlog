import * as types from "./ActionTypes.js";
import axios from "axios";

export function postWriteRequest(title, content, category){
    return (dispatch) => {
        return axios.post("/post/write", {title, content, category}).then(
            (response) => {
                dispatch(postWrite());
            }
        );
    };
};

export function postLoadRequest(category){
    return (dispatch) => {
        dispatch(postLoad());

        return axios.post("/post/load", {category}).then(
            (response) => {
                dispatch(postLoadSuccess(response.data));
            }
        ).catch( 
            (error) => {
                dispatch(postLoadFailed());
        } );
    };
};

export function exactPostRequest(no){
    return (dispatch) => {
        return axios.post("/post/exactpost", {no}).then(
            (response) => {
                dispatch(exactPost(response.data));
            }
        );
    };
};

export function postWrite(){
    return {
        type : types.POST_WRITE
    };
};
///////////////////////////////////
export function postLoad(){
    return {
        type : types.POST_LOAD
    };
};

export function postLoadSuccess(load){
    return {
        type : types.POST_LOAD_SUCCESS,
        load
    };
};

export function postLoadFailed(){
    return {
        type : types.POST_LOAD_FAILED
    };
};

export function exactPost(post){
    return {
        type : types.EXACT_POST,
        post
    }
}
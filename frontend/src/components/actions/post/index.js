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

export function postLoadRequest(category, skip){
    return (dispatch) => {
        dispatch(postLoad());

        return axios.post("/post/load", {category, skip}).then(
            (response) => {
                dispatch(postLoadSuccess(response.data));
            }
        ).catch( 
            (error) => {
                dispatch(postLoadFailed());
        } );
    };
}; //////////////////////// 특정카테고리 포스트 불러오기

export function postBringRequest(no){
    return (dispatch) => {
        dispatch(postBring());

        return axios.post("/post/bring", {no}).then(
            (response) => {
                dispatch(postBringSuccess(response.data));
            }
        ).catch( 
            (error) => {
                dispatch(postBringFailed());
        } );
    };
}; /////////////////////// 카테고리구분없이 전체 포스트 불러오기

export function exactPostRequest(no){
    return (dispatch) => {
        return axios.post("/post/exactpost", {no}).then(
            (response) => {
                dispatch(exactPost(response.data));
            }
        );
    };
};

export function postModifyRequest(title, content, no){
    return (dispatch) => {
        return axios.put("/post/modify/" + no, {title, content}).then(
            (response) => {
                dispatch(postModify());
            }
        );
    };
};

export function postDeleteRequest(no){
    return (dispatch) => {
        return axios.delete("/post/delete/"+no).then(
            (response) => {
                dispatch(postDelete());
            }
        );
    };
};

export function postPaginationRequest(){
    return (dispatch) => {
        return axios.get("/post/pagination").then(
            (response) => {
                dispatch(postPagination(response.data.totalpage));
            }
        );
    };
};

export function postCategoryPaginationRequest(category){
    return (dispatch) => {
        return axios.post("/post/categorypagination", {category}).then(
            (response) => {
                dispatch(postCategoryPagination(response.data.totalpage));
            }
        );
    };
};

///////////////////////////////////

export function postWrite(){
    return {
        type : types.POST_WRITE
    };
};
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
    };
};

export function postModify(){
    return {
        type : types.POST_MODIFY
    };
};

export function postDelete(){
    return {
        type : types.POST_DELETE
    };
};

export function postPagination(pagination){
    return {
        type : types.POST_PAGINATION,
        pagination
    };
};

export function postCurrentPage(page){
    return {
        type : types.POST_CURRENTPAGE,
        page
    };
};

export function postNextPage(){
    return {
        type : types.POST_NEXTPAGE
    };
};

export function postBring(){
    return {
        type : types.POST_BRING
    };
};

export function postBringSuccess(bring){
    return {
        type : types.POST_BRING_SUCCESS,
        bring
    };
};

export function postBringFailed(){
    return {
        type : types.POST_BRING_FAILED
    };
};

export function postPrevious(){
    return {
        type : types.POST_PREVIOUS
    };
};

export function postCategoryPagination(pagination){
    return {
        type : types.POST_CATEGORY_PAGINATION,
        pagination
    };
};
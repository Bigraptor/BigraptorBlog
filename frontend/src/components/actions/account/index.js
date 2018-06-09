import * as types from "./ActionTypes.js";
import axios from "axios";

export function joinRequest(id, pw, nickname){
    return (dispatch) => {
        dispatch(join());

        return axios.post("/account/join", {id, pw, nickname}).then(
            (response) => {
                dispatch(joinSuccess());
            }
        ).catch(
            (error) => {
                dispatch(joinFailed(error.response.data.code));
            }
        );
    }
}

export function loginRequest(id, pw){
    return (dispatch) => {
        dispatch(login());

        return axios.post("/account/login", {id, pw}).then(
            (response) => {
                dispatch(loginSuccess(response.data.account));
            }
        ).catch(
            (error) => {
                dispatch(loginFailed(error.response.data.code));
            }
        );
    };
};

export function tokenCheckRequest(cookie){
    return (dispatch) => {
        dispatch(tokenCheck());

        return axios.get("/account/tokencheck", {cookie}).then(
            (response) => {
                dispatch(tokenCheckSuccess(response.data.info));
            }
        ).catch(
            (error) => {
                dispatch(tokenCheckFailed());
            }
        );
    };
};

export function logoutRequest(){
    return (dispatch) => {
        return axios.get("/account/logout");
    }
}

export function join(){
    return{
        type : types.JOIN
    };
};

export function joinSuccess(){
    return{
        type : types.JOIN_SUCCESS
    };
};

export function joinFailed(error){
    return {
        type : types.JOIN_FAILED,
        error
    };
};

export function joinReset(){
    return {
        type : types.JOIN_RESET
    };
};

export function login(){
    return {
        type : types.LOGIN
    };
};

export function loginSuccess(account){
    return {
        type : types.LOGIN_SUCCESS,
        account
    };
};

export function loginFailed(error){
    return{
        type : types.LOGIN_FAILED,
        error
    };
};

export function tokenCheck(){
    return {
        type : types.TOKEN_CHECK
    };
};

export function tokenCheckSuccess(info){
    return {
        type : types.TOKEN_CHECK_SUCCESS,
        info
    };
};

export function tokenCheckFailed(){
    return {
        type : types.TOKEN_CHECK_FAILED
    };
};

export function loginReset(){
    return{
        type : types.LOGIN_RESET
    };
};

export function logout(){
    return{
        type : types.LOGOUT
    };
};
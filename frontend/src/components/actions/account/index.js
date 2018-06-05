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
                dispatch(loginSuccess());
            }
        ).catch(
            (error) => {
                dispatch(loginFailed());
            }
        );
    };
};

export function tokenCheckRequest(){
    return (dispatch) => {
        dispatch(tokenCheck());

        return axios.get("/account/tokencheck").then(
            (response) => {
                dispatch(tokenCheckSuccess());
            }
        ).catch(
            (error) => {
                dispatch(tokenCheckFailed());
            }
        );
    };
};

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

export function loginSuccess(token){
    return {
        type : types.LOGIN_SUCCESS
    };
};

export function loginFailed(){
    return{
        type : types.LOGIN_FAILED
    };
};

export function tokenCheck(){
    return {
        type : types.TOKEN_CHECK
    };
};

export function tokenCheckSuccess(){
    return {
        type : types.TOKEN_CHECK_SUCCESS
    };
};

export function tokenCheckFailed(){
    return {
        type : types.TOKEN_CHECK_FAILED
    };
};
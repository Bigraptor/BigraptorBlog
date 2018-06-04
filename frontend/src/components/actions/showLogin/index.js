import * as types from "./ActionTypes.js";

export function showLoginModal(){
    return {
        type : types.SHOW_LOGIN_MODAL
    };
};

export function hideLoginModal(){
    return {
        type : types.HIDE_LOGIN_MODAL
    };
};
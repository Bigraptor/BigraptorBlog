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
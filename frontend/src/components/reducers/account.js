import * as types from "../actions/account/ActionTypes.js";
import update from "react-addons-update";

const initialState = {
    join : {
        status : "INIT",
        error : -1
    }
};

export default function account(state = initialState, action){
    switch(action.type){
        case (types.JOIN) :
            return update(state, {
                join : {
                    status : {$set: "WAIT"}
                }
            });

        case (types.JOIN_SUCCESS) :
            return update(state, {
                join : {
                    status : {$set: "SUCCESS"}
                }
            });

        case (types.JOIN_FAILED) :
            return update(state, {
                join : {
                    status : {$set: "FAILED"},
                    error : {$set: action.error}
                }
            });

        case (types.JOIN_RESET) :
            return update(state, {
                join : {
                    error : {$set: -1}
                }
            });

        default:
            return state;
    };
};


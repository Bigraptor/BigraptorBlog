import * as types from "../actions/showLogin/ActionTypes.js";
import update from "react-addons-update";

const initialState = {
    show : false
};

export default function showlogin(state = initialState, action){
    switch(action.type){
        case(types.SHOW_LOGIN_MODAL) :
            return update(state, {
                show : {$set: true}
            });

        case(types.HIDE_LOGIN_MODAL) :
            return update(state, {
                show : {$set : false}
            });

        default :
            return state;
    };
};
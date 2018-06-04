import * as types from "../actions/menu/ActionTypes.js";
import update from "react-addons-update";

const initialState = {
    show : false
};

export default function menu(state = initialState, action){
    switch(action.type){

        case(types.MENU) :
            return update(state, {
                show : {$set:true}
            });

        default :
            return state;
    };
};
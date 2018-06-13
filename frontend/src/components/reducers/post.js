import * as types from "../actions/post/ActionTypes.js";
import update from "react-addons-update";

const initialState = {
    write : {
        status : "INIT"
    },
    load : {
        status : "INIT",
        post : []
    }
};

export default function post(state = initialState, action){
    switch(action.type){
        case(types.POST_WRITE) :
            return update(state, {
                write : {
                    status : {$set: "SUCCESS"}
                }
            });

        case(types.POST_LOAD) :
            return update(state, {
                load : {
                    status : {$set: "WAIT"}
                }
            });

        case(types.POST_LOAD_SUCCESS) :
            return update(state, {
                load : {
                    status : {$set: "SUCCESS"},
                    post : {$set: action.load}
                }
            });

        case(types.POST_LOAD_FAILED) :
            return update(state, {
                load : {
                    status : {$set: "FAILED"}
                }
            });

        case(types.EXACT_POST) :
            return update(state, {
                load : {
                    post : {$set: action.post}
                }
            })

        default :
            return state;
    };
};
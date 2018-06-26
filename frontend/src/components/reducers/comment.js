import * as types from "../actions/comment/ActionTypes.js";
import update from "react-addons-update";

const initialState = {
    comm : {
        status : "INIT",
        list : [],
        exactcomment : "",
        replycomment : ""
    }
};

export default function comment(state = initialState, action){
    switch(action.type){
        case(types.COMMENT):
            return update(state, {
                comm : {
                    status : {$set: "SUCCESS"}
                }
            });

        case(types.COMMENT_LOAD) :
            return update(state, {
                comm : {
                    list : {$set: action.comment}
                }
            });

        case(types.COMMENT_MODIFY_LOAD) :
            return update(state, {
                comm : {
                    exactcomment : {$set: action.comment}
                }
            });

        case(types.COMMENT_MODIFY) :
            return update(state, {
                comm : {
                    status : {$set: "SUCCESS"}
                }
            });

        case(types.COMMENT_REPLY_MODIFY_LOAD) :
            return update(state, {
                comm : {
                    replycomment : {$set: action.comment}
                }
            });

        default :
            return state;
    };
};
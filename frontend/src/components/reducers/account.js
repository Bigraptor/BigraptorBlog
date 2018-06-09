import * as types from "../actions/account/ActionTypes.js";
import update from "react-addons-update";

const initialState = {
    join : {
        status : "INIT",
        error : -1
    },
    login : {
        status : "INIT",
        error : -1,
        nickname: "",
        admin : false
    },
    token : {
        isLoggedin : false,
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

        case (types.LOGIN) :
            return update(state, {
                login : {
                    status : {$set: "WAIT"}
                }
            });

         case (types.LOGIN_SUCCESS) :
            return update(state, {
                login : {
                    status : {$set: "SUCCESS"},
                    nickname : {$set: action.account.nickname},
                    admin : {$set: action.account.admin}
                },
                token : {
                    isLoggedin : {$set: true}
                }
            });

        case (types.LOGIN_FAILED) :
            return update(state, {
                login : {
                    status : {$set: "FAILED"},
                    error : {$set: action.error}
                }
            });

        case (types.LOGIN_RESET) :
            return update(state, {
                login : {
                    error : {$set: -1}
                }
            });

        case (types.TOKEN_CHECK_SUCCESS) :
            return update(state, {
                login : {
                    nickname : {$set: action.info.nickname},
                    admin : {$set: action.info.admin}
                },
                token : {
                    isLoggedin : {$set : true}
                }
            });

        case (types.TOKEN_CHECK_FAILED) :
            return update(state, {
                token : {
                    isLoggedin : {$set: false}
                }
            });

        default:
            return state;
    };
};


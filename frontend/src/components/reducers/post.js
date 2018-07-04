import * as types from "../actions/post/ActionTypes.js";
import update from "react-addons-update";

const initialState = {
    write : {
        status : "INIT"
    },
    load : {
        status : "INIT",
        posts : [],
        exactpost : ""
    },
    page : {
        totalpage: 0,
        currentpage : 1
    }
};

export default function post(state = initialState, action){
    switch(action.type){

        default :
            return state;

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
                    posts : {$set: action.load}
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
                    exactpost : {$set: action.post}
                }
            });

        case(types.POST_PAGINATION) :
            return update(state, {
                page : {
                    totalpage : {$set: action.pagination}
                }
            });

        case(types.POST_CURRENTPAGE) :
            return update(state, {
                page : {
                    currentpage : {$set: action.page}
                }
            });

        case(types.POST_NEXTPAGE):
            return update(state, {
                page : {
                    currentpage : {$set: state.page.currentpage + 1}
                }
            });

        case(types.POST_BRING):
            return update(state, {
                load : {
                    status : {$set: "WAIT"}
                }
            });

        case(types.POST_BRING_SUCCESS):
            return update(state, {
                load : {
                    status : {$set: "SUCCESS"},
                    posts : {$set: action.bring}
                }
            });

        case(types.POST_BRING_FAILED):
            return update(state, {
                load : {
                    status : {$set: "FAILED"}
                }
            });

        case(types.POST_PREVIOUS) :
            return update(state, {
                page : {
                    currentpage : {$set: state.page.currentpage-1}
                }
            });

        case(types.POST_CATEGORY_PAGINATION) :
            return update(state, {
                page : {
                    totalpage : {$set: action.pagination}
                }
            });
    }
};
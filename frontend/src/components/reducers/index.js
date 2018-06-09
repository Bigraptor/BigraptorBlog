import menu from "./menu.js";
import showlogin from "./showlogin.js";
import account from "./account.js";
import post from "./post.js";
import { combineReducers } from "redux";

const reducers = combineReducers({
    menu, showlogin, account, post
});

export default reducers;
import menu from "./menu.js";
import showlogin from "./showlogin.js";
import { combineReducers } from "redux";

const reducers = combineReducers({
    menu, showlogin
});

export default reducers;
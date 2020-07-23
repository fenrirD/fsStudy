import {combineReducers} from "redux"
import menu from "./menu";
import sampleReducer from "./sampleReducer";

// 등록한 reducer 합쳐서  export -> configure.js 로

export default combineReducers({
    menu,
    sampleReducer
    
})






import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reduces from "./reducus.js";
export default createStore(reduces, applyMiddleware(thunk));
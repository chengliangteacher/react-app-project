import { combineReducers } from "redux"
const initstate = {
  tree: [],
  userInfo: {},
  token: ""
}


function userInfo(state = initstate, action) {
    switch(action.type) {
        case "MENU": {
            state.tree = action.data;
            return state
        }
        case "USERINFO": {
            state.userInfo = action.data;
            return state
        }
        case "TOKEN": {
            state.token = action.token;
            return state;
        }
        default: {
            return state
        }
    }
}


function baseData(state = { 
    areaData: [],
    planTypesData: [],
    foodTypesData: [],
    foodData: [],
    allAreaData: []
}, action) {
    switch(action.type) {
        case "AREADATA": {
            state.allAreaData = action.data;
            state.areaData = action.data.filter(item => Number(item.levelId) === 4)
            return state;
        }
        case "FOODDATA": {
            state.foodData = action.data;
            return state;
        }
        case "PLANTYPESDATA": {
            state.planTypesData = action.data;
            return state;
        }
        case "FOODTYPESDATA": {
            state.foodTypesData = action.data;
            return state;
        }
        default: {
            return state
        }
    }
}

export default combineReducers({ userInfo, baseData });
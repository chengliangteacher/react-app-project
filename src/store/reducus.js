import { combineReducers } from "redux"
const initstate = {
    tree: [],
    userInfo: {},
    token: ""
}


function userInfo(state = initstate, action) {
    switch (action.type) {
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
    switch (action.type) {
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

function manyTabs(state = {
    menutabs: [
    ],
    currentRoute: {
    }
}, action) {
    switch (action.type) {
        case "ADDMENU": {
            if (!state.menutabs.some(item => item.pathname === action.data.pathname)) {
                state.menutabs.push(action.data);
            }
            state.menutabs = state.menutabs.map(item => {
                item.isClose = true;
                return item
            })
            if (state.menutabs.length === 1) {
                state.menutabs[0].isClose = false
            }
            return state;
        }
        case "SETCURRENTROUTE": {
            state.currentRoute = action.data;
            return state;
        }
        case "DELETEMENU": {
            if (state.menutabs.length > 1) {
                let data = JSON.parse(JSON.stringify(state.menutabs));
                data = data.filter(item => item.pathname !== action.data.pathname);
                if (data.length === 1) {
                    data[0].isClose = false
                }
                return Object.assign({}, state, { menutabs: data })
            } else {
                return state
            }
        }
        default: {
            return state;
        }
    }
}


export default combineReducers({ userInfo, baseData, manyTabs });
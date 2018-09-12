import { combineReducers } from 'redux';

function noOperation(state = {}, action) {
    return state;
}

const rootReducer = combineReducers({
    noOperation,
});

export default rootReducer;

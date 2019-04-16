import { ADD_MESSAGE } from '../actions/actionTypes';

let initialState = {
    messages: []
};

function addMessage(state = initialState, action) {
    if(action.type === ADD_MESSAGE) {
        return Object.assign({}, state, {
            messages: state.messages.concat(action.payload)
        });
    }
    return state;
}

export default addMessage;
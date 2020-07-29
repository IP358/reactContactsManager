import { CREATE_CONTACT, EDIT_CONTACT, DELETE_CONTACT } from "../actions/types";
import _ from 'lodash';

const INITIAL_STATE = {
    // latestContact: null,
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type){
        case CREATE_CONTACT:
            return {...state, [action.payload.id]: action.payload }
        case DELETE_CONTACT:
            return _.omit(state, action.payload);
        case EDIT_CONTACT:
            return {...state, [action.payload.id]: action.payload }
        default:
            return state;
    }
}
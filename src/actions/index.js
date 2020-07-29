import { CREATE_CONTACT, DELETE_CONTACT, EDIT_CONTACT } from './types';

export const createContact = formValues => {
    return {
        type: CREATE_CONTACT,
        payload: formValues
    }
}
export const deleteContact = id => {
    return {
        type: DELETE_CONTACT,
        payload: id
    };
}
export const editContact = formValues => {
    return {
        type: EDIT_CONTACT,
        payload: formValues
    }
}

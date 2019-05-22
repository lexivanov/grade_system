import { actionTypes } from './modal-action-types';

export const showModal = (component) => dispatch => {
    dispatch(showModalAction(component));
};

export const hideModal = () => dispatch => {
    dispatch(hideModalAction());
};

const showModalAction = (payload) => ({
    type: actionTypes.showContent,
    payload
});

const hideModalAction = () => ({
    type: actionTypes.hideContent,
});
import { actionTypes } from './modal-action-types';

export const modalReducer = function (state = {
    content: undefined
}, action) {
    const payload = action.payload;

    switch (action.type) {
        case actionTypes.showContent: {
            return { content: payload };
        }
        case actionTypes.hideContent: {
            return { content: undefined };
        }
        default: {
            return { ...state };
        }
    }
}

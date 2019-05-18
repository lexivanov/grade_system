import { actionTypes } from '../constants';
import { AuthController } from '../../../services';

export const login = (user) => dispatch => {
    AuthController.login(user).then((resolve) => {
        dispatch(loginAction(resolve));
    }).catch((err) => setAuthError(err));
};

const loginAction = (payload) => ({
    type: actionTypes.login,
    payload
});

const setAuthError = (payload) => ({
    type: actionTypes.setError,
    payload
});
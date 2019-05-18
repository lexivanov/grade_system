import { actionTypes } from '../constants';
import { AuthController, UserController } from '../../../services';

export const login = (user) => dispatch => {
    AuthController.login(user)
    .then((resolve) => {
        dispatch(loginAction(resolve));
        window.sessionStorage.setItem('userId', resolve.id);
    })
    .catch((err) => setAuthError(err));
};


export const easyLogin = (id) => dispatch => {
    UserController.getByID(id)
    .then((resolve) => {
        dispatch(loginAction(resolve[0]));
    })
    .catch((err) => setAuthError(err));
};

export const logout = () => dispatch => {
    AuthController.logout()
    .then((resolve) => dispatch(logoutAction(resolve)))
    .catch((err) => dispatch(setAuthError(err)));
};


const loginAction = (payload) => ({
    type: actionTypes.login,
    payload
});

const logoutAction = (payload) => ({
    type: actionTypes.logout,
    payload
});

const setAuthError = (payload) => ({
    type: actionTypes.setError,
    payload
});
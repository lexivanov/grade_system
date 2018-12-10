import { actionTypes } from '../constants';
import { UserController } from '../../../services';

export const fetchUsersList = () => dispatch => {
    UserController.getAll().then((resolve) => {
        dispatch(loadUsers(resolve));
    }).catch(() => {});
};

export const fetchUserGrades = (id) => dispatch => {
    UserController.getGrades(id).then((resolve) => {
        dispatch(loadUserGrades(resolve));
    }).catch(() => {});
};

const loadUsers = (payload) => ({
    type: actionTypes.loadUsers,
    payload
});

const loadUserGrades = (payload) => ({
    type: actionTypes.loadUserGrades,
    payload
});

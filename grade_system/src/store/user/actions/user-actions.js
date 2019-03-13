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

export const deleteUser = (id) => dispatch => {
    UserController.delete(id).then((resolve) => {
        dispatch(deleteUserAction(id));
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

const deleteUserAction = (payload) => ({
    type: actionTypes.deleteUser,
    payload
});
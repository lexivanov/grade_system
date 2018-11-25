import { actionTypes } from '../constants';
import { UserController } from '../../../services';

export const fetchUsersList = () => dispatch => {
    UserController.getAll().then((resolve) => {
        dispatch(loadUsers(resolve));
    }).catch(() => {});
};

const loadUsers = (payload) => ({
    type: actionTypes.loadUsers,
    payload
});
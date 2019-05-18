import { actionTypes } from '../constants';
import { AuthController } from '../../../services';

export const getUser = () => dispatch => {
    AuthController.getUser().then((resolve) => {
        dispatch(getUserAction(resolve));
    }).catch(() => {});
};

const getUserAction = (payload) => ({
    type: actionTypes.getUser,
    payload
});
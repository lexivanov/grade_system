import { actionTypes } from '../constants';
import { api } from '../../../api';

export const fetchCategoryList = () => dispatch => {
    dispatch(spinnerOn());
    dispatch(startFetch());
    api.getCategoriesData().then((resolve) => {
        dispatch(loadCategories(resolve));
        dispatch(fetchSuccess());
        dispatch(spinnerOff());
    }).catch(() => {
        dispatch(fetchFail());
        dispatch(spinnerOff());
    });
};


export const addCategory = (newCategory) => dispatch => {
    dispatch(startAddCategory());
    api.addCategory(newCategory).then((resolve) => {
        dispatch(addCategoryAction(resolve));
        dispatch(successAddCategory());
    }).catch(() => {
        dispatch(failAddCategory());
    });
};

export const deleteCategory = (id) => dispatch => {
    dispatch(startDeleteCategory());
    api.deleteCategory(id).then((resolve) => {
        dispatch(deleteCategoryAction(resolve));
        dispatch(successDeleteCategory());
    }).catch(() => {
        dispatch(failDeleteCategory());
    });
};

export const editCategory = (newCategory) => dispatch => {
    dispatch(initEditCategory());
    api.editCategory(newCategory).then((resolve) => {
        dispatch(editCategoryAction(resolve.id, resolve.name));
        dispatch(successEditCategory());
    }).catch(() => {
        dispatch(failEditCategory());
    });
};

export const openCategory = (id) => dispatch => dispatch({ type: actionTypes.openCategory, payload: id });

export const openSubcategoryForm = (id) => dispatch => dispatch({ type: actionTypes.openSubcategoryForm, payload: id });

export const closeSubcategoryForm = () => dispatch => dispatch({ type: actionTypes.closeSubcategoryForm });

export const startEditCategory = (id) => dispatch => dispatch({ type: actionTypes.startEditCategory, payload: id });

export const finishEditCategory = () => dispatch => dispatch({ type: actionTypes.finishEditCategory });

const spinnerOn = () => ({ type: actionTypes.spinnerOn });

const spinnerOff = () => ({ type: actionTypes.spinnerOff });

const startFetch = () => ({ type: actionTypes.startFetch });

const fetchSuccess = () => ({ type: actionTypes.fetchSuccess });

const fetchFail = () => ({ type: actionTypes.fetchFail });

const startAddCategory = () => ({ type: actionTypes.startAddCategory });

const successAddCategory = () => ({ type: actionTypes.successAddCategory });

const failAddCategory = () => ({ type: actionTypes.failAddCategory });

const startDeleteCategory = () => ({ type: actionTypes.startDeleteCategory });

const successDeleteCategory = () => ({ type: actionTypes.successDeleteCategory });

const failDeleteCategory = () => ({ type: actionTypes.failDeleteCategory });

const initEditCategory = () => ({ type: actionTypes.initEditCategory });

const successEditCategory = () => ({ type: actionTypes.successEditCategory });

const failEditCategory = () => ({ type: actionTypes.failEditCategory });

const deleteCategoryAction = (id) => ({ type: actionTypes.deleteCategory, payload: id });

const addCategoryAction = (newCategory) => ({ type: actionTypes.addCategory, payload: newCategory });

const loadCategories = (payload) => ({ type: actionTypes.loadCategories, payload });

const editCategoryAction = (id, name) => ({ type: actionTypes.editCategory, payload: { id, name } });

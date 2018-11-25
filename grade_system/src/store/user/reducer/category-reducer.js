import { actionTypes } from '../constants';

export function categoryReducer(state = {
    categoryList: [],
    openedCategory: null
}, action) {
    const payload = action.payload;

    switch (action.type) {
        case actionTypes.loadCategories: {
            const { ...newState } = payload;

            return newState;
        }
        case actionTypes.openCategory: {
            const { ...newState } = state;
            const index = newState.categoryList.findIndex(item => item.id === payload);

            newState.categoryList[index].opened = !state.categoryList[index].opened;
            return newState;
        }
        case actionTypes.openSubcategoryForm: {
            const { ...newState } = state;

            newState.formOpened = (newState.formOpened === payload) ? null : payload;
            return newState;
        }
        case actionTypes.closeSubcategoryForm: {
            const { ...newState } = state;

            newState.formOpened = null;
            return newState;
        }
        case actionTypes.startEditCategory: {
            const { ...newState } = state;

            newState.categoryInEditMode = (state.categoryInEditMode === payload) ? null : payload;
            return newState;
        }
        case actionTypes.finishEditCategory: {
            const { ...newState } = state;

            newState.categoryInEditMode = null;
            return newState;
        }
        case actionTypes.editCategory: {
            const { ...newState } = state;

            if (payload.name === null || payload.name.trim() === '') {
                return newState;
            }
            const index = newState.categoryList.findIndex((item) => item.id === payload.id);

            newState.categoryList[index].name = payload.name;
            return newState;
        }
        case actionTypes.addCategory: {
            const { ...newState } = state;

            newState.categoryList.unshift(payload);
            if (payload.parentId !== null) {
                const index = newState.categoryList.findIndex(item => item.id === payload.parentId);

                newState.categoryList[index].opened = true;
            }
            return newState;
        }
        case actionTypes.deleteCategory: {
            const { ...newState } = state;

            newState.categoryList = newState.categoryList.filter(
                item => item.id !== payload
            );
            return newState;
        }
        default: {
            return { ...state };
        }
    }
}

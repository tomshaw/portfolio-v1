// ==========================================================================
// Actions
// ==========================================================================
import * as types from './actionTypes';

export function changeThemeSuccess(theme) {
    return { 
    	type: types.CHANGE_THEME_SUCCESS, 
    	theme
    };
}

export function changeThemeError(theme) {
    return { 
    	type: types.CHANGE_THEME_ERROR, 
    	theme
    };
}

export function changeTheme(theme) {
    return function (dispatch, getState) {
        dispatch(changeThemeSuccess(theme));
    };
}

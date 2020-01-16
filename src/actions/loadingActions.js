// ==========================================================================
// Actions
// ==========================================================================
import * as types from './actionTypes';

export function setAppLoading(loading) {
    return { 
    	type: types.APP_LOADING, 
    	payload: loading
    };
}
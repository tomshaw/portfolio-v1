// ==========================================================================
// Actions
// ==========================================================================
import * as types from './actionTypes';

export function loadSectionSuccess(section) {
    return {
        type: types.LOAD_SECTION_SUCCESS,
        section
    };
}

export function loadSectionError(response) {
    return {
        type: types.LOAD_SECTION_FAIL,
        section: response
    };
}

export function loadSection() {
    return function (dispatch) {
        fetch('/api/section.json').then(res => res.json())
            .then(data => dispatch(loadSectionSuccess(data)))
            .catch(err => dispatch(loadSectionError(err)));
    };
}

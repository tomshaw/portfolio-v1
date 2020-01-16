// ==========================================================================
// Actions
// ==========================================================================
import * as types from './actionTypes';
import {loadEnabled} from '../base/utils';

export function loadGallerySuccess(gallery) {
    return { 
    	type: types.LOAD_GALLERY_SUCCESS, 
    	gallery
    };
}

export function loadGalleryError(response) {
    return { 
    	type: types.LOAD_GALLERY_FAIL, 
    	gallery: response
    };
}

export function loadGallery() {
    return function (dispatch) {
        fetch('/api/gallery.json').then(res => res.json())
            .then(data => dispatch(loadGallerySuccess(loadEnabled(data))))
            .catch(err => dispatch(loadGalleryError(err)));
    };
}

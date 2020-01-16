// ==========================================================================
// Combine Reducers
// ==========================================================================
import {combineReducers} from 'redux';

import loading from './loadingReducer';
import section from './sectionReducer';
import gallery from './galleryReducer';
import theme from './themeReducer';

const rootReducer = combineReducers({
    loading,
    section,
    gallery,
    theme
});

export default rootReducer;

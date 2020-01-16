/* ==========================================================================
 Reducer Theme
========================================================================== */
import * as types from '../actions/actionTypes';

export default function themeReducer(state = 'config', action) {
  switch (action.type) {
    case types.CHANGE_THEME_SUCCESS:
      return action.theme;
    default:
      return state;
  }
}
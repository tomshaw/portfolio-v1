/* ==========================================================================
 Reducer Loading
========================================================================== */
import * as types from '../actions/actionTypes';

export default function loadingReducer(state = true, action) {
  switch (action.type) {
    case types.APP_LOADING:
      return action.payload;
    default:
      return state;
  }
}
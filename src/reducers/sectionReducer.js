/* ==========================================================================
 Reducer Section 
========================================================================== */
import * as types from '../actions/actionTypes';

export default function sectionReducer(state = [], action) {
  switch (action.type) {
    case types.LOAD_SECTION_SUCCESS:
      return action.section;
    default:
      return state;
  }
}
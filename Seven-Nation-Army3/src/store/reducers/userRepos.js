import {
  ITEMS_IS_LOADING,
  ITEMS_FETCH_DATA_SUCCESS,
  ITEMS_HAS_ERRORED,
} from '../actions/actionTypes';

let initialState = {
  repos: [],
  isLoading: false,
  errors: [],
};

export default function userRepos(state = initialState, action) {
  switch (action.type) {
    case ITEMS_IS_LOADING:
      return Object.assign({}, state, {
        isLoading: true,
      });

    case ITEMS_HAS_ERRORED:
      return Object.assign({}, state, {
        isLoading: false,
        errors: action.errors,
      });

    case ITEMS_FETCH_DATA_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        repos: action.repos,
      });

    default:
      return state;
  }
}

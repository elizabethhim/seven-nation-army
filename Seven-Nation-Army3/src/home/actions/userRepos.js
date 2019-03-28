import {
  ITEMS_IS_LOADING,
	ITEMS_FETCH_DATA_SUCCESS,
  ITEMS_HAS_ERRORED
} from './actionTypes'

export function itemsHasErrored(errors) {
  return {
    type: 'ITEMS_HAS_ERRORED',
    errors
  };
}
export function itemsIsLoading(bool) {
  return {
    type: 'ITEMS_IS_LOADING',
    isLoading: bool
  };
}
export function itemsFetchDataSuccess(repos) {
  return {
    type: 'ITEMS_FETCH_DATA_SUCCESS',
    repos
  };
}

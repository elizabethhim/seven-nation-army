import {
  itemsHasErrored,
  itemsIsLoading,
  itemsFetchDataSuccess
} from '../actions/userRepos';

// A thunk is a function that returns a function.
// get user repos
function getUserRepos(forUser) {
  return function (dispatch) {
    dispatch(itemsIsLoading(true));
    const url = `https://api.github.com/users/${forUser}/repos`
    return fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        dispatch(itemsIsLoading(false));
        return response;
      })
      .then((response) => response.json())
      .then((items) => dispatch(itemsFetchDataSuccess(items)))
      .catch((error) => dispatch(itemsHasErrored(error)));
  };
}

export default getUserRepos;
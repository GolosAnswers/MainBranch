import {MAP_FETCH_GOLOS_BLOG, SUCCESS, FAILURE} from './fetchPostsActions'
import { takeEvery, call, put } from 'redux-saga/effects'
import {fetchGolosBlog} from "./fetchPostsApi";

export function fetchGolosBlogApi (data) {
  return fetchGolosBlog(data)
    .then(data => {
      return { response: data }
    })
    .catch(err => {
      return err
    })
}

export function * tryFetchGolosBlogApi (data) {
    const { response, error } = yield call(fetchGolosBlogApi, data);
    if (response) {
      yield put({ type: MAP_FETCH_GOLOS_BLOG + SUCCESS, response })
    } else {
      yield put({ type: MAP_FETCH_GOLOS_BLOG + FAILURE, error })
    }

}

export function * fetchPosts () {
  yield takeEvery(MAP_FETCH_GOLOS_BLOG, tryFetchGolosBlogApi)
}

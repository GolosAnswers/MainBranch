import { takeEvery, call, put } from 'redux-saga/effects'
import { fetchSinglePost, fetchSinglePostComments } from "./singlePostApi";
import { FETCH_GOLOS_SINGLE_POST_POST, FETCH_GOLOS_SINGLE_POST_COMMENTS, SUCCESS, FAILURE  } from './singlePostActions'

export function fetchSinglePostApi (data) {
  return fetchSinglePost(data)
    .then(data => {
      return { response: data }
    })
    .catch(err => {
      return err
    })
}

export function * trySinglePostApi (data) {
  const { response, error } = yield call(fetchSinglePostApi, data);

  if (response) {
    yield put({ type: FETCH_GOLOS_SINGLE_POST_POST + SUCCESS, response })
  } else {
    yield put({type: FETCH_GOLOS_SINGLE_POST_POST + FAILURE, response})
  }

}

export function * singlePostFetch () {
  yield takeEvery(FETCH_GOLOS_SINGLE_POST_POST, trySinglePostApi)
}



export function fetchSinglePostCommentsApi (data) {
  return fetchSinglePostComments(data)
    .then(data => {
      return { response: data }
    })
    .catch(err => {
      return err
    })
}

export function * trySinglePostCommentsApi (data) {
  const { response, error } = yield call(fetchSinglePostCommentsApi, data);

  if (response) {
    yield put({ type: FETCH_GOLOS_SINGLE_POST_COMMENTS + SUCCESS, response })
  } else {
    yield put({ type: FETCH_GOLOS_SINGLE_POST_COMMENTS + FAILURE, error })
  }

}

export function * singlePostCommentsFetch () {
  yield takeEvery(FETCH_GOLOS_SINGLE_POST_COMMENTS, trySinglePostCommentsApi)
}

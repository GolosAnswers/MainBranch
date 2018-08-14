import { takeEvery, call, put } from 'redux-saga/effects'
import { leavePost } from "./leavePostApi";
import { LEAVE_POST, SUCCESS, FAILURE } from './leavePostActions'

export function fetchLeavePostApi (data) {
  return leavePost(data)
    .then(data => {
      return { response: data }
    })
    .catch(err => {
      return err
    })
}

export function * tryFetchLeavePost (data) {
    const { response, error } = yield call(fetchLeavePostApi, data);
    if (response) {
      yield put({ type: LEAVE_POST + SUCCESS, response })
    } else {
      yield put({ type: LEAVE_POST + FAILURE, error })
    }

}

export function * fetchLeavePost () {
  yield takeEvery(LEAVE_POST, tryFetchLeavePost)
}

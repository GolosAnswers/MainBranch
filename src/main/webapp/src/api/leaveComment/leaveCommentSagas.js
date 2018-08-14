import { takeEvery, call, put } from 'redux-saga/effects'
import { leaveComment } from "./leaveCommentApi";
import { LEAVE_COMMENT, SUCCESS, FAILURE } from './leaveCommentActions'

export function fetchLeaveCommentApi (data) {
  return leaveComment(data)
    .then(data => {
      return { response: data }
    })
    .catch(err => {
      return err
    })
}

export function * tryFetchLeaveComment (data) {
    const { response, error } = yield call(fetchLeaveCommentApi, data);
    if (response) {
      yield put({ type: LEAVE_COMMENT + SUCCESS, response })
    } else {
      yield put({ type: LEAVE_COMMENT + FAILURE, error })
    }

}

export function * fetchLeaveComment () {
  yield takeEvery(LEAVE_COMMENT, tryFetchLeaveComment)
}

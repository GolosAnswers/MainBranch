import { takeEvery, call, put } from 'redux-saga/effects'
import {getMyQuestions} from "./myQuestionsApi";
import { FETCH_MY_QUESTIONS, SUCCESS, FAILURE } from './myQuestionsActions'

export function fetchMyQuestionsApi (data) {
  return getMyQuestions(data)
    .then(data => {
      return { response: data }
    })
    .catch(err => {
      return err
    })
}

export function * tryFetchMyQuestionsApi (data) {
    const { response, error } = yield call(fetchMyQuestionsApi, data);
    if (response) {
      yield put({ type: FETCH_MY_QUESTIONS + SUCCESS, response })
    } else {
      yield put({ type: FETCH_MY_QUESTIONS + FAILURE, error })
    }

}

export function * fetchMyQuestions () {
  yield takeEvery(FETCH_MY_QUESTIONS, tryFetchMyQuestionsApi)
}

import { fork } from 'redux-saga/effects'

import { loginAuthFetch, loginWithGolos } from '../api/login/loginSagas'
import { fetchPosts } from "../api/fetchPosts/fetchPostsSagas";
import { singlePostFetch, singlePostCommentsFetch } from "../api/singlePost/singlePostSagas"
import { fetchMyQuestions } from "../api/myQuestions/myQuestionsSagas"
import { fetchLeavePost } from "../api/leavePost/leavePostSagas"
import { fetchLeaveComment } from "../api/leaveComment/leaveCommentSagas"

// Your sagas for this container
export default function * rootSaga () {
  yield [
    fork(fetchPosts),
    fork(loginAuthFetch),
    fork(loginWithGolos),
    fork(singlePostFetch),
    fork(singlePostCommentsFetch),
    fork(fetchMyQuestions),
    fork(fetchLeavePost),
    fork(fetchLeaveComment),
  ]
}

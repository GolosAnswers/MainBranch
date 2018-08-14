import { combineReducers } from 'redux'
import { loadingBarReducer } from 'react-redux-loading-bar'
import locationReducer from './location'
import loginReducer from '../api/login/loginReducer'
import flashReducer from '../api/flash/flashReducer'
import fetchPosts from '../api/fetchPosts/fetchPostsReducer'
import fetchFilteringAndOrderingReducer from '../api/fetchPosts/fetchFilteringAndOrderingReducer'
import leavePostReducer from '../api/leavePost/leavePostReducer'
import leaveCommentReducer from "../api/leaveComment/leaveCommentReducer";
import singlePostReducer from "../api/singlePost/singlePostReducer";
import myQuestionsReducer from "../api/myQuestions/myQuestionsReducer";
import fetchFilteringAndOrderingReducerMyQuestions from "../api/myQuestions/fetchFilteringAndOrderingReducerMyQuestions";

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    gridData: fetchPosts,
    lastQuastion: leavePostReducer,
    location: locationReducer,
    loadingBar: loadingBarReducer,
    auth: loginReducer,
    flashMessages: flashReducer,
    singlePostData: singlePostReducer,
    myQuestions: myQuestionsReducer,
    lastComment: leaveCommentReducer,
    postsFilteringAndOrdering: fetchFilteringAndOrderingReducer,
    myQuestionsFilteringAndOrdering: fetchFilteringAndOrderingReducerMyQuestions,
    ...asyncReducers
  })
};

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return;

  store.asyncReducers[key] = reducer;
  store.replaceReducer(makeRootReducer(store.asyncReducers))
};

export default makeRootReducer

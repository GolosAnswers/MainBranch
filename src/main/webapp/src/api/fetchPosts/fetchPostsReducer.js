import {MAP_FETCH_GOLOS_BLOG, SUCCESS, FAILURE} from './fetchPostsActions'

const initialState = null;

const fetchPostsReducer = (state = initialState, action) => {
  switch (action.type) {
    case MAP_FETCH_GOLOS_BLOG + SUCCESS:
      return { ...action.response.result, httpStatus: action.response.httpStatus }

    case MAP_FETCH_GOLOS_BLOG + FAILURE:
      return { content: [], httpStatus: 500 }

    default:
      return state
  }
};

export default fetchPostsReducer

import { FETCH_GOLOS_SINGLE_POST_POST, FETCH_GOLOS_SINGLE_POST_COMMENTS, SUCCESS, FAILURE } from './singlePostActions'

const initialState = {
  singlePostPagePost: null,
  singlePostPageComment: null,
};

const singlePostReducer = (state = initialState, action) => {

  switch (action.type) {

    case FETCH_GOLOS_SINGLE_POST_POST + SUCCESS:
      return { singlePostPagePost: action.response, singlePostPageComment: state.singlePostPageComment };

    case FETCH_GOLOS_SINGLE_POST_POST + FAILURE:
      return {
        state
      };

    case FETCH_GOLOS_SINGLE_POST_COMMENTS + SUCCESS:
      return { singlePostPagePost: state.singlePostPagePost, singlePostPageComment: action.response };

    case FETCH_GOLOS_SINGLE_POST_COMMENTS + FAILURE:
      return {
        state
      };

    default:
      return state
  }
};

export default singlePostReducer

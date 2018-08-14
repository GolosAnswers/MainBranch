import { FETCH_MY_QUESTIONS, SUCCESS, FAILURE } from './myQuestionsActions'

const initialState = null;

const myQuestionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MY_QUESTIONS + SUCCESS:
      return  action.response;

    case FETCH_MY_QUESTIONS + FAILURE:
      return {
        state
      };
    default:
      return state
  }
};

export default myQuestionsReducer

import { LEAVE_COMMENT, SUCCESS, FAILURE } from './leaveCommentActions'
import { PAGE_STATUS_200, PAGE_STATUS_500 } from "../../properties/properties";

const initialState = null;

const leaveCommentReducer = (state = initialState, action) => {
  switch (action.type) {
    case LEAVE_COMMENT + SUCCESS:
      return  {...action.response, PAGE_STATUS_200: PAGE_STATUS_200,};

    case LEAVE_COMMENT + FAILURE:
      return {
        state,
        PAGE_STATUS_500: PAGE_STATUS_500,
      };

    default:
      return state
  }
};

export default leaveCommentReducer

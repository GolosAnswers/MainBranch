import { LEAVE_POST, SUCCESS, FAILURE } from './leavePostActions'
import { PAGE_STATUS_200, PAGE_STATUS_500 } from "../../properties/properties";

const initialState = null;

const leavePostReducer = (state = initialState, action) => {
  switch (action.type) {
    case LEAVE_POST + SUCCESS:
      return  {...action.response, PAGE_STATUS_200: PAGE_STATUS_200,};

    case LEAVE_POST + FAILURE:
      return {
        state,
        PAGE_STATUS_500: PAGE_STATUS_500,
      };

    default:
      return state
  }
};

export default leavePostReducer

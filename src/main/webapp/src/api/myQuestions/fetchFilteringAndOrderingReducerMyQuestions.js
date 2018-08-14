import { SAVE_FILTERING_AND_ORDERING_DATA } from '../fetchPosts/fetchPostsActions';
import { DEFAULT_FILTERING_PARAMETERS } from '../../properties/properties'

const initialState = {
  filteringAndOrderingData: {

    page: DEFAULT_FILTERING_PARAMETERS.page,
    size: DEFAULT_FILTERING_PARAMETERS.size,
  }
};

export default (state = initialState, action = {}) => {

  switch(action.type) {

    case SAVE_FILTERING_AND_ORDERING_DATA:
      return {
        ...state,
        filteringAndOrderingData: action.data
      };

    default: return state;
  }
}

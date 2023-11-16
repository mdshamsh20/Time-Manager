import { ACTIONS } from "./newTypes";

const initialState = {
  isNewOpen: false,
};

const newReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.OPEN_NEW:
      return {
        isNewOpen: true,
      };
    case ACTIONS.CLOSE_NEW:
      return {
        isNewOpen: false,
      };

    default:
      return state;
  }
};

export default newReducer;

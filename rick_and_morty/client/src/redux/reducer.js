import { ADD_FAVORITE, REMOVE_FAVORITE } from "./action";
//import axios from 'axios';

const initialState = {
  myFavorites: [],
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_FAVORITE:
      return { ...state, myFavorites: payload, allCharacters: payload };

    case REMOVE_FAVORITE:
      return { ...state, myFavorites: payload, allCharacters: payload };

    default:
      return { ...state };
  }
};

export default rootReducer;

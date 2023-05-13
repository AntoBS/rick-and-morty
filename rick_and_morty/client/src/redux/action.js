import axios from 'axios';
export const ADD_FAVORITE = "ADD_FAVORITE";
export const REMOVE_FAVORITE = "REMOVE_FAVORITE";

export const addFavorite = (character) => {
  //return{type:ADD_FAVORITE, payload:character };
  const endpoint = "http://localhost:3001/rickandmorty/fav";
  return async (dispatch) => {
    try {
      const { data } = await axios.post(endpoint, character);

      if(!data.length) throw Error('No hay favoritos');

      return dispatch({
        type: ADD_FAVORITE,
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const removeFavorite = (id) => {
  //return{type:REMOVE_FAVORITE, payload:id };
  const endpoint = `http://localhost:3001/rickandmorty/fav/${id}`;
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(endpoint);

      //if(!data) throw Error ('No hay favoritos');

      return dispatch({
        type: REMOVE_FAVORITE,
        payload: data,
      });
      
    } catch (error) {
      console.log(error.message);
    }
    
  };
};


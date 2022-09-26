import axios from "axios";

export const LOADING_POKEMONS = "LOADING_POKEMONS";
export const GET_POKEMONS = "GET_POKEMONS";
export const GET_POKEMON_BY_NAME = "GET_POKEMON_BY_NAME";
export const POST_POKEMON = "POST_POKEMON";
export const RESET_POKEMON_CREATED = "RESET_POKEMON_CREATED";
export const GET_TYPES = "GET_TYPES";
export const FILTER_BY_TYPE = "FILTER_BY_TYPE";
export const FILTER_BY_APY_DB = "FILTER_BY_APY_DB";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const ORDER_BY_HP = "ORDER_BY_HP";
export const GET_DETAIL = "GET_DETAIL";
export const CLEAN_DETAIL = "CLEAN_DETAIL"

export const getPokemons = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: LOADING_POKEMONS,
      });
      const pokemons = await axios.get(`http://localhost:3001/pokemons`);
      return dispatch({
        type: GET_POKEMONS,
        payload: pokemons.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const getPokemonByName = (name) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: LOADING_POKEMONS,
      });

      const pokemon = await axios.get(`http://localhost:3001/pokemons?name=${name}`);
      return dispatch({
        type: GET_POKEMON_BY_NAME,
        payload: pokemon.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const getDetail = (id) => {
  return async (dispatch) => {
    try{
      const detail = await axios(`http://localhost:3001/pokemons/${id}`)
        dispatch({
          type: GET_DETAIL,
          payload: detail.data,
        });
    }
    catch(err){
      console.log(err);
    }
  }
};

export const cleanDetail = () => {
  return (dispatch) => {
    dispatch({
      type: CLEAN_DETAIL
    })
  }
}

export const postPokemon = (input) => {
  return async (dispatch) => {
    try {
      const pokemon = await axios.post(`http://localhost:3001/pokemons`, input);
      // console.log(pokemon.data);
      dispatch({
        type: POST_POKEMON,
        payload: pokemon.data,
      });
    } catch (err) {
      alert(`El pokemon ${input.name} ya existe, ingrese otro`);
      console.log({ error: err.message });
    }
  };
};

export const resetPokemonCreated = () => {
  return {
    type: RESET_POKEMON_CREATED, // pasa pokemonCreated a FALSE
  };
};

export const getTypes = () => {
  return async (dispatch) => {
    const info = await axios(`http://localhost:3001/types`);
    console.log(info.data);
    dispatch({
      type: GET_TYPES,
      payload: info.data,
    });
  };
};

export const filterByType = (type) => {
  return {
    type: FILTER_BY_TYPE,
    payload: type,
  };
};

export const filterByApiDb = (payload) => {
  return {
    type: FILTER_BY_APY_DB,
    payload,
  };
};

export const orderByName = (payload) => {
  return {
    type: ORDER_BY_NAME,
    payload,
  };
};
export const orderByHp = (payload) => {
  return {
    type: ORDER_BY_HP,
    payload,
  };
};

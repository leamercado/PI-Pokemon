import {
  FILTER_BY_APY_DB,
  FILTER_BY_TYPE,
  GET_POKEMONS,
  GET_POKEMON_BY_NAME,
  RESET_POKEMON_CREATED,
  POST_POKEMON,
  GET_TYPES,
  ORDER_BY_NAME,
  ORDER_BY_HP,
  GET_DETAIL,
  LOADING_POKEMONS,
  CLEAN_DETAIL,
} from "./actions";

const initialState = {
  pokemons: [],
  allPokemons: [],
  types: [],
  detail: [],
  loading: true,
  pokemonCreated: false,
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {


    case LOADING_POKEMONS: 
    return {
      ...state,
      loading: true,
    }

    case GET_POKEMONS:
      return {
        ...state,
        pokemons: action.payload,
        allPokemons: action.payload,
        loading:false,
      };

    case GET_POKEMON_BY_NAME:
      return {
        ...state,
        pokemons:action.payload,
        loading: false
      }
    
    case GET_TYPES:
      return {
        ...state,
        types: action.payload,
      };

      
    case GET_DETAIL:
        return {
          ...state,
          detail: action.payload,
        };

    case CLEAN_DETAIL:
      return{
        ...state,
        detail:[]
      }

        case POST_POKEMON : 
            console.log("poke creado: ",action.payload);
            return {
              ...state,
              pokemonCreated:true,
          }

        case RESET_POKEMON_CREATED :  // para renderizar texto para confirmar creacion
          return {
            ...state,
            pokemonCreated: false,
          }

    case FILTER_BY_TYPE:
      const filteredPokemons = state.allPokemons.filter((el) =>
        el.types.includes(action.payload)).concat(state.allPokemons.filter(el => el.types.find(type=> type.name === action.payload)))
      
      return {
        ...state,
        pokemons: action.payload === "all" ? state.allPokemons : filteredPokemons,
      };

    case FILTER_BY_APY_DB:
      const createdPokemons =
        action.payload === "api"
          ? state.allPokemons.filter((el) => !el.createdInDb)
          : state.allPokemons.filter((el) => el.createdInDb);
      return {
        ...state,
        pokemons: action.payload === "all" ? state.allPokemons : createdPokemons,
      };

    case ORDER_BY_NAME:
      const ordenPokemons =
        action.payload === "nameAsc"
          ? state.pokemons.sort((a, b) => {
              if (a.name > b.name) {
                return 1;
              }
              if (a.name < b.name) {
                return -1;
              }
              return 0;
            })
          : state.pokemons.sort((a, b) => {
              if (a.name > b.name) {
                return -1;
              }
              return 0;
            });

      return {
        ...state,
        pokemons: ordenPokemons,
      };

    case ORDER_BY_HP:
      const orderHp =
        action.payload === "hpAsc"
          ? state.pokemons.sort((a, b) => {
              if (a.hp > b.hp) {
                return 1;
              }
              if (a.hp < b.hp) {
                return -1;
              }
              return 0;
            })
          : state.pokemons.sort((a, b) => {
              if (a.hp > b.hp) {
                return -1;
              }
              return 0;
            });
      return {
        ...state,
        pokemons: orderHp,
      };

    default:
      return state;
  }
}

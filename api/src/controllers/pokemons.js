const axios = require("axios");
require("dotenv").config();
const { API_URL } = process.env;

const allPokemons = async (req, res, next) => {
  const api = await axios.get(API_URL)
  
  let array = []
  const pokemons1 = api.data.results.map(el => el.url)
  const api2 = await axios (api.data.next);
  array.push(pokemons1.concat(api2.data.results?.map(el => el.url)))
  
  
  res.send(array.flat())

  const promisesArray = array.forEach( el => await axios(el))
console.log(promisesArray);
  Promise.all(promisesArray)
  .then(pokemons => res.send(pokemons))

// el Promise.all itera sobre un arreglo de promesas
// en una constante voy a guardar lo que me devuelve el (arreglo de promesas mapeado ) 
  

//   me devuelve los 1eros 20, pero quiero traer 40, por lo que voy a guardarlos en un array, y después hago un .next, para completar los 40.
// de cada uno de los pokemons, tengo que hacer otra req para traerme los datos de c/u
};

module.exports = { allPokemons };

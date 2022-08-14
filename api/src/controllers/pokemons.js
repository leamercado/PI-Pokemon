const axios = require("axios");
require("dotenv").config();
const { API_URL } = process.env;
const { Pokemon, Type } = require("../db");

const allPokemons = async (req, res, next) => {
  const api = await axios.get(API_URL);
  const pokemonsDb = await Pokemon.findAll({ include: Type });

  //   me devuelve los 1eros 20, pero quiero traer 40, por lo que voy a guardarlos en un array, y después hago un .next, para completar los 40.
  // de cada uno de los pokemons, tengo que hacer otra req para traerme los datos de c/u

  let array = [];
  const api1 = api.data.results.map((el) => el.url);
  const api2 = await axios(api.data.next);
  array.push(api1.concat(api2.data.results.map((el) => el.url)));

  const pokemonsApi = await Promise.all(
    array.flat().map(async (el) => {
      const pokemon = await axios(el);
      return {
        id: pokemon.data.id,
        name: pokemon.data.name,
        hp: pokemon.data.stats[0].base_stat,
        attack: pokemon.data.stats[1].base_stat,
        defense: pokemon.data.stats[2].base_stat,
        speed: pokemon.data.stats[5].base_stat,
        height: pokemon.data.height,
        weight: pokemon.data.weight,
        image: pokemon.data.sprites.other.home.front_default,
        types: pokemon.data.types.map((el) => el.type.name),
      };
    })
  );

  // el Promise.all itera sobre un arreglo de promesas
  // en una constante voy a guardar lo que me devuelve el (arreglo de promesas mapeado )

  const pokemons = [...pokemonsApi, ...pokemonsDb];

  return pokemons;
};

const getPokemons = async (req, res, next) => {
  const { name } = req.query;

  const pokemons = await allPokemons();

  if (!name) {
    res.send(pokemons);
  } else {
    const pokemonByName = pokemons.filter(
      (el) => el.name == name.toLowerCase()
    );
    res.json(
      pokemonByName ? pokemonByName : "No se encontró el pokemon buscado"
    );
  }
};

const getById = async (req, res, next) => {
  const { id } = req.params;

  let pokemonFound;
  if (id.length > 6) {
    pokemonFound = await Pokemon.findByPk(id);
  } else {
    let pokemon = await axios(API_URL + id);
    let poke = await pokemon.data;
    pokemonFound = {
      id: poke.id,
      name: poke.name,
      hp: poke.stats[0].base_stat,
      attack: poke.stats[1].base_stat,
      defense: poke.stats[2].base_stat,
      speed: poke.stats[5].base_stat,
      height: poke.height,
      weight: poke.weight,
      image: poke.sprites.other.home.front_default,
      types: poke.types.map((el) => el.type.name),
    };
  }
  res.json(pokemonFound);
};

// requerir id , llamar a la funcion p/ que traiga todos
//

const postPokemons = async (req, res, next) => {
  const { name, hp, attack, defense, speed, height, weight, image, type } =
    req.body;

  try {
    const pokemons = await allPokemons();
    
    if (name){ // si ingrese name por body
      let pokeExist = pokemons.find(el => el.name == name)
      
      if (!pokeExist){
        
        const pokemon = await Pokemon.create({
          //en .create no uso where
          name,
          hp,
          attack,
          defense,
          speed,
          height,
          weight,
          image,
          createdInDb: true,
        });
        
        const typeDb = await Type.findAll({
          where: {
            name:type
          }
        })
        
        await pokemon.setTypes(typeDb);
        
        res.status(201).send(pokemon); // MEJORAR LOGICA EN BASE DE DATOS
        // FLOW DEL CODIGO
      }

      res.status(404).send("El pokemon ya encontraba ingresado")
    
    } else {
      res.status(404).send("Debe ingresar un nombre, es obligatorio")
    }
      
    
  } catch (err) {
    next(err);
  }
};

module.exports = { allPokemons, getPokemons, getById, postPokemons };

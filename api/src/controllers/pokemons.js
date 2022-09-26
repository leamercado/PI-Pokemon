const axios = require("axios");
require("dotenv").config();
const { API_URL } = process.env;
const { Pokemon, Type } = require("../db");

const allPokemons = async (req, res, next) => {
  // traigo todos ,desde api y db con tabla relac
  const pokemonsDb = await Pokemon.findAll({
    include: {
      model: Type,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });

  try {
    let url = "https://pokeapi.co/api/v2/pokemon/";
    let array = [];
    do {
      let api = await axios.get(url);
      let pokemonesApi = api.data;
      let auxPokes = api.data.results.map((el) => {
        return {
          name: el.name,
          url: el.url,
        };
      });

      array.push(...auxPokes);
      url = pokemonesApi.next;
    } while (array.length < 20 && url != null);

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

  } catch (err) {
    console.log(err.message);
  }
};


const getPokemons = async (req, res, next) => {
  // GET. Si no se pasa nombre, envío todos, ya ordenados
  const { name } = req.query;

  try {
    const pokemons = await allPokemons();

    if (!name) {
      res.send(pokemons.sort((a, b) => (a.name > b.name ? 1 : -1)));
    } else {
      const pokemonByName = pokemons.filter(
        (el) => el.name.toLowerCase() === name.toLowerCase()
      );

      pokemonByName.length // usar el .length
        ? res.status(200).send(pokemonByName)
        : res.status(200).json([]);
    }
  } catch (err) {
    console.log(err);
  }
};

const getById = (req, res, next) => {
  // si está en db find por la primaryKey
  // sino hago solicitud a la api, con el id,  para que lo traiga, buscando solo los datos que necesito para el detalle
  const { id } = req.params;

  if (id.length > 6) {
    Pokemon.findByPk(id, {
      include: [
        {
          model: Type,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      ],
    })
      .then((pokemon) => res.json(pokemon))
      .catch((err) => console.log({ error: err.message }));
  } else {
    axios(API_URL + id)
      .then((res) => res.data)
      .then((poke) => {
        return {
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
      })
      .then((pokemon) => res.json(pokemon))
      .catch((err) => console.log({ error: err.message }));
  }
};

const postPokemons = async (req, res, next) => {
  const { name, hp, attack, defense, speed, height, weight, image, types } =
    req.body;

  try {
    const pokemons = await allPokemons();

    if (name) {
      // si ingrese name por body
      let pokeExist = pokemons.find((el) => el.name == name);
      if (!pokeExist) {
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
        });
        const typeDb = await Type.findAll({
          where: {
            name: types,
          },
        });
        await pokemon.setTypes(typeDb);
        res.status(201).send(pokemon);
      }
      // si pokeExiste ->
      res.status(404).send("El pokemon ya encontraba ingresado");
    } else {
      // si no ingresó el nombre
      res.status(404).send("Debe ingresar un nombre, es obligatorio");
    }
  } catch (err) {
    next(err);
  }
};

const getDetailTypes = (req,res,next) => {
  res.send("hola estoy en pokemons / types")
}

module.exports = { allPokemons, getPokemons, getById, postPokemons , getDetailTypes};

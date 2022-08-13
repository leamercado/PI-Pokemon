const {Pokemon, Type} = require("../db")
const axios = require ("axios");
const { allPokemons } = require("./pokemons");

const getTypes = async (req,res,next) => {
      const typesPokemons = await axios("https://pokeapi.co/api/v2/type");

      const types = typesPokemons.data.results.map(el => el.name).join().split(",")
      // mapeo el arreglo de pokemones para extraer solo los types , hago un set para que no se repitan, y aplano el array

      types.forEach( el => {
            Type.findOrCreate({
                  where: {
                        name:el
                  }
            })
      })

      const typesDb = await Type.findAll()

      res.send( typesDb)

}

module.exports = {getTypes}

// me traigo pokes de la api, los mapeo, obteniendo solo los types, hago un set
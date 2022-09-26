const {Pokemon, Type} = require("../db")
const axios = require ("axios");

const getTypes = async (req,res,next) => {
      const typesPokemons = await axios("https://pokeapi.co/api/v2/type");
      const types = typesPokemons.data.results.map(el => el.name)
      
      // console.log(types)

      types.forEach( type => {
            Type.findOrCreate({
                  where: {
                        name:type
                  }
            })
      })

      const typesDb = await Type.findAll()

      res.send( typesDb)

}

module.exports = {getTypes}

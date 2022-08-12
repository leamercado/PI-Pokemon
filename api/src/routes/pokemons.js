const {Router} = require ("express");
const  {allPokemons}  = require("../controllers/pokemons");

const router = Router ();

router.get("/", allPokemons)

module.exports = router
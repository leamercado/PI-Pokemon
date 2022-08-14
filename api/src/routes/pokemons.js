const { Router } = require("express");
const { getPokemons, getById , postPokemons} = require("../controllers/pokemons");

const router = Router();

router.get("/", getPokemons);
router.get("/:id", getById);
router.post("/",postPokemons)

module.exports = router;

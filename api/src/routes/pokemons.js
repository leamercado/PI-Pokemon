const { Router } = require("express");
const { getPokemons, getById , postPokemons , getDetailTypes} = require("../controllers/pokemons");

const router = Router();

router.get("/", getPokemons);
router.get("/:id", getById);
router.post("/",postPokemons)
router.get("/types", getDetailTypes)


module.exports = router;

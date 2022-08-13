const { Router } = require("express");
const { getPokemons, getById } = require("../controllers/pokemons");

const router = Router();

router.get("/", getPokemons);
router.get("/:id", getById);
// router.post()

module.exports = router;

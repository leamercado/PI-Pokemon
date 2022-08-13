const { Router } = require('express');
const pokemonsRouter = require("./pokemons")
const typesRouter = require("./types")
// Importar todos los routers;


const router = Router();

// Configurar los routers
router.use('/pokemons', pokemonsRouter);
router.use('/types', typesRouter);



module.exports = router;

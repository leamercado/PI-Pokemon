const { Router } = require('express');
const pokemonsRouter = require("./pokemons")
// Importar todos los routers;


const router = Router();

// Configurar los routers
router.use('/pokemons', pokemonsRouter);


module.exports = router;

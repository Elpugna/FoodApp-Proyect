const { Router } = require('express');
const {Recipe, Diet} = require('../db');
const axios = require('axios');
require('dotenv').config();
const {API_KEY} = process.env;
const {Op} = require('sequelize');
const {getRecipes} = require('./getRecipes');
const {getRecipeById} = require('./getRecipeById');
const {getTypes} = require('./getTypes');
const {postRecipe} = require('./postRecipe');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


// [ ] GET /recipes?name="...":
// Obtener un listado de las recetas que contengan la palabra ingresada como query parameter
// Si no existe ninguna receta mostrar un mensaje adecuado
router.route('/recipes').get(getRecipes)

// [ ] GET /recipes/{idReceta}:
// Obtener el detalle de una receta en particular
// Debe traer solo los datos pedidos en la ruta de detalle de receta
// Incluir los tipos de dieta asociados
router.route('/recipes/:idReceta').get(getRecipeById)

// [ ] GET /types:
// Obtener todos los tipos de dieta posibles
// En una primera instancia, cuando no exista ninguno, deberán precargar la base de datos con los tipos de datos indicados por spoonacular acá
router.route('/types').get(getTypes)

// [ ] POST /recipe:
// Recibe los datos recolectados desde el formulario controlado de la ruta de creación de recetas por body
// Crea una receta en la base de datos
router.route('/recipe').post(postRecipe);

module.exports = router;

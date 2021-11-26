const { Router } = require('express');
require('dotenv').config();
const {getRecipes} = require('./getRecipes');
const {getRecipeById} = require('./getRecipeById');
const {getTypes, addType} = require('./getTypes');
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
router.route("/types").post(addType)
// [ ] POST /recipe:
// Recibe los datos recolectados desde el formulario controlado de la ruta de creación de recetas por body
// Crea una receta en la base de datos
router.route('/recipe').post(postRecipe);

module.exports = router;

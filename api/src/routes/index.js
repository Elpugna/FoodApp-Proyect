const { Router } = require('express');
const {Recipe, Diet} = require('../db');
const axios = require('axios');
require('dotenv').config();
const {cleaner} = require('../controllers');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


// [ ] GET /recipes?name="...":
// Obtener un listado de las recetas que contengan la palabra ingresada como query parameter
// Si no existe ninguna receta mostrar un mensaje adecuado
router.route('/recipes').get(async (req, res)=>{
  try{
    let offSet =0;
    let response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?number=2&offset=${offSet}&instructionsRequired=true&addRecipeInformation=true&apiKey=${process.env.API_KEY}`)
    //*Limpio la response de los datos extra
    response = cleaner(response);
    
    res.status(201).json(response);
    
  }catch(err){
    console.log(err)
    return res.json({err,"req.params":req.params})

  }
  //|PARA BUSCAR POR NOMBRE DE RECETA USAR ?titleMatch="string" > text that must be found in the title of the recipes
  // .catch(err=>{
  //   const {name }= req.query;
  //   if(!name){
  //     return res.json({msg:"Estas en /recipes"})
  //   }else{
  //     return res.json({msg:"Estas en /recipes con una query", query:req.query})
  //   }

  // })
})

// [ ] GET /recipes/{idReceta}:
// Obtener el detalle de una receta en particular
// Debe traer solo los datos pedidos en la ruta de detalle de receta
// Incluir los tipos de dieta asociados
router.route('/recipes/:idReceta').get((req, res)=>{
  const { idReceta: nombrecito}= req.params;
  if(!nombrecito){
    return res.json({msg:"Estas en /recipes/:idReceta SIN params"})
  }else{
    return res.json({msg:"Estas en /recipes/:idReceta CON params", nombrecito: req.params})
  }
})

// [ ] GET /types:
// Obtener todos los tipos de dieta posibles
// En una primera instancia, cuando no exista ninguno, deberán precargar la base de datos con los tipos de datos indicados por spoonacular acá
router.route('/types').get(async (req,res)=>{
  try{
    let dietTypes = await Diet.findAll({});
    res.json({msg:"Success", dietas: dietTypes})
  }catch(err){

  }
})

// [ ] POST /recipe:
// Recibe los datos recolectados desde el formulario controlado de la ruta de creación de recetas por body
// Crea una receta en la base de datos
router.route('/recipe').post(async (req,res)=>{
  try{
    let { instructions, diets} = req.body; //*Because of the express.json() middleware I get the JavaScript object and not the raw JSON.
    //|diets is an array that contains the values matching the diet_id from the diets table.
    instructions = JSON.stringify(instructions) //*Now I have instructions as a JSON, ready to add it into the DB.
    //*On the other hand JSON.parse(instructions) will return a JavaScript object.

    let newRecipe = await Recipe.create({...req.body, instructions})
    
    //|I retrieve all my diets from my database [{D1}, {D2}... {D12}]
    let allDiets = await Diet.findAll({});
    //| map the diets array in order to now contain the diets to create the M:N relations with the created recipe.
    diets = diets.map(el=>allDiets[el]);
    await newRecipe.addDiets(diets);

    //filter & clean irrelevant data
    let recipeDiets =  (await newRecipe.getDiets()).map(el=>el.name);
    let {updatedAt, createdAt, ...relevantData} = newRecipe.dataValues;

    res.json({msg: "Recipe posted", data: {...relevantData,"instructions": JSON.parse(newRecipe.instructions), diets:recipeDiets}})

  }catch(err){
    console.log(err);
    res.status(500).json({msg: "Something went wrong, try later"})
  }

});

module.exports = router;

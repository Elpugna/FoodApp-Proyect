require('dotenv').config();
const axios = require('axios');
const {recipesCleaner} = require('../controllers');
const {API_KEY} = process.env;
const {Recipe, Diet} = require('../db');

const getRecipes = async(req, res)=>{
  try{
    const {name} = req.query;
    var response = {};
    var dbResponse = [];
    if(!name){
      //*if I don't have a query parameter
      response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?number=100&instructionsRequired=true&addRecipeInformation=true&apiKey=${API_KEY}`);
      dbResponse = await Recipe.findAll({
        attributes: {exclude: ['createdAt', 'updatedAt', 'instructions', 'ingredients']},
        include:{
          model: Diet,
          attributes: ['name'],
          through:{
            attributes: [],
          }
        } 
      });
    }else{
      response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?&titleMatch=${name}&number=100&instructionsRequired=true&addRecipeInformation=true&apiKey=${API_KEY}`);
      dbResponse = await Recipe.findAll({
        where:{
          title:{
            [Op.substring]: name.toLowerCase(),
          }
        },
        attributes: {exclude: ['createdAt', 'updatedAt','instructions', 'ingredients']},
        include:{
          model: Diet,
          attributes: ['name'],
          through:{
            attributes: [],
          }
        } 
      });
    }
    //clean API & DB responses 
    response = recipesCleaner(response);
    dbResponse = dbResponse.map(el=>{
     let {diets, ...relevantData} = el.dataValues;
      return {...relevantData, diets: diets.map(el=>el.dataValues.name)}
    });
    return res.status(200).send({data:[...dbResponse, ...response]});
  }catch(err){
    console.log(err)
    return res.json({err,"req.params":req.params})
  }
}

module.exports = {
  getRecipes,
}
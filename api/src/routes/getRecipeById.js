require('dotenv').config();
const axios = require('axios');
const {API_KEY} = process.env;
const {Recipe, Diet} = require('../db');
const {recipeCleaner} = require('../controllers');

const getRecipeById = async (req, res)=>{
  try{
    const { idReceta: idRecipe}= req.params;
    //the API has numbers as Id's. And the DB has UUID. Number(UUID) returns NaN and NaN is falsy
    if(Number(idRecipe)){
      let data = await axios.get(`https://api.spoonacular.com/recipes/${idRecipe}/information?apiKey=${API_KEY}`);
      data = recipeCleaner(data);
      return res.status(200).send(data);
    }else{
      let recipe = await Recipe.findByPk(idRecipe, {
        attributes: {exclude: ['createdAt', 'updatedAt']},
        include:{
          model: Diet,
          attributes: ['name'],
          through:{
            attributes: [],
          }
        } 
      });
      let upperCaseTitle = recipe.title;
      let {createdAt, updatedAt, diets, ...relevantData} = recipe.dataValues;
      diets = diets.map(el=>el.name);
      return res.status(200).send({title: upperCaseTitle, ...relevantData,diets });
    }

  }catch(err){
    console.log(err);
    res.status(404).json({msg:"The recipe doesn't exist", err:err.message})
  }
}

module.exports = {
  getRecipeById
}
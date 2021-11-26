const {Recipe, Diet} = require('../db');

const postRecipe = async (req,res)=>{
  try{
    let {diets, title, ...otherData} = req.body;
    
    let [newRecipe, created] = await Recipe.findOrCreate({
      where: { title: title.toLowerCase() },
      defaults: {
        title,
        ...otherData
      }
    });
    if(!created) return res.status(409).json({msg:"That recipe already exists, try with another name"});
    //|I retrieve all my diets from my database [{D1}, {D2}... {D12}]
    let allDiets = await Diet.findAll({});
    //| map the diets array in order to now contain the diets to create the M:N relations with the created recipe.
    diets = diets.map(el=>allDiets[el]);
    await newRecipe.addDiets(diets);

    //filter & clean irrelevant data
    let recipeDiets =  (await newRecipe.getDiets()).map(el=>el.name);
    let {updatedAt, createdAt, ...relevantData} = newRecipe.dataValues;
    res.status(201).json({...relevantData, title:newRecipe.title, diets:recipeDiets})

  }catch(err){
    console.log("/Recipes:POST: ",err);
    res.status(500).json({msg: err.message})
  }

}

module.exports = {
  postRecipe
}
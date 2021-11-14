function cleaner(dirtyResponse){
  return dirtyResponse.data.results.map(elem=> {
    let {
      id, 
      vegetarian,
      vegan,
      glutenFree,
      lowFodmap, 
      spoonacularScore, 
      healthScore, 
      sourceUrl,
      sourceName, 
      title, 
      image, 
      summary, 
      diets, 
      analyzedInstructions:[{steps}]
    } = elem;
    return {   
      id, 
      vegetarian,
      vegan,
      glutenFree,
      lowFodmap, 
      spoonacularScore, 
      healthScore, 
      sourceUrl,
      sourceName, 
      title, 
      image, 
      summary, 
      diets,
      analyzedInstructions: steps.map((el)=>{
        let stepNum = el.number;
        let step = el.step;
        let ingredients = el.ingredients.map((el)=>el.name)
        let equipment = el.equipment.map(el=>el.name);
        return {stepNum, step, extra: {ingredients, equipment}};
      })
    };
  });
};






module.exports = {
  cleaner,
}
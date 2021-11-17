function recipesCleaner(dirtyResponse){
  return dirtyResponse.data.results.map(elem=> {
    let {
      id, 
      spoonacularScore, 
      healthScore, 
      title, 
      image, 
      summary, 
      diets, 
    } = elem;
    return {   
      title, 
      id,  
      healthScore, 
      score: spoonacularScore, 
      summary, 
      diets,
      image, 
    };
  });
};

function recipeCleaner(dirtyResponse){
    let {
      id, 
      spoonacularScore, 
      healthScore, 
      title, 
      readyMinutes, 
      servings,
      summary, 
      diets, 
      instructions,
      image,
      extendedIngredients,
    } = dirtyResponse.data;
    return {   
      title, 
      id, 
      healthScore, 
      score:spoonacularScore, 
      summary, 
      instructions,
      ingredients: extendedIngredients.map((el)=>el.original),
      diets, 
      image,
      servings,
      readyMinutes,
    };
}




module.exports = {
  recipesCleaner,
  recipeCleaner
}
import axios from 'axios';

//Actions
export const ADD_RECIPE = "ADD_RECIPE"; //Action dispatched by <AddRecipe>
export const REQUEST_TYPES = "REQUEST_TYPES"; //Action dispatched by <NavBar> to FILTER_TYPE
export const REQUEST_RECIPES = "REQUEST_RECIPES"; //Action dispatched by <Landing>
export const REQUEST_BY_TITLE = "REQUEST_BY_TITLE"; //Action dispatched by <NavBar>'s <Button> with some text in the input

export const REQUEST_BY_ID = "REQUEST_BY_ID"; //Action dispatched by <Link> in <Recipes>
export const ORDER_NAME = "ORDER_NAME"; //Action dispatched by <NavBar>
export const ORDER_SCORE = "ORDER_SCORE"; //Action dispatched by <NavBar>
export const FILTER_TYPE= "FILTER_TYPE";  //Action dispatched by <NavBar>
export const REMOVE_RECIPE_ID ="REMOVE_RECIPE_ID" //Action dispatched by RecipeId


//[AGREGAR RECETA 
export function addRecipe(payload){
  return async function(dispatch){
    try{
      let data = await axios.post("http://localhost:3001/recipe", payload);

      return{
        type: ADD_RECIPE,
        payload: data.data
      }

    }catch(err){
      //error 409 comes from the backend because of an already created recipe
      if(err.response.status === 409){
        alert(err.response.data.msg);
      }
      console.log(err.message)
    }
  }
}

//[REQUEST_TYPES 
export function requestTypes(){
  return async function(dispatch){
    try{
      let diets = await axios.get("http://localhost:3001/types");
      //! console.log("REQUEST_TYPES: ",diets)
      dispatch({
        type:REQUEST_TYPES,
        payload: diets.data
      })
    }catch(err){
      console.log(err)
    }
  }
}

//[PEDIR RECETAS
export function requestRecipes(payload){
  //payload = query param "name="
  console.log("ACTION REQUEST_RECIPES: ")
  return async function(dispatch){
    try{
      let name= payload?`?name=${payload}`: "";
      let recipes = await axios.get(`http://localhost:3001/recipes${name}`);
      //! console.log("REQUEST_RECIPES: ", recipes.data);
      dispatch({
        type: REQUEST_RECIPES,
        payload:recipes.data
      });
    }catch(err){
      console.log(err);
    }
  }
}

//TODO: CAPAZ NO SEA NECESARIO 
//[PEDIR POR TITULO
export function requestTitle(name){
  return async function(dispatch){
    try{
      let recipes = await axios.get(`http://localhost:3001/recipes?name=${name}`);
      //! console.log("REQUEST_RECIPES: ", recipes);
      dispatch({
        type: REQUEST_BY_TITLE,
        payload : recipes.data
      });
    }catch(err){
      console.log(err);
    }
  }
}

//[PEDIR POR ID
export function requestById(id){
  //payload is the ID
  return async function(dispatch){
    try{
      let recipeDetail = await axios.get(`http://localhost:3001/recipes/${id}`);
      //! console.log("REQUEST_RECIPES: ", recipeDetail);
      dispatch({
        type: REQUEST_BY_ID,
        payload : recipeDetail.data
      });
    }catch(err){
      console.log(err);
    }
  }
}


//[ORDENAR POR NOMBRE

//payload es de donde a donde "a-z" o "z-a"
export function orderByTitle(payload){
  return{
    type: ORDER_NAME,
    payload
  }
}

//[ORDENAR POR SCORE
//payload va a ser (Score.asc || Score.desc) O  (healthScore.asc|| healthScore.desc)
export function orderByScore(payload){
  return{
    type: ORDER_SCORE,
    payload
  }
}

//[FILTRAR POR TIPO DE DIETA
//payload es un tipo de dieta
export function filterByType(payload){
  return{
    type: FILTER_TYPE,
    payload
  }
}

export function removeRecipe(){
  return {
    type:REMOVE_RECIPE_ID
  }
}
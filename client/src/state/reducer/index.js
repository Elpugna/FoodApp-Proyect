import {ADD_RECIPE,REQUEST_TYPES, REQUEST_RECIPES, REQUEST_BY_TITLE,REQUEST_BY_ID, ORDER_NAME, ORDER_SCORE, FILTER_TYPE, REMOVE_RECIPE_ID} from '../actions';

let initialState = {
  allRecipes:[],
  recipes:[],
  recipeId:{},
  allDiets: [],
}

export default function rootReducer(state= initialState, action){
  switch(action.type){
    case ADD_RECIPE: 
      return{
        ...state,
        allRecipes: [...state.allRecipes, action.payload],
        recipes: [...state.allRecipes, action.payload]
      }
    case REQUEST_TYPES:
      return{
        ...state,
        allDiets: [...action.payload.map(e=>e.name)]
      }
    case REQUEST_RECIPES:  
      return{
        ...state,
        allRecipes: [...action.payload],
        recipes: [...action.payload]
      }
    case REQUEST_BY_TITLE: 
      return{
        ...state,
        recipes: [...action.payload]
      }
    case REQUEST_BY_ID:
      return{
        ...state,
        recipeId: {...action.payload}
      }
    case ORDER_NAME: 
      if(action.payload === "--"){
        return {
          ...state,
          recipes: [...state.recipes]
        }
      }
      let sortedName = (action.payload === "a-z") ?
         state.recipes.sort((a, b) => { return a.title.toLowerCase() > b.title.toLowerCase()?  1: -1}) :
         state.recipes.sort((a, b) => { return a.title.toLowerCase() > b.title.toLowerCase()? -1:  1});
      return {
        ...state,
        recipes: [...sortedName],
      }
    case ORDER_SCORE:  
      let [score, type] = action.payload.split(".");
      if(score==="--"){
        return{
          ...state,
          recipes:[...state.recipes]
        }
      }
      let sortedScore = [...state.recipes];
      if(score==="score"){
        sortedScore = type==="asc"? 
          sortedScore.sort((a,b)=>a.score>b.score?1:-1):
          sortedScore.sort((a,b)=>a.score>b.score?-1:1);
      }else if(score==="healthScore"){
        sortedScore = (type==="asc")?
          sortedScore.sort((a,b)=>a.healthScore>b.healthScore?1:-1):
          sortedScore.sort((a,b)=>a.healthScore>b.healthScore?-1:1);
      }
      return{
        ...state,
        recipes:sortedScore

      }
    case FILTER_TYPE:
      if (action.payload ==="lacto ovo vegetarian"){
        return {
          ...state,
          recipes: [
            ...state.allRecipes.filter(el=>el.diets.includes(action.payload)),
            ...state.allRecipes.filter(el=>
                (
                  el.diets.includes("lacto vegetarian") ||
                  el.diets.includes("ovo vegetarian") ||
                  el.diets.includes("vegetarian")
                ))
          ]
        }
      }
      return {
          ...state,
          recipes: action.payload!== "--"?[...state.allRecipes.filter(el=>el.diets.includes(action.payload))]:[...state.allRecipes]
        }
    case REMOVE_RECIPE_ID:
      return{
        ...state,
        recipeId:{}
      }
    default:
      return {
        ...state
        
      };
  }

}
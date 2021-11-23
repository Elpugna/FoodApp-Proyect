import {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {requestById} from '../state/actions';
import { useParams } from 'react-router-dom';


export default function RecipeId(){
  const dispatch = useDispatch();
  const {recipe} = useParams();
  const recipeInfo = useSelector(state=>state.recipeId);

  useEffect(()=>{
    console.log("useffect"," R: ", recipe)
    dispatch(requestById(recipe));
  }, [dispatch, recipe]);


  return (
    <>
      {recipeInfo.title ? <div>
        <h2>{recipeInfo.title}</h2>
        <img src={recipeInfo.image} alt="Not Found" title={recipeInfo.title}/>
        <h4>Score : {recipeInfo.score}  |  Healthy Score: {recipeInfo.healthScore}</h4>
        <h4>Ingredients</h4>
        <ul>
          {recipeInfo.ingredients?.map((el,i)=>(<li key={i}>{el}</li>))}
        </ul>
        <h4>Summary</h4>
        <div dangerouslySetInnerHTML={{ __html: recipeInfo.summary }}></div>
        <h4>Instructions</h4>
        <p>{recipeInfo.instructions}</p>
      </div>: <h3>LOADING</h3>}
    </>
  )
}


/* 
src\components\RecipeId.jsx
  Line 1:9:   'useState' is defined but never used                                                                                                                                                             no-unused-vars
  Line 16:6:  React Hook useEffect has missing dependencies: 'recipe' and 'recipeInfo'. Either include them or remove the dependency array                                                                     react-hooks/exhaustive-deps
  Line 23:9:  Redundant alt attribute. Screen-readers already announce `img` tags as an image. You don’t need to use the words `image`, `photo,` or `picture` (or any specified custom words) in the alt prop  jsx-a11y/img-redundant-alt
  Line 30:9:  Only set one of `children` or `props.dangerouslySetInnerHTML`                                                                                                                                    react/no-danger-with-children

*/
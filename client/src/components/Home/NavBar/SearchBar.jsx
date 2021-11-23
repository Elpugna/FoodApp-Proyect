import {requestRecipes} from '../../../state/actions';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

export default function SearchBar(){
  const dispatch = useDispatch();
  const [state, setState] = useState("");

  function handleChange(e){
    setState(e.target.value);
  }

  return (
    <div>
      <input type="text" name="searchBar" id="searchBar" placeholder="Type a recipe.." onChange={(e)=>handleChange(e)} />
      <button onClick={(e)=>dispatch(requestRecipes(state))}>Search</button> 
    </div>
  )
}
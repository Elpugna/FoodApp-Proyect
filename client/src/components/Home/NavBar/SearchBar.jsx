import {requestRecipes} from '../../../state/actions';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import styled from 'styled-components';

export default function SearchBar(){
  const dispatch = useDispatch();
  const [state, setState] = useState("");

  function handleChange(e){
    setState(e.target.value);
  }

  return (
    <div>
      <SearchInput type="text" name="searchBar" id="searchBar" placeholder="Type a recipe.." onChange={(e)=>handleChange(e)} />
      <SearchButton onClick={(e)=>dispatch(requestRecipes(state))}>Search</SearchButton> 
    </div>
  )
}



const SearchButton = styled.button`
  height: 40px;
  background-color: #d4ac7d;
  border-radius: 3px;
  width: 70px;
  cursor: pointer;
  margin-left:3px;
  margin-top: 5px;
  font-size: 15px;
  font-family: 'Yuji Mai', serif;
  border: 2px solid #5e081be0;
  font-weight: 600;
  color: #5e081be0;

  &:hover{
    background-color:transparent;
    border:2px solid #5e081be0;
  }
`
const SearchInput = styled.input`
  height:30px;
  font-size: 1em;
  border: 2px solid #5e081be0;
  padding: 0px;
  border-radius:9px;
  background: #f2f4f5;
  color: #5e081be0;
  font-weight: 600;
  padding-left:5px;
  font-family:  'Lato', serif;

    &::selection{
      background-color: #5e081be0;
      color: #f2f4f5;
    }
    
    &::placeholder {
      color: black;
      font-weight: 400;
      font-family: 'Lato', serif;
    }

`
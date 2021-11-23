import "./landing.css";

import {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {requestRecipes} from '../state/actions';




export default function Landing(){
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(requestRecipes())
  }, [dispatch]);

  return (
    <div>
      HOLA SOY LA LANDING PAGE
      <Link to="recipes"> <button>Ingresar</button> </Link>
    </div>
  )

}


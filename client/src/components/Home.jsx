import './home.css';
import NavBar from './Home/NavBar';
import RecipeBox from './Home/RecipeBox';
import Pages from './Home/Pages';
import {useSelector} from 'react-redux';
import {useState, useEffect} from 'react';

//TODO: PAGINADO
//TODO: NO CARGA EL "LOADING CUANDO ESTA INCOMPLETA Y LA REQUEST TARDA"
//TODO: EN LA RECETA TIENE QUE ESTAR COMO CONDICIÓN DEL README LAS DIETAS Y NO LAS PUNTUACIONES

export default function Home(){
  const recipes = useSelector(state=>state.recipes);


  //paginado
  const itemsPerPage= 9;
  const [pageNumber, setPageNumber] = useState(1)
  const lastItemIndex = pageNumber * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const recipesToShow = recipes.slice(firstItemIndex,lastItemIndex);

  useEffect(()=>{
    //each time I filter recipes I return to page 1
    setPageNumber(1);
  }, [recipes])

  return (
      <>
        <NavBar/>
        <Pages itemsPerPage={itemsPerPage} totalItems={recipes.length} setPageNumber={setPageNumber} />
        <div className="container">
          {  recipesToShow.length ? recipesToShow.map(el=>{
              return <RecipeBox 
                key={el.id} 
                id={el.id} 
                summary={el.summary} 
                image={el.image} 
                diets={el.diets}
                // score={el.score} 
                // healthScore={el.healthScore}
              />
            }): <h2>LOADING</h2>
           }
          {//! console.log("RECIPES: ", recipes)
          }
        </div>

      </>
  )
}




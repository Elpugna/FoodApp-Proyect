import NavBar from './Home/NavBar';
import RecipeBox from './Home/RecipeBox';
import Pages from './Home/Pages';
import {useSelector} from 'react-redux';
import {useState, useEffect} from 'react';
import styled from 'styled-components';
import Img from '../img/image_04-background.jpg';


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
      <Container imgUrl="">
        <NavBar/>
        <Pages itemsPerPage={itemsPerPage} totalItems={recipes.length} actualPage={pageNumber} setPageNumber={setPageNumber} />
        <ContainerRecipes >
          {  recipesToShow.length ? recipesToShow.map(el=>{
              return <RecipeBox 
                title={el.title}
                key={el.id} 
                id={el.id} 
                summary={el.summary} 
                image={el.image} 
                diets={el.diets}
                // score={el.score} 
                // healthScore={el.healthScore}
              />
            }): <Loading>Loading...</Loading>
           }
          {//! console.log("RECIPES: ", recipes)
          }
        </ContainerRecipes>

      </Container>
  )
}



const Container = styled.div`
 margin:0;
 padding:0;

  //*  BackgroundImage
 background-image: url(${Img});
 width:100vw;
 height: 100vh;
 background-size:cover;
 background-position: center;
 background-repeat: no-repeat;
 background-attachment: fixed;
 padding:0px;
 margin:0px;
 overflow-x: hidden;
`

const ContainerRecipes = styled.div`
  width: 100%;
  display: inline-flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
  align-items: flex-start;
  
`

export const Loading = styled.h2`
  color: #514d40;
  font-size: 150px;
  font-family: 'Hurricane','Yuji Mai',serif;
  padding: 15px 15px; 
  text-shadow: 4px 2px 16px #d4ac7d;
  margin: 50px -50px -50px -50px;
  text-align: center;
  text-shadow: 7px 9px 12px #d4ac7d;
  cursor:default;
  
    &:hover{
      text-shadow: 4px 2px 16px #6e1e2a;
    }
`
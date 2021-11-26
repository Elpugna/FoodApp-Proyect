import TopBar from './TopBar';
import {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {requestById, removeRecipe} from '../state/actions';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import BgImage from '../img/image_04-background_01.jpg';
import {Loading} from './Home';

export default function RecipeId(){
  const dispatch = useDispatch();
  const {recipe} = useParams();
  const recipeInfo = useSelector(state=>state.recipeId);

  useEffect(()=>{
    //! console.log("useffect"," R: ", recipe)
    dispatch(requestById(recipe));
    return ()=>{
      dispatch(removeRecipe());
    }
  }, [dispatch, recipe]);
  

  return (
    <>
      <TopBar link="/recipes" btnTitle="Return"/>
      {recipeInfo.title ? 
      <RecipeContainer>
        <PresentationDiv>
          <InfoDiv>
            <Title>{recipeInfo.title}</Title>
            <div>
              <Scores>
                Score : 
                <ScorePoints>{recipeInfo.score}</ScorePoints>  
                Healthy Score : 
                <ScorePoints>{recipeInfo.healthScore}</ScorePoints>
              </Scores>
            </div>
            <Title2>Ingredients:</Title2>
            <Ul>
              {recipeInfo.ingredients?.map((el,i)=>(<Li key={i}>{el}</Li>))}
            </Ul>
          </InfoDiv>
          <div>
            <Img src={recipeInfo.image} alt="Not Found" title={recipeInfo.title}/>
          </div>
        </PresentationDiv>
        <TextDiv>
          <div>
          <Title3>Summary: </Title3>
          </div>
          <Text className="Recipe-summary" dangerouslySetInnerHTML={{ __html: recipeInfo.summary }}></Text>
          <div>
          <Title3>Instructions: </Title3>
          </div>
          <Text className="Recipe-summary" dangerouslySetInnerHTML={{ __html: recipeInfo.instructions }}></Text>
        </TextDiv>
      </RecipeContainer>: <RecipeContainer><Loading>Loading...</Loading></RecipeContainer>}
    </>
  )
}

const RecipeContainer = styled.div`
  background: #28272808;
  backdrop-filter: blur(3px);
  width: 100vw;
  height: 100vh;
  display: block;
  margin-top:5px;

  //* Background Image
  background-image: url(${BgImage});
  background-size:cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  padding:0px;
  margin:0px;
  overflow-x: hidden;

`
const PresentationDiv = styled.div`
  width:100vw;
  height:min-content;
  display:flex;
  flex-direction: row; 
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  align-content: center;
}
`
const InfoDiv = styled.div`
  display: flex;
  flex-direction:column;
  align-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
`


const Title = styled.h1`
  background: #90676e;
  border: 6px solid #d4ac7d;
  outline: 7px double #7b333e;
  color: black;
  font-family: 'Lato',serif;
  font-size: 45px;
  padding: 17px 20px;
  margin-bottom: -5px;
  text-transform: capitalize;
  border-bottom-left-radius: 50px;
  border-bottom-right-radius: 50px;


`
const Scores = styled.h2`
  background: #6e1e2a96;
  opacity: 0.9;
  padding: 10px 40px;
  text-align: center;
  margin-bottom: -15px;
  box-shadow: inset 0px 0px 25px 30px #f1f3f4;

`
const ScorePoints = styled.p`
  background: #f2f4f5;
  border-radius: 15px;
  padding: 0px 5px;
  margin: 0px 40px;
  color: #5e081be0;
  border:2px solid black;
`



const Img = styled.img`
  max-width: 650px;
  max-height: 500px;
  align-self:center;
  margin-top:10px;
  border: 5px solid #6e1e2a;
  outline: 8px double #6e1e2a;
  border-bottom-left-radius: 50px;
  border-bottom-right-radius: 50px;
`

const  Ul = styled.ul`
  display:flex;
  flex-direction: column;
  flex-wrap: wrap;
  font-family: 'Lato', serif;
  font-size: 25px;
  font-weight: 400;
  text-transform: capitalize;

`

const Li = styled.li`
  // display: block;
  padding: 3px 10px;
`
const TextDiv = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: flex-start;
`
const Title2 = styled.h3`
  background: #d4ac7d75;
  border: 6px solid #6e1e2a;
  outline: 7px double #d4ac7d;
  opacity: 0.9;
  color: black;
  font-family: 'Lato',serif;
  font-size: 30px;
  padding: 8px 7px;
  width: min-content;
  margin-bottom: -10px;
  border-bottom-left-radius: 25px;
  border-bottom-right-radius: 25px;
`
const Title3 = styled.h3`
  background: #d4ac7d75;
  border: 6px solid #6e1e2a;
  outline: 7px double #d4ac7d;
  opacity: 0.9;
  color: black;
  font-family: 'Lato',serif;
  font-size: 25px;
  padding: 8px 7px;
  width: min-content;
  align-self: center;
  margin-left: 156px;
  border-bottom-left-radius: 25px;
  border-bottom-right-radius: 25px;
`

const Text = styled.div`
  text-decoration: none;
  font-family: 'Lato', serif;
  font-weight: 500;
  font-size: 25px;
  padding: 0px 10%;
`




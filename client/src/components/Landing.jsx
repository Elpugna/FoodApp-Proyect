import {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {requestRecipes} from '../state/actions';
import styled from 'styled-components';


export default function Landing(){
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(requestRecipes())
  }, [dispatch]);

  return (
    <div className="landing-container">
    
      <Div> 
        Recetillas
        <P> 
        con Sabor.
        </P>
      </Div>
      <div>

      <Link to="recipes" > <Button className="landing-button">Ingresar</Button> </Link>
      </div>

    </div>
  )

}
const Div = styled.div`
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 6em;
  display: inline-flex;
  flex-wrap: wrap;
  padding-left: 100px;
  font-family: 'Rampart One', cursive;
  font-size: 230px;
  color: #514d40;
  text-shadow: 7px 9px 5px #4a06159c;
  font-family: 'Hurricane', cursive;
  cursor:default;
  
    &:hover{
      text-shadow: 7px 9px 12px #d4ac7d;
    }
`
const Button = styled.button`
  justify-self:center ;
  position: relative;
  width: 250px;
  width: 320px;
  height: 150px;
  margin-left: 130px;
  margin-top: 160px;
  font-size: 75px;
  padding: 10px;
  border-radius: 20px;
  z-index: 2;
  font-size: 100px;
  font-weight: 600;
  font-family: 'Grey Qo', cursive;

  background-color: transparent;
  color: #5e081be0;
  border: transparent;
  padding: 10px;
  text-shadow: 7px 9px 15px #3f3c32;

  &:hover{
    cursor: pointer;
    color:  #3f3c32;
    background: transparent;
    border: transparent;
    text-shadow: 5px 5px 14px #5e081be0; 
  }
`
const P = styled.p`
  position: absolute;
  display: flex;
  font-size: 70px;
  width: 222px;
  height: 70px;
  margin-top: 215px;
  margin-left: 430px;
`


// const Button = styled.button`
//   background-color: #b38867;
//   color: #fff;
//   padding: 10px;
//   border: 2px solid #fff;
//   border-radius: 20px;
//   position: relative;
//   z-index: 2;
//   width: 150px;
//   margin: 20px;
//   font-size: 1.2em;

//   &:hover{
    // cursor: pointer;
    // color: #b38867;
    // background: #fff;
    // border: 2px solid #b38867;
//   }
//   `

// const Image = styled.div`
//   height: 100vh;
//   background-size: cover;
//   background-position: center center;
//   background-repeat: no-repeat;
// `
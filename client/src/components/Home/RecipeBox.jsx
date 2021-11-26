import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

export default function RecipeBox({id, image, title, summary, diets}){
  const navigate = useNavigate();

  return (
  
    <RecipeContainer>
        {/* <NavLink to={id}> */}
          <Img onClick={()=>navigate(`/recipes/${id}`)} src={image} alt={title}/>
        {/* </NavLink>  */}
        <Title>{title}</Title>
        <P className="Recipe-summary" dangerouslySetInnerHTML={{ __html:summary }}></P>
        <Title>Diets:</Title>
        <Ul>
          {diets.map((el, i)=><Li key={i}>{el}</Li>)}
        </Ul>
    </RecipeContainer>
  
  )
}


const RecipeContainer = styled.div`
  background: #28272808;
  backdrop-filter: blur(3px);
  height: auto;
  width: 25%;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  margin: 5px;
  padding: 5px 5px;
  overflow: hidden;
  box-shadow: 0px 0px 12px 0px #3f3c32;

    &:hover{
      box-shadow: inset 0px 0px 12px 0px #3f3c32;
    }
`

const Img = styled.img`
width: -webkit-fill-available;
height: fit-content;
`

const Title = styled.h3`
  text-align: center;
  font-size: 1.5em;
  color: #111;
  padding: 10px;
  margin-bottom: -15px;
  text-overflow: ellipsis;
  margin-left: -7px;
  margin-top: -4px;
  overflow: hidden;
  font-weight: bold;
  font-family: "Lato", Serif;
  background-color: #ddbc95;
  border-bottom-left-radius:10px;
  border-bottom-right-radius:10px;
  width: 364px;
  margin-left: 0px;
  border-bottom: 3px solid #6e1e2a;
  border-top: 5px solid #6e1e2a;
`

const Ul = styled.ul`
  list-style-type: none;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width:auto;
  padding: 0px 10px;
  justify-content: space-around;
  align-items:center;
  margin-top:20px;
  font-family: 'Lato', serif;
  text-transform: capitalize;

  
`
const Li = styled.li`
  margin: 0px 0px;
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  padding: 2px 7px;
  border-radius: 25px;
  padding: 2px 10px;
  margin-top:3px;
  

  background: #3f3c32;
  color: #f2f4f5;
`
const P = styled.p`
  text-decoration: none;
  font-family: 'Lato', serif;
  font-weight: 500;
`

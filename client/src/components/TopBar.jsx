import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';


export default function TopBar({link, btnTitle}){
  const navigate = useNavigate();

  return (
    <Nav>
      <Div>
        <Button onClick={()=>navigate(link)}> {btnTitle} </Button>
      </Div>
    </Nav>
  )
}

const Nav = styled.nav`
  width: 100%;
  height: 5vw;
  background-color: #ddbc95;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  font-family: "Cabin", sans-serif;
  margin-top: 0px;
  position: relative;
  align-items: center;
  border-bottom-left-radius: 50px;
  border-bottom-right-radius: 50px;
  border-bottom: 5px solid #d4ac7d;
  border-top: 5px solid #6e1e2a;
`

const Div  = styled.div`
position: absolute;
justify-content: center;
text-align: center;
align-items:center;
border-bottom: 5px solid #5e081be0;
padding-bottom: 25px;
border-bottom-right-radius: 47px;
border-bottom-left-radius: 48px;
width: inherit;
border-top: 6px solid #d4ac7d;
height: 40px;

`


const Button = styled.button`
  height: 40px;
  background-color: #d4ac7d;
  border-radius: 3px;
  width: 120px;
  border-width: 1px;
  cursor: pointer;
  font-size: 15px;
  font-family: 'Yuji Mai', serif;
  border: 2px solid #5e081be0;
  margin-top: 9px;
  font-weight: 600;
  color: #5e081be0;

  &:hover{
    background-color: transparent;
    border:2px solid #5e081be0;
  }
`

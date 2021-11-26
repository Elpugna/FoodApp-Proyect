import { Link } from 'react-router-dom';
import SearchBar from './NavBar/SearchBar';
import OrderName from './NavBar/OderName';
import OrderScore from './NavBar/OrderScore';
import FilterByType from './NavBar/FilterByType';
import styled from 'styled-components';

export default function NavBar(){

  return (
    <Nav>
      <Ul>
        <Li> <SearchBar/></Li>
        <Li><OrderName/></Li>
        <Li><OrderScore/></Li>
        <Li><FilterByType/></Li>
        <Li><Link to='/form'><AddRecipeButton >Add Recipe</AddRecipeButton></Link></Li>
      </Ul>
    </Nav>
  )
}

const Nav = styled.nav`
  width: 100%;
  height: 7vw;
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
  border-top: 3px solid #6e1e2a;
`

const  Ul = styled.ul`
  display: flex;
  width:inherit;
  list-style-type: disc;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding-inline-start: 0px;
  padding-inline-end: 0px;
  justify-content: space-around;
  align-items:center;
  border-bottom: 5px solid #5e081be0;
  padding-bottom: 25px;
  padding-top: 16px;
  border-bottom-right-radius: 47px;
  border-bottom-left-radius: 48px;
`

const Li = styled.li`
  float: left;
  display: block;
  text-align: center;
  padding: 0px 10px;
  text-decoration: none;
`

const AddRecipeButton = styled.button`
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



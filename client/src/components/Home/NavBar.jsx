import './navbar.css'
import { Link } from 'react-router-dom';
import SearchBar from './NavBar/SearchBar';
import OrderName from './NavBar/OderName';
import OrderScore from './NavBar/OrderScore';
import FilterByType from './NavBar/FilterByType';
export default function NavBar(){

  return (
    <nav>
      <ul className="NavBar-list">
        <li className="NavBar-list-item"> <SearchBar/></li>
        <li className="NavBar-list-item"><OrderName/></li>
        <li className="NavBar-list-item"><OrderScore/></li>
        <li className="NavBar-list-item"><FilterByType/></li>
        <li className="NavBar-list-item"><Link to='/form'><button >Add Recipe</button></Link></li>
      </ul>
    </nav>
  )
}
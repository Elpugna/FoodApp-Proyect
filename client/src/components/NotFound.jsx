import './notFound.css';
import {Link} from 'react-router-dom';


export default function NotFound(){

  return (
    <p>
      Page not found =(...  Return back 
      <Link to='/' >Home</Link>
    </p>
  )
}
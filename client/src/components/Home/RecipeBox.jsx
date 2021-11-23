import {NavLink} from 'react-router-dom';



export default function RecipeBox({id, image, title, summary, diets}){

  return (
  
    <div className="recipe-container">
           <NavLink to={id}><img className="recipe-img-card" src={image} alt={title}/></NavLink> 
        <p>{title}</p>
        <p  dangerouslySetInnerHTML={{ __html:summary }}></p>
        <ul>
          {diets.map((el, i)=><li key={i}>{el}</li>)}
        </ul>
    </div>
  
  )
}
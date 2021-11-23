import './addRecipe.css';
import {useState, useEffect} from 'react';
import { addRecipe } from '../state/actions';
import { useDispatch} from 'react-redux';

/*
TODO: AGREGAR AL ESTADO "image" y que por defecto tenga una como genérica, de modo que si no se agrega se pone esa y si se agrega la que se agregó
TODO: FIJARME SI EN VEZ DEL useEffect puedo solucionarlo con setDiets((oldValue)=>newValue) y desp setRecipe(oV=>nV) y desp setErr(oV=>nV) y así evitar el error que me está saliendo
TODO: AGREGAR EL HOOK DE ESTADO PARA NAVEGAR A HOME POST SUBMITEADA  let navigate = useNavigate(); ... navigate('/recipes')
TODO: AGREGAR PLACEHOLDERS
TODO: AGREGAR ESTILOS (A la clase clase-checkbox también)
*/


//[ FUNCTION VALIDATE ERROR
function validateForm(input){
  let err = {};
  //*Validate diets array
  if(!input.diets.length){
    err.diets = "Must select at least one type of diet";
  }
  //*Validate other inputs
  if(input.title === ""){
    err.title = "Must provide a title";
  }
  if(input.ingredients ===""){
    err.ingredients = "Provide at least essential ingredients for the recipe";
  }
  if(input.summary === "" || input.summary.length <=10){
    err.summary = "Summary is required"
  }
  if(input.instructions === "" || input.instructions.length <= 10){
    err.instructions = "Instructions are required";
  }
  if(Number(input.score) >100 || Number(input.score) <= 0){
    err.score = "Score must be a number between 1-100";
  }
  if(Number(input.healthScore) >100 || Number(input.healthScore)<=0){
    err.healthScore = "Health Score must be a number between 1-100";
  }
  return err;
}




export default function AddRecipe(props){
  const [recipe, setRecipe]= useState({
    title:"",
    summary:"",
    instructions:"",
    ingredients: "",
    score: 0,
    healthScore: 0,
    diets: [],
  });
  const [errors, setErrors] = useState({})
  const [diets, setDiets] = useState(new Array(12).fill(false));
  const [submitted, setSubmitted] = useState(false)
  const dispatch = useDispatch();

  useEffect(()=>{
    setRecipe({
      ...recipe,
      diets: diets.map((el, i)=>{
        if(el){
          return i;
        }
        return false;
      }).filter(el=>(typeof el) === 'number'),
    });
    //| no tenía a recipe agregado acé me lo pedia un error
  }, [diets]);
  
  useEffect(()=>{
    setErrors(validateForm(recipe))
  },[recipe])

  //[FUNCIONES HANDLE CHANGE
  const handleChange = (event)=>{
    //comprobar que los campos requeridos se cumplan
    setRecipe({
      ...recipe,
      [event.target.name]: event.target.value
    })
    };

  const handleCheckBoxChange = (event)=>{
    let value= Number(event.target.value);
    //! console.log("HANDLECHECK: VALUE: ", value)
    setDiets(diets.map((el,i)=>{
    //!  console.log("ADENTRO DE SET DIETS: VALUE: ", value, " INDEX: ", i)
        if(i===value){ 
          return !el;
        }
        return el;
      })
    );

    
  };



  function handleSubmit(event){
    event.preventDefault()
    
    //Si no tengo errores, entonces despacho la acción.
    if(!Object.keys(errors).length){
      let ingredients = recipe.ingredients.split(", ");
      dispatch(addRecipe({...recipe,ingredients}));
      //! console.log(`Recipe ${recipe.title} creation request sent`)  //! ####
      //! console.log("RECIPE: ", recipe);
      //! console.log("ERROR: ", errors)
      setSubmitted(false);
    }else{
      //si no, cambio submitted a true y muestro los campos con errores
      setSubmitted(true);
    }
  }

  return (
    <div>
      <form onSubmit={(e)=>handleSubmit(e)}>
        <label>Recipe Title</label>
        <input 
          type="text" 
          className={(submitted && errors.title)? 'danger': null} 
          onChange={(e)=>handleChange(e)} 
          name="title"
          required
          />
        {(submitted && errors.title)? <span className="danger-text">{errors.title}</span> : null }

        <label>Summary</label> 
        <textarea 
          className={(submitted && errors.summary)? 'danger': null} 
          type="text" 
          onChange={(e)=>handleChange(e)} 
          name="summary" />
        {(submitted && errors.summary)? <span className="danger-text">{errors.summary}</span> : null }

        <label>Instructions</label>
        <textarea 
          className={(submitted && errors.instructions)? 'danger': null} 
          type="text" 
          onChange={(e)=>handleChange(e)} 
          name="instructions"/>
        {(submitted && errors.instructions)? <span className="danger-text">{errors.instructions}</span> : null }

        <label>Ingredients</label>
        <textarea 
          className={(submitted && errors.ingredients)? 'danger': null} 
          type="text" onChange={(e)=>handleChange(e)} 
          name="ingredients" 
          placeholder="Set ingredients separed by comma(',')"/>
        {(submitted && errors.ingredients)? <span className="danger-text">{errors.ingredients}</span> : null }

        <label>Score</label>
        <input 
          className={(submitted && errors.score)? 'danger':null} 
          type="number" 
          onChange={(e)=>handleChange(e)} 
          name="score" />
        {(submitted && errors.score)? <span className="danger-text">{errors.score}</span> : null }

        <label>Health Score</label>
        <input  
          className={(submitted && errors.healthScore)?'danger':null} 
          type="number" 
          onChange={(e)=>handleChange(e)} 
          name="healthScore" />
        {(submitted && errors.healthScore)? <span className="danger-text">{errors.healthScore}</span> : null }
        
        
        {/* //[Esto tiene que tener una clase específica para agruparlos sin que ocupen 2 hojas 
        */}

        <div className={(submitted && errors.diets)?'danger':null}>

        <fieldset >
          <legend >Diet Type</legend>

        {/* * 1 */}
        <label>Vegan</label>
        <input type="checkbox" name="vegan" value="0" onChange={(e)=>handleCheckBoxChange(e)}/>
        {/* * 2 */}
        <label>Ovo Vegetarian</label>
        <input type="checkbox" name="ovoVegetarian" value="1" onChange={(e)=>handleCheckBoxChange(e)}/>
         {/* 3 */}
        <label>Lacto Vegetarian</label>
        <input type="checkbox" name="lactoVegetarian" value="2" onChange={(e)=>handleCheckBoxChange(e)}/>
        {/* 4 */}
        <label>Vegetarian</label>
        <input type="checkbox" name="vegetarian" value="3" onChange={(e)=>handleCheckBoxChange(e)}/>
        {/* 5 */}
        <label>Gluten Free</label>
        <input type="checkbox" name="glutenFree" value="4" onChange={(e)=>handleCheckBoxChange(e)}/>
        {/* 6 */}
        <label>Diary Free</label> 
        <input type="checkbox" name="diaryFree" value="5" onChange={(e)=>handleCheckBoxChange(e)}/>
        {/* 7 */}
        <label>Pescetarian</label>
        <input type="checkbox" name="pescetarian" value="6" onChange={(e)=>handleCheckBoxChange(e)}/>
        {/* 8 */}
        <label>Paleolithical</label>
        <input type="checkbox" name="paleolithical" value="7" onChange={(e)=>handleCheckBoxChange(e)}/>
        {/* 9 */}
        <label>Primal</label>
        <input type="checkbox" name="primal" value="8" onChange={(e)=>handleCheckBoxChange(e)}/>
         {/* 10 */}
        <label>Ketogenic</label>
        <input type="checkbox" name="ketogenic" value="9" onChange={(e)=>handleCheckBoxChange(e)}/>
         {/* 11 */}
        <label>lowFODMAP</label>
        <input type="checkbox" name="lowFodmap" value="10" onChange={(e)=>handleCheckBoxChange(e)}/>
         {/* 12 */}
        <label>Whole 30</label>
        <input type="checkbox" name="whole30" value="11" onChange={(e)=>handleCheckBoxChange(e)}/>

        </fieldset>
        </div>
        <button type="submit" >Add</button>
      </form>
    </div>
  );
}



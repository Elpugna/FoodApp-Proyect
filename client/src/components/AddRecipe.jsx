import {useState, useEffect} from 'react';
import { addRecipe } from '../state/actions';
import { useDispatch} from 'react-redux';
import styled from 'styled-components';
import {useNavigate} from 'react-router-dom';
import TopBar from './TopBar';


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

//°isUrl
function isURL(str) {
  var urlRegex = '^(?!mailto:)(?:(?:http|https|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$';
  var url = new RegExp(urlRegex, 'i');
  return  url.test(str);
}


export default function AddRecipe(props){
  const [recipe, setRecipe]= useState({
    title:"",
    summary:"",
    instructions:"",
    ingredients: "",
    image: "",
    score: 0,
    healthScore: 0,
    diets: [],
  });
  const [errors, setErrors] = useState({})
  const [diets, setDiets] = useState(new Array(12).fill(false));
  const [submitted, setSubmitted] = useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      let defaultUrl = "https://thumbs.dreamstime.com/b/cartoon-chef-kebab-cartoon-chef-character-holding-kebab-110669261.jpg";
      if(isURL(recipe.image)){
        defaultUrl = recipe.image;
      }
      dispatch(addRecipe({...recipe,image: defaultUrl, ingredients}));
      //! console.log(`Recipe ${recipe.title} creation request sent`)  //! ####
      //! console.log("RECIPE: ", recipe);
      //! console.log("ERROR: ", errors)
      setSubmitted(false);
      navigate("/recipes");
    }else{
      //si no, cambio submitted a true y muestro los campos con errores
      setSubmitted(true);
    }
  }

  return (
    <>
      <TopBar link="/recipes" btnTitle="Return" />
      <Form onSubmit={(e)=>handleSubmit(e)}>
        <Label>Recipe Title*</Label>
        <Input 
          type="text" 
          className={(submitted && errors.title)? 'danger': null} 
          onChange={(e)=>handleChange(e)} 
          name="title"
          placeholder="Ex. Eggplant Lasagna"
          required
          />
        {(submitted && errors.title)? <Span className="danger-text">{errors.title}</Span> : null }

        <Label>Summary*</Label> 
        <TextArea 
          rows="3"
          cols="80"
          className={(submitted && errors.summary)? 'danger': null} 
          type="text" 
          onChange={(e)=>handleChange(e)} 
          name="summary" 
          placeholder="Tell us about this recipe."/>
        {(submitted && errors.summary)? <Span className="danger-text">{errors.summary}</Span> : null }

        <Label>Instructions*</Label>
        <TextArea 
          rows="6"
          cols="80"
          className={(submitted && errors.instructions)? 'danger': null} 
          type="text" 
          onChange={(e)=>handleChange(e)} 
          name="instructions"
          placeholder="Tell us how to prepare this dish."/>
        {(submitted && errors.instructions)? <Span className="danger-text">{errors.instructions}</Span> : null }
 


        <Label>Image</Label> 
        <Input 
          type="text" 
          onChange={(e)=>handleChange(e)} 
          name="image" 
          placeholder="https://www.examplepicture.com"/>

        <Label>Ingredients*</Label>
        <Input 
          className={(submitted && errors.ingredients)? 'danger': null} 
          type="text" onChange={(e)=>handleChange(e)} 
          name="ingredients" 
          placeholder="Set ingredients separed by comma (',')."/>
        {(submitted && errors.ingredients)? <Span className="danger-text">{errors.ingredients}</Span> : null }

        <Label>Score*</Label>
        <Input 
          className={(submitted && errors.score)? 'danger':null} 
          type="number" 
          onChange={(e)=>handleChange(e)} 
          name="score" 
          placeholder="0 - 100"/>
        {(submitted && errors.score)? <Span className="danger-text">{errors.score}</Span> : null }

        <Label>Health Score*</Label>
        <Input  
          className={(submitted && errors.healthScore)?'danger':null} 
          type="number" 
          onChange={(e)=>handleChange(e)} 
          name="healthScore"
          placeholder="0 - 100" />
        {(submitted && errors.healthScore)? <Span className="danger-text">{errors.healthScore}</Span> : null }
        
        

        <div >

        <FieldSet >
          <Legend >Diet Type/s*</Legend>

        {/* * 1 */}
        <Label>Vegan</Label>
        <Checkbox type="checkbox" name="vegan" value="0" onChange={(e)=>handleCheckBoxChange(e)}/>
        {/* * 2 */}
        <Label>Ovo Vegetarian</Label>
        <Checkbox type="checkbox" name="ovoVegetarian" value="1" onChange={(e)=>handleCheckBoxChange(e)}/>
         {/* 3 */}
        <Label>Lacto Vegetarian</Label>
        <Checkbox type="checkbox" name="lactoVegetarian" value="2" onChange={(e)=>handleCheckBoxChange(e)}/>
        {/* 4 */}
        <Label>Vegetarian</Label>
        <Checkbox type="checkbox" name="vegetarian" value="3" onChange={(e)=>handleCheckBoxChange(e)}/>
        {/* 5 */}
        <Label>Gluten Free</Label>
        <Checkbox type="checkbox" name="glutenFree" value="4" onChange={(e)=>handleCheckBoxChange(e)}/>
        {/* 6 */}
        <Label>Diary Free</Label> 
        <Checkbox type="checkbox" name="diaryFree" value="5" onChange={(e)=>handleCheckBoxChange(e)}/>
        {/* 7 */}
        <Label>Pescetarian</Label>
        <Checkbox type="checkbox" name="pescetarian" value="6" onChange={(e)=>handleCheckBoxChange(e)}/>
        {/* 8 */}
        <Label>Paleolithic</Label>
        <Checkbox type="checkbox" name="paleolithic" value="7" onChange={(e)=>handleCheckBoxChange(e)}/>
        {/* 9 */}
        <Label>Primal</Label>
        <Checkbox type="checkbox" name="primal" value="8" onChange={(e)=>handleCheckBoxChange(e)}/>
         {/* 10 */}
        <Label>Ketogenic</Label>
        <Checkbox type="checkbox" name="ketogenic" value="9" onChange={(e)=>handleCheckBoxChange(e)}/>
         {/* 11 */}
        <Label>lowFODMAP</Label>
        <Checkbox type="checkbox" name="lowFodmap" value="10" onChange={(e)=>handleCheckBoxChange(e)}/>
         {/* 12 */}
        <Label>Whole 30</Label>
        <Checkbox type="checkbox" name="whole30" value="11" onChange={(e)=>handleCheckBoxChange(e)}/>

        </FieldSet>
        </div>
        {(submitted && errors.diets)? <Span>{errors.diets}</Span> : null }
        <Button type="submit" >Add</Button>
      </Form>
    </>
  );
}


const Form = styled.form`
  background: #28272808;
  backdrop-filter: blur(3px);
  border: 2px solid #6e1e2a;

  min-width: 200px;
  max-width: 450px;
  display:flex;
  flex-direction: column;


  display: flex;
  border-radius:3px;
  border-bottom-right-radius: 15px;
  border-bottom-left-radius: 15px;
  width: 50%;
  height: auto;
  margin: 10px;
  margin-left: auto;
  margin-right: auto;
  text-align: left;
  font-family: "Open Sans", sans-serif;
  padding: 10px;
  margin-bottitioom: 10px;

  color: black;


    & ::selection {
      color:#f2f4f5;
      background-color: #5e081be0;
    } 
`

const TextArea =  styled.textarea`
  background: #f2f4f5;
  border-radius:9px;
  font-family:  'Lato', serif;
  border: 2px solid #5e081be0;
  color: #5e081be0;
  font-weight: 600;
  padding-left: 5px;
  font-size: 1em;

    &::placeholder {
      color: black;
      font-weight: 400;
      font-family: 'Lato', serif;
    }

`

const Input = styled.input`
  background: #f2f4f5;
  border-radius:9px;
  font-family:  'Lato', serif;
  border: 2px solid #5e081be0;
  color: #5e081be0;
  font-weight: 600;
  padding-left:5px;
  height:30px;
  font-size: 1em;

    &::placeholder {
      color: black;
      font-weight: 400;
      font-family: 'Lato', serif;
    }

`
const Label = styled.label`
  font-family:  'Lato', serif
  background: #f2f4f5;
  heigth:fit-content;
  width:fit-content;
  margin: 0px 0px;
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  padding: 2px 7px;
  border-radius: 25px;
  padding: 0px 4px;
  margin-top: 3px;
  color: #0c0a0d;
`
const Legend = styled.legend`
  font-family:  'Lato', serif
  background: #f2f4f5;
  heigth:fit-content;
  width:fit-content;
  margin: 0px 0px;
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  padding: 2px 7px;
  border-radius: 25px;
  padding: 0px 4px;
  margin-top: 3px;
  color: #0c0a0d;
`

const FieldSet = styled.fieldset`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: center;
  align-items: center;
  justify-content: flex-start;

`
const Checkbox = styled.input`

& :checked {
  background-color: #5e081be0;
  border: 1px solid #adb8c0;
  color: #red;
}

`

const Span = styled.span`
  font-family: 'Lato', serif;
  color: #6e1e2a;
  font-weight: 500;
  background-color: #ddbc95;
  text-align: center;
  border-radius: 3px;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
  border: 2px solid #6e1e2a;
  font-weight: bold;
`

const Button = styled.button`
  height: 40px;
  background-color: #d4ac7d;
  width: 445px;
  border-width: 1px;
  cursor: pointer;
  font-size: 15px;
  font-family: 'Yuji Mai', serif;
  border: 2px solid #5e081be0;
  margin-top: 9px;
  font-weight: 600;
  color: #5e081be0;
  border-radius:3px;
  border-bottom-right-radius: 15px;
  border-bottom-left-radius: 15px;

  &:hover{
    background-color: transparent;
    border:2px solid #5e081be0;
  }
`
// 
//margin-top: 5px;


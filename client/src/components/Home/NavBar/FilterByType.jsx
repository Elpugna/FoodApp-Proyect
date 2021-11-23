import {filterByType, requestTypes} from '../../../state/actions';
import {useSelector, useDispatch} from 'react-redux';
import {useEffect} from 'react';


export default function FilterByType(){
  const dispatch = useDispatch();
  const diets = useSelector(state=>state.allDiets)
  useEffect(()=>{
    dispatch(requestTypes())
  },[dispatch])

  function handleChange(e){
    dispatch(filterByType(e.target.value));
  }



  return(
    <div>
        <label >Filter By Type:</label>
        <select id="filterType" name="filterType"  onChange={(e)=>handleChange(e)}>
          <option value="--">All</option>
          {diets.map((el,i)=>(<option key={i} value={el}>{el}</option>))
          }
        </select>
    </div>
  )
}
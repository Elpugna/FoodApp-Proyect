import {orderByScore} from '../../../state/actions';
import {useDispatch} from 'react-redux';
import {useState} from 'react';


export default function OrderScore(){
  const dispatch = useDispatch();
  const [state, setState] = useState("--")
  function handleChange(e){
    if(e.target.value === "--"){
      setState("--");
      dispatch(orderByScore("--"))
    }
    if(e.target.name === "scoreOrder"){
      dispatch(orderByScore(state+"."+e.target.value))
    }else{
      setState(e.target.value);
    }
  }

  return (
    <>
      <label>Order By Score</label>
      <select id="ScoreType" name="scoreType" onChange={e=>handleChange(e)}>
        <option defaultValue="selected" value="--">  </option>
        <option value="score">Score</option>
        <option value="healthScore">healthScore</option>
      </select>
      {state!=="--"?<select id="scoreOrder" name="scoreOrder"  onChange={e=>handleChange(e)}>
        <option defaultValue="selected" value="asc">Asc</option>
        <option value="desc">Desc</option>
      </select>:null}
    </>
  );
}
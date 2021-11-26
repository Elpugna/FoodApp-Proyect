import {orderByScore} from '../../../state/actions';
import {useDispatch} from 'react-redux';
import {useState} from 'react';
import styled from 'styled-components';

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
      <Label>Order By Score:</Label>
      <Selector id="ScoreType" name="scoreType" onChange={e=>handleChange(e)}>
        <Option defaultValue="selected" value="--">  </Option>
        <Option value="score">Score</Option>
        <Option value="healthScore">Health Score</Option>
      </Selector>
      {state!=="--"?<Selector id="scoreOrder" name="scoreOrder"  onChange={e=>handleChange(e)}>
        <Option defaultValue="selected" value="asc">Asc</Option>
        <Option value="desc">Desc</Option>
      </Selector>:null}
    </>
  );
}

const Label = styled.label`
  color: #514d40;
  font-size: 40px;
  font-family: 'Hurricane', 'Yuji Mai', serif;
`

const Selector = styled.select`
  border: 2px solid #5e081be0;
  cursor: pointer;
  height: 40px;
  padding: 0px 0px;
  font-size: 1em;
  border-radius: 8px;
  margin-left:3px;
  color: #5e081be0;
  font-weight: 600;
  background: #f2f4f5;
`
const Option = styled.option`
  font-weight: normal;
  display: block;
  white-space: nowrap;
  min-height: 30px;
  padding: 0px 2px 1px;
  background: #f2f4f5;
  color: #5e081be0;
  font-weight: 600;
  font-family:  'Lato', serif;
`
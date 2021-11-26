import {filterByType, requestTypes} from '../../../state/actions';
import {useSelector, useDispatch} from 'react-redux';
import {useEffect} from 'react';
import styled from 'styled-components';

export default function FilterByType(){
  const dispatch = useDispatch();
  const diets = useSelector(state=>state.allDiets)
  useEffect(()=>{
    dispatch(requestTypes())
  },[dispatch])

  function handleChange(e){
    dispatch(filterByType(e.target.value.toLowerCase()));
  }



  return(
    <div>
        <Label >Filter By Type:</Label>
        <Selector id="filterType" name="filterType"  onChange={(e)=>handleChange(e)}>
          <Option value="--">All</Option>
          {diets.map((el,i)=>{
              if(el==="ovo vegetarian" || el==="lacto vegetarian" || el==="vegetarian"){
                return <Option key={i} value={"lacto ovo vegetarian"}>{el}</Option>
              }
              return <Option key={i} value={el}>{el}</Option>
            })
          }
        </Selector>
    </div>
  )
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
  background: #f2f4f5;
  font-weight: 600;
  color: #5e081be0;
  text-transform: capitalize;
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
  font-family: 'Lato', serif;
  text-transform: capitalize;

`
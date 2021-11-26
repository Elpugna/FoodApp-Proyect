import {orderByTitle} from '../../../state/actions';
import {useDispatch} from 'react-redux';
import styled from 'styled-components';

export default function OrderName(){
  const dispatch = useDispatch();

  function handleChange(e){
    dispatch(orderByTitle(e.target.value));
  }

  return (
    <div>
        <Label >Order By Name:</Label>
        <Selector id="orderNames" name="orderName"  onChange={(e)=>handleChange(e)}> 
          <Option value="--">  </Option>
          <Option value="a-z">A-Z</Option>
          <Option value="z-a">Z-A</Option>
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
  color: #5e081be0;
  font-weight: 600;

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
`
import {orderByTitle} from '../../../state/actions';
import {useDispatch} from 'react-redux';


export default function OrderName(){
  const dispatch = useDispatch();

  function handleChange(e){
    dispatch(orderByTitle(e.target.value));
  }

  return (
    <div>
        <label >Order By Name:</label>
        <select id="orderNames" name="orderName"  onChange={(e)=>handleChange(e)}> 
          <option value="--">  </option>
          <option value="a-z">A-Z</option>
          <option value="z-a">Z-A</option>
        </select>
    </div>
  )
}
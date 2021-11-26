import styled from 'styled-components';

export default function Pages({itemsPerPage, totalItems, actualPage, setPageNumber}){
  const pages = [];

  for(let i=1;i<=Math.ceil(totalItems/itemsPerPage);i++){
      pages.push(i);
  }

  return (
    <nav>
      <Ul className="Pages-list">
        {pages && pages.map((el, i )=>{
            if(el===actualPage){
              return <LiSelected className="Pages-list-item" key={i}onClick={()=>setPageNumber(el)}>{el}</LiSelected>
            }
            return <Li className="Pages-list-item" key={i}onClick={()=>setPageNumber(el)}>{el}</Li>
          })
        } 
      </Ul>
    </nav>
  )
}



const Ul = styled.ul`
  background: transparent;
  display: flex;
  justify-content:center;
  list-style: none;
  font-family: 'Grey Qo','Hurricane', serif;
  
`
const Li = styled.li`
  cursor:pointer;
  background: #ddbc95;
  border: 2px solid #6e1e2a;
  //border-radius: 10px;
  height: 30px;
  width: 30px;
  box-shadow: 2px 2px 3px 2px #514d40;
  margin: 10px;
  color: #fff;
  padding: 1px;
 

  font-weight: 900;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #6e1e2a;
  font-size: 30px;
  // border-radius:3px;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;

  &:hover{
    background: #d4ac7d61;
  }
`

const LiSelected = styled.li`
  cursor:default;
  background: #d4ac7d61;
  border: 2px solid #6e1e2a;
  height: 30px;
  width: 30px;
  box-shadow: 2px 2px 3px 2px #514d40;
  margin: 10px;
  padding: 1px;
 

  font-weight: 900;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #6e1e2a;
  font-size: 30px;
  // border-radius:3px;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;

`
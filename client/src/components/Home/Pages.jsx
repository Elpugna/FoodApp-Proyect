

export default function Pages({itemsPerPage, totalItems, setPageNumber}){
  const pages = [];

  for(let i=1;i<=Math.ceil(totalItems/itemsPerPage);i++){
      pages.push(i);
  }

  return (
    <nav>
      <ul className="Pages-list">
        {pages && pages.map((el, i )=>(<li className="Pages-list-item" key={i}><button  onClick={()=>setPageNumber(el)}>{el}</button></li>)) }
      </ul>
    </nav>
  )
}
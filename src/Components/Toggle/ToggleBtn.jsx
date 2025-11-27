import React from 'react'

const ToggleBtn = ({click,setClick}) => {
   
  const handle = () =>{
    setClick(click === 0 ? 1:0)
  }

  return (
    <div>
        <p>i Am a good {click === 0?"boy":"girl"}</p>
        <button onClick={handle}>{click === 0?"boy":"girl"}me!</button>
    </div>
  )
}

export default ToggleBtn
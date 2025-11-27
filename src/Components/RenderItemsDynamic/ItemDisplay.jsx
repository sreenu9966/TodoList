import React from 'react'

import "./listitem.css"
//thumbsImage,url
const ItemDisplay = ({albumId, id,title}) => {
  return (
    <div className='items-display-list'>
       
        <div className="items-display-live">
            <div className="items-out">
                <p>{albumId}</p>
            <p>{id}</p>
            {/* <p>{url}</p> */}
            <p>{title}</p>
           <img src="https://image2url.com/images/1762257080077-d583a52d-dc41-4a76-a97f-102a2e21fb7d.jpg" width="300px" height="auto"/>
            </div>
        </div>
    </div>
  )
}

export default ItemDisplay
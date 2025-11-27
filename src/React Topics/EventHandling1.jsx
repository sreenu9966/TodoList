import React from 'react'

const EventHandling1 = () => {

    
    const handleSubmit = () =>{
        console.log('hello');
        
    }
  return (
    <div>
        <button onClick={handleSubmit}>Submit</button>
    </div>
  )
}

export default EventHandling1
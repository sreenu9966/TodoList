import React, { useState } from 'react'

const EventBinding = () => {
    const [msg, SetMsg] = useState("");
    function fun() {

        SetMsg("Hello")
    }
    return (

        <div >

            <p style={{color:"white"}}>{msg}</p>
            <button onClick={fun}>Click me!</button>
        </div>
    )
}

export default EventBinding
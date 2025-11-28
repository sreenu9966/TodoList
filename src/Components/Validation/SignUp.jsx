import React, { useState } from 'react'

const SignUp = () => {
    const [input,SetInput] = useState({
        uname:"",
        email:"",
        pass:"",
        cpass:"",
    });
    return (
        <div>
            <form  >

                <label htmlFor="uname">User Name</label>
                <input type="text" value={input.uname} onChange={(e)=>SetInput(e.target.value)} required />
                <label htmlFor="email">Email</label>

                <input type="email" name='pass' value={input.email} onChange={(e)=>SetInput(e.target.value) } />

                <label htmlFor="pass">Password</label>
                <input type="password" name='pass' value={input.pass} onChange={(e)=>SetInput(e.target.value)} />

                <label htmlFor="cpass" >Confirm Password</label>
                <input type="password" name="cpass" onChange={(e)=>SetInput(e.target.value)} value={input.cpass} />

                <button>Submit</button>
            </form>
        </div>
    )
}

export default SignUp
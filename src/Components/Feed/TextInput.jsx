import React, { useState } from 'react'

const TextInput = () => {
    //const [text, SetText] = useState("");
    const [name, SetName] = useState({ firstName: "", lastName: "" })
    const [newName, SetNewName] = useState([])
    const [editId, SetEditId] = useState(null)

    const handleClick = () => {
        // e.preventDefault();
        SetNewName([...newName, { ...name, id: Date.now() }])
        SetName({ firstName: "", lastName: "" })

    }


    const editBtn = (item) => {
        SetEditId(item.id);
        SetName({
            firstName: item.firstName,
            lastName: item.lastName,
        })
    }


    const SaveEdit = () => {
        SetNewName(newName.map(item => 
            item.id === editId ? { ...item, ...name } : item

        ))

        SetEditId(null) //stop editing
        SetName({
            firstName: "",
            lastName: "",
        })
    }

    const delBtn = (id) => {
        SetNewName(newName => newName.filter((item) => item.id !== id))
    }
    return (
        <div>
            {/* <input type="text" onChange={onChangeHandler} value={text} />
        <p> {text} </p> */}

            <input type="text" name='firstName' onChange={(e) => SetName({ ...name, firstName: e.target.value })} value={name.firstName} />
            <input type="text" name='lastName' onChange={(e) => SetName({ ...name, lastName: e.target.value })} value={name.lastName} />

            {editId ? (
                 <button onClick={SaveEdit}>Save</button>
            ):
            
             <button onClick={handleClick}>Submit</button>
            }
           


            {newName.map((item) => {
                return (

                    <div key={item.id}>
                        <p>{item.id}</p>
                        <p > {item.firstName}</p>
                        <p>{item.lastName}</p>
                        <p onClick={() => editBtn(item)}>Edit</p>
                        <button onClick={() => delBtn(item.id)}>Delete</button>
                        <hr />

                    </div>

                )
            })}



        </div>
    )
}

export default TextInput
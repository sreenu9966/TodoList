// import React, { useState } from 'react'


// const TodoApp = () => {
//     const [todo,SetTodo] = useState("");
//     const [newTodo,SetNewTodo] = useState([])

//     function onChangeHandler(e){

//     SetTodo(e.target.value)


//     }

//     function handleSubmit(){
//         SetTodo(todo);
//         console.log(todo);
//         SetNewTodo([...newTodo,todo]);
//          SetTodo(newTodo);

//     }
//   return (
//     <div>
//         <input type="text" value={todo} onChange={onChangeHandler} />
//         <button onClick={handleSubmit}>Add</button>
//         <div>
//             <h4>TodoList</h4>

//             <ul>

//                 {newTodo.map((item,index)=>{
//                     return (
//                         <li key={index}>{item}</li>
//                     ) 
//                 })}

//             </ul>
//         </div>

//     </div>
//   )
// }

// export default TodoApp

import React, { useState } from 'react'
import "./TodoApp.css"
const TodoApp = () => {
    const [lava, SetLava] = useState({
        nameLava: "",
        date: "",
    })
    const [newLava, SetNewLava] = useState([])
    const [editId, SetEditId] = useState(null)

    const handleSubmit = () => {
        SetNewLava([{ ...lava, id: Date.now() }, ...newLava])
        SetLava({
            nameLava: "",
            date: "",
        })
    }

    const delBtn = (id) => {
        SetNewLava(newLava => newLava.filter((item) => item.id !== id))
    }

    const editBtn = (item) => {
        SetEditId(item.id)
        SetLava({
            nameLava: item.nameLava,
            date: item.date,
        })
    }

    const SaveEdit = () => {
        SetNewLava(newLava => newLava.map((item) => item.id === editId ? { ...item, ...lava } : item))
        SetEditId(null)
        SetLava({
            nameLava: "",
            date: "",
        })
    }

    return (
        <div>
            <h1>Lavada Application</h1>

            <div>
                <input type="text" name="nameLava" value={lava.nameLava} onChange={(e) => SetLava({ ...lava, nameLava: e.target.value })} />

                <input type="date" name="date" value={lava.date} onChange={(e) => SetLava({ ...lava, date: e.target.value })} />

                {editId ? (
                    <button onClick={SaveEdit}>Save</button>
                ) : (
                    <button onClick={handleSubmit}>Add Lavada</button>
                )}


            </div>

            <div>
                <table>
                    <thead>
                        <td>Id</td>
                        <td>NameLava</td>
                        <td>Date</td>
                    </thead>
                </table>
            </div>

            {newLava.map(item => {
                return (
                    <>
                        <table>
                            <p>Avaliable lavadas</p>
                            <thead>
                                <th>
                                    <td>Id</td>
                                    <td>NameLava</td>
                                    <td>Date</td>
                                </th>
                            </thead>
                            <tbody>
                                <th className="div-item-container" key={item.id}>

                                    <td>{item.id}</td>
                                    <td>{item.nameLava}</td>
                                    <td>{item.date}</td>
                                    <td onClick={() => editBtn(item)}>Edit</td>
                                    <button onClick={() => delBtn(item.id)}>Delete</button>
                                    <hr />


                                </th>
                            </tbody>
                        </table>


                    </>
                )
            })}

        </div>
    )
}

export default TodoApp











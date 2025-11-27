import React,{useState,useEffect} from 'react'
import axios from 'axios'

import TodoList from './Components/TodoList/FrontEnd/TodoList'
import TextTodo from './Components/TodoList/FrontEnd/textTodo'

const App = () => {
   const [todo, SetTodo] = useState({ nameTodo: "", todoDate: "", message: "" });
    const [newTodo, SetNewTodo] = useState([]);
    const [editId, SetEditId] = useState(null);

    const [nameError, SetNameError] = useState("");
    const [dateError, SetDateError] = useState("");
    const [msgError, SetMsgError] = useState("");

    useEffect(() => {
        axios.get("http://localhost:5000/todos")
            .then(res => SetNewTodo(res.data))
            .catch(err => console.log(err));
    }, []);

    const handleSubmit = () => {
        axios.post("http://localhost:5000/add-todo", todo)
            .then(res => {
                SetNewTodo([...newTodo, res.data]);
                SetTodo({ nameTodo: "", todoDate: "", message: "" });
            })
            .catch(err => console.log(err));
    };

    const editBtn = (item) => {
        SetEditId(item._id);
        SetTodo({
            nameTodo: item.nameTodo,
            todoDate: item.todoDate,
            message: item.message,
        });
    };

    const SaveEdit = () => {
        axios.put(`http://localhost:5000/update/${editId}`, todo)
            .then((res) => {
                SetNewTodo(newTodo.map(item =>
                    item._id === editId ? res.data : item
                ));
                SetEditId(null);
                SetTodo({ nameTodo: "", todoDate: "", message: "" });
            })
            .catch(err => console.log(err));
    };

    const delBtn = (id) => {
        axios.delete(`http://localhost:5000/delete/${id}`)
            .then(() => {
                SetNewTodo(newTodo.filter(item => item._id !== id));
            })
            .catch(err => console.log(err));
    };

    const handleValidation = () => {
        let valid = true;

        // Name validation
        if (todo.nameTodo.trim().length === 0) {
            SetNameError("Required");
            valid = false;
        } else if (todo.nameTodo.length > 15) {
            SetNameError("Please enter less than 15 characters");
            valid = false;
        } else {
            SetNameError("");
        }

        // Date validation
        if (todo.todoDate.trim().length === 0) {
            SetDateError("Required");
            valid = false;
        }

        else if (new Date(todo.todoDate) < new Date()) {
            SetDateError("Select current or future time only");
            valid = false;
        }
        else {
            SetDateError("");
        }

        // Message validation
        if (todo.message.trim().length === 0) {
            SetMsgError("Required");
            valid = false;
        } else if (todo.message.length > 12) {
            SetMsgError("Please enter less than 12 characters");
            valid = false;
        } else {
            SetMsgError("");
        }

        // If validated
        if (valid) {
            editId ? SaveEdit() : handleSubmit();
        }
    };
  return (
    <div>
      {/* <TextInput/> */}

      {/* <TodoApp/> */}

      < TextTodo nameError={nameError} editBtn={editBtn} 
            dateError={dateError} msgError={msgError}  delBtn={delBtn} newTodo={newTodo} handleValidation={handleValidation} todo={todo}  SetTodo={SetTodo} editId={editId} />
        <TodoList nameError={nameError} editBtn={editBtn} 
            dateError={dateError} msgError={msgError}  delBtn={delBtn} newTodo={newTodo} editId={editId}
            
            />
    </div>
  )
}

export default App
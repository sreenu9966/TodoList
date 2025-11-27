import React from "react";
import "./TextTodo.css"

const TextTodo = ({ todo, SetTodo, editId, handleValidation, nameError, dateError, msgError }) => {


    return (
        <div className="todo-inputs-con">

            <div className="uptime-container">
                <p>Todo Application</p>

                <div className="input-con">
                    <input
                        className="input-field"
                        placeholder="Enter Task"
                        value={todo.nameTodo}
                        onChange={(e) => SetTodo({ ...todo, nameTodo: e.target.value })}
                    />

                    <input
                        className="input-field"
                        type="datetime-local"
                        min={new Date().toISOString().slice(0, 16)}
                        value={todo.todoDate}
                        onChange={(e) => SetTodo({ ...todo, todoDate: e.target.value })}
                    />

                    <input
                        className="textarea-field"
                        placeholder="Typing a Message..."
                        value={todo.message}
                        onChange={(e) => SetTodo({ ...todo, message: e.target.value })}
                    />
                    
                </div>
                <div className="p-error">
                    <span className="error">{nameError}</span>
                    <span className="error">{dateError}</span>
                    <span className="error">{msgError}</span>
                </div>
               
            </div>

             <button  onClick={handleValidation}>
                    {editId ? "Save" : "Add Todo"}
                </button>
        </div>
    );
};

export default TextTodo;

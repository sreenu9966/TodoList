
import "./TodoList.css";

const TodoList = ({ editBtn, delBtn, newTodo }) => {



    return (
        <div className="todo-container" id="todo-container-mobile">

            <h4>Avaliable ToDos</h4>
            <table>
                <thead>
                    <tr><th>ID</th><th>Name</th><th>Date</th><th>Message</th>
                        <th>Action</th>

                    </tr>
                </thead>
                <tbody>
                    {newTodo.map((item) => (
                        <tr key={item._id}>
                            <td>{item._id}</td>
                            <td>{item.nameTodo}</td>
                            <td>{item.todoDate}</td>
                            <td>{item.message}</td>
                            <td>
                                <button className="btn-class-cl" onClick={() => editBtn(item)}>Edit</button>
                                <button className="btn-class-c2" onClick={() => delBtn(item._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="todo-items-mobile">
                    {newTodo.map(item => {
                        return(
                            <div key={item._id}>
                                <p>ItemId: {item._id}</p>
                                <p>TodoName: {item.nameTodo}</p>
                                <p>Date{item.todoDate}</p>
                                <p>Remarks{item.message}</p>
                                <button className="btn-class-cl" onClick={() => editBtn(item)}>Edit</button>
                                <button className="btn-class-c2" onClick={() => delBtn(item._id)}>Delete</button>
                                <hr />
                            </div>
                        )
                    })}
            </div>
        </div>
    );
};

export default TodoList;

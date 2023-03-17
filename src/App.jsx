import { useState } from "react";

function App() {
  const [todos, setToDos] = useState([
    // {
    //   value: "task 1",
    //   isDone: false,
    //   changeable: false,
    // },
    // {
    //   value: "task 2",
    //   isDone: false,
    //   changeable: false,
    // },
    // {
    //   value: "task 3",
    //   isDone: false,
    //   changeable: false,
    // },
  ]);

  const [inputValue, setInputValue] = useState("");
  const [editInput, setEditInput] = useState({
    value: "",
    isDone: false,
    changeable: false,
  });

  // Functions

  // **********************
  const handleAddToDo = (todo) => {
    setToDos((prev) => [
      ...prev,
      { value: todo, isDone: false, changeable: false },
    ]);
    setInputValue("");
  };

  // *********************
  const handleRemoveItem = (index) => {
    const todosNewArr = [...todos];
    todosNewArr.splice(index, 1);
    setToDos(todosNewArr);
  };

  // ***********************
  const handleDoneTodo = (e, index) => {
    const newArray = [...todos];
    newArray[index].isDone = e.target.checked;
    setToDos(newArray);
  };

  // **************
  const handleEditMode = (index) => {
    setEditInput({ ...todos[index] });
    const newTodosArray = [...todos];
    todos[index].changeable = !todos[index].changeable;
    setToDos(newTodosArray);
  };

  const handleAddEditedToDo = (editInput, index) => {
    const todosArr = [...todos];
    todosArr[index].value = editInput.value;
    todosArr[index].isDone = editInput.isDone;
    todosArr[index].changeable = editInput.changeable;
    setToDos(todosArr);
  };

  return (
    <div className="App">
      <div className="input">
        <input type="text" onChange={(e) => setInputValue(e.target.value)} />
        <button
          onClick={() => {
            inputValue != "" && handleAddToDo(inputValue);
          }}
        >
          Create
        </button>
      </div>
      {/* Map ToDos */}
      <ul>
        {todos.map((todo, index) => {
          return todo.changeable ? (
            <div>
              <input
                type="text"
                value={editInput.value}
                onChange={(e) => {
                  const value = e.target.value;
                  setEditInput(value);
                  setEditInput({ ...editInput, value });
                }}
              />
              <button onClick={() => handleAddEditedToDo(editInput, index)}>
                Add
              </button>
            </div>
          ) : (
            <li key={todo.value}>
              <span style={{ textDecoration: todo.isDone && "line-through" }}>
                {todo.value}
              </span>
              <input
                type="checkbox"
                onChange={(e) => handleDoneTodo(e, index)}
              />
              {/* EditMode Btn */}
              <button onClick={() => handleEditMode(index)}>Edit</button>
              {/* Remove Btn */}
              <button onClick={() => handleRemoveItem(index)}>X</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;

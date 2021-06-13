import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { ImBin } from "react-icons/im";
import { FaEdit } from "react-icons/fa";
import { AiFillEdit } from "react-icons/ai";

function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  // setting state, where todos is an array of object, each object is a todo
  // setTodos, is a function that sets the state of the todos
  // intialise todo with empty array []
  // todo is to keep track of current todo we are adding

  useEffect(() => {
    const temp = localStorage.getItem("todos");
    const loadedTodos = JSON.parse(temp); //converts JSON back to Javascript

    if (loadedTodos) {
      setTodos(loadedTodos);
    }
    // so only grab data from local storage if it exists
  }, []);
  // runs once when the component is loaded if empty array []
  //localStorage.getItem retrieves items from localStorage

  useEffect(() => {
    const temp = JSON.stringify(todos); // turns data into strings
    localStorage.setItem("todos", temp); // saves data into localStorage
  }, [todos]);

  //  if pass state or props variable in the array, it will run every time state or props is updated

  const [todoEditing, setTodoEditing] = useState(null);
  const [editingText, setEditingText] = useState("");

  // todoEditing is gonna be id of todo that I am editing.
  // editingText keeps track of text is being edited, before submitting

  function handleSubmit(e) {
    //function that runs when form's submitted
    e.preventDefault(); // without this form auto refreshes
    // creating object for the todos array
    if (!todo) return; //if no value, won't submit form

    const newTodo = {
      id: new Date().getTime(),
      text: todo,
      completed: false,
    };
    // used to get a unique id for every object.
    // new Date object lets us work with dates .getTime gets the time in milliseconds since 01/01/1970
    // setting text to do todo hook defined earlier
    setTodos([...todos].concat(newTodo)); // copy todos, adds newTodo, and sets it to state
    setTodo(""); // resets input to make it blank
  }

  function deleteTodo(id) {
    const updatedTodos = [...todos].filter((todo) => todo.id !== id);

    setTodos(updatedTodos); //updates the todos array, which no longer has deleted item
  }

  // to delete, filters out the todo to delete. returns to new array values that pass condition. todo is element of each object in todos array

  function toggleComplete(id) {
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed; // turns true to false and vice-versa
      }
      return todo;
    });

    setTodos(updatedTodos);
  }

  function editTodo(id) {
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.text = editingText;
      }
      return todo;
    });
    setTodos(updatedTodos);
    setTodoEditing(null);
    setEditingText("");
  }

  return (
    <div className="App">
      <div className="nice-background">
        <div className="top-styling">
          <div>
            <h1>Todo List</h1>
          </div>
          <div className="nice-underline">
            <p>Get things done, one item at a time.</p>
          </div>
        </div>

        <div className="todo-list">
          <div className="app-2">
            <div className="todo-list-2">
              {todos.map((todo) => (
                // <div className="try-out-2">
                <div key={todo.id}>
                  {todoEditing === todo.id ? (
                    <input
                      type="text"
                      onChange={(e) => setEditingText(e.target.value)}
                      value={editingText}
                      className="input-styling spacing-element"
                    />
                  ) : (
                    <div className="text-sizing todo-2">
                      {todo.text}

                      <input
                        type="checkbox"
                        onChange={() => toggleComplete(todo.id)}
                        checked={todo.completed}
                      />
                      <div>
                        <button className="button complete-movement">
                          Complete
                        </button>

                        <ImBin
                          color="white"
                          size="25px"
                          onClick={() => deleteTodo(todo.id)}
                          className="bin-movement"
                        />
                        <FaEdit
                          className="edit-movement"
                          onClick={() => setTodoEditing(todo.id)}
                        />
                      </div>
                    </div>
                  )}

                  {todoEditing === todo.id ? (
                    <button
                      onClick={() => editTodo(todo.id)}
                      className="button submit-edit"
                    >
                      Submit Edit
                    </button>
                  ) : (
                    // <AiFillEdit
                    //   onClick={() => editTodo(todo.id)}
                    //   color="white"
                    //   size="35px"
                    //   className="submit-edit"
                    // />
                    <button
                      onClick={() => setTodoEditing(todo.id)}
                      className="button no-display"
                    >
                      Edit Todo
                    </button>
                  )}

                  {/* to.id specific which one to delete */}
                  {/* </div> */}
                </div>
              ))}
            </div>
          </div>
          {/* outputs each elements of todos array */}
          <div className="move-to-end">
            <p>Move done items at the end?</p>
          </div>
          <div className="add-todo-list-text">
            <p>Add to the todo list</p>
          </div>
          <form onSubmit={handleSubmit}>
            {/* onSubmit will run anytime a button with type submit is clicked */}
            <input
              type="text"
              className="input-styling"
              onChange={(e) => setTodo(e.target.value)}
              value={todo}
            />
            {/* links value, onChange and state. so input that is typed in is value of input and is saved to the state of todo */}
            <button type="submit" className="button">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;

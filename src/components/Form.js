import React, { useEffect } from "react";
import { useState } from "react/cjs/react.development";
import {v4 as uuidv4} from "uuid";

const Form = ({ input, setInput, todos, setTodos, editTodo, setEditTodo }) => {
    const onInputChange = (event) => {
        setInput(event.target.value);
    };
    const updateTodo = (title, id, completed) => {
        const newTodo = todos.map((todo) => 
            todo.id === id ? { title, id, completed } : todo
        );
        setTodos(newTodo);
        setEditTodo("");
    };
    useEffect(() => {
        if(editTodo) {
            setInput(editTodo.title);
        } else {
            setInput("");
        }
    }, [setInput, editTodo])
    const onFormSubmit = (event) => {
        event.preventDefault();
        if(!editTodo){
            setTodos([...todos, { id: uuidv4(), title: input, completed: false}]);
            setInput("");
        } else {
            updateTodo(input, editTodo.id, editTodo.completed)
        }
    };

    return (
        <form onSubmit={onFormSubmit}>
            <input 
                type='text' 
                placeholder='Enter Todo' 
                className='task-input'
                value={input}
                required
                onChange={onInputChange}
            />
            <button className='btn-add' type='submit'>{editTodo ? "Update" : "Add"}</button>
        </form>
    )
}
export default Form;
import React from "react";
import { AddTodo } from "../../components";
import axios from 'axios';

export const Todos = (props) => {

    const initialState = { todo: "" }

    const addTodoInitialState = {
        isLoading: false,
        isError: false,
        data: null
    }

    const [state, setState] = React.useState({ ...initialState });

    const [addTodo, setAddTodo] = React.useState({ ...addTodoInitialState });

    const onAddTodo = async () => {
        setAddTodo({ ...addTodo, isLoading: true });
        try {
            let endPoint = 'https://631c0e5f4fa7d3264ca61b8e.mockapi.io/api/v1/todos';
            const data = await axios.post(endPoint, {
                todo: state.todo,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            });
            console.log("Response:", data);
            setAddTodo({ ...addTodo, isLoading: false, isError: false, data })
        } catch (error) {
            setAddTodo({ ...addTodo, isLoading: false, isError: true })
        }
    }

    return <div>
        {/* Add Todo */}
        <AddTodo
            value={state.todo}
            onChange={(todo) => setState({ ...state, todo })}
            onAddBtnClicked={onAddTodo}
        />
        {addTodo.isLoading && <p>I am Loading....</p>}
        {addTodo.isError && <p>I am got error signal</p>}
        {addTodo.isLoading === false && addTodo.data && <p>Todo added successfully</p>}
    </div>
}
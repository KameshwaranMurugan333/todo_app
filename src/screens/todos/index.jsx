import React from "react";
import { AddTodo, TodoTable } from "../../components";
import axios from 'axios';
import { Col, Container, Row } from "react-bootstrap";

export const Todos = (props) => {

    const initialState = { todo: "" };
    const addTodoInitialState = { isLoading: false, isError: false, data: null, message: "" };
    const getTodoInitialState = { isLoading: false, isError: false, data: [], message: "" };


    const [state, setState] = React.useState({ ...initialState });
    const [addTodo, setAddTodo] = React.useState({ ...addTodoInitialState });
    const [todos, setTodos] = React.useState({ ...getTodoInitialState });

    const onAddTodo = async () => {
        setAddTodo({ ...addTodo, isLoading: true, message: "" });
        try {
            let endPoint = 'https://631c0e5f4fa7d3264ca61b8e.mockapi.io/api/v1/todos';
            const data = await axios.post(endPoint, {
                todo: state.todo,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            });
            setAddTodo({ ...addTodo, isLoading: false, isError: false, data, message: "Todo Added Successfully!" });
            setState({ ...initialState });
        } catch (error) {
            setAddTodo({ ...addTodo, isLoading: false, isError: true, message: "Opps! Something went wrong, Unable to Add Todo.  Try again later." })
        }
    }

    const getTodos = async () => {
        setTodos({ ...todos, isLoading: true, message: "" });
        try {
            let endPoint = 'https://631c0e5f4fa7d3264ca61b8e.mockapi.io/api/v1/todos';
            const res = await axios.get(endPoint);
            setTodos({ ...todos, isLoading: false, isError: false, data: res.data, message: "Todo Fetched Successfully!" });
        } catch (error) {
            setTodos({ ...todos, isLoading: false, isError: true, message: "Opps! Something went wrong, Unable to Add Todo.  Try again later." })
        }
    }

    React.useEffect(() => {
        getTodos();
        // eslint-disable-next-line 
    }, [])

    return <Container>
        <Row>
            <Col>
                <h5>Add Todo</h5>
                {/* Add Todo */}
                <AddTodo
                    value={state.todo}
                    onChange={(todo) => setState({ ...state, todo })}
                    onAddBtnClicked={onAddTodo}
                    loading={addTodo.isLoading}
                />

                {/* Success and error message */}
                <p style={{ color: addTodo.isError ? "red" : "green" }}>{addTodo.message}</p>
            </Col>
        </Row>

        {/* List All Todos */}
        <Row>
            <Col>
                <h5>All Todos</h5>
                {/* Table */}
                {todos.isLoading && <p>Fetching all todos....</p>}
                {todos.isError && <p style={{ color: 'red' }}>Opps! Unable to fetch all todos. Try Again Later</p>}
                <TodoTable rows={todos.data} />
            </Col>
        </Row>
    </Container>
}
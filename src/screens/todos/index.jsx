import React from "react";
import { AddTodo } from "../../components";
import axios from 'axios';
import { Col, Container, Row } from "react-bootstrap";

export const Todos = (props) => {

    const initialState = { todo: "" }

    const addTodoInitialState = {
        isLoading: false,
        isError: false,
        data: null,
        message: ""
    }

    const [state, setState] = React.useState({ ...initialState });

    const [addTodo, setAddTodo] = React.useState({ ...addTodoInitialState });

    const onAddTodo = async () => {
        setAddTodo({ ...addTodo, isLoading: true, message: "" });
        try {
            let endPoint = 'https://631c0e5f4fa7d3264ca61b8e.mockapi.io/api/v1/todos';
            const data = await axios.post(endPoint, {
                todo: state.todo,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            });
            console.log("Response:", data);
            setAddTodo({ ...addTodo, isLoading: false, isError: false, data, message: "Todo Added Successfully!" });
            setState({ ...initialState });
        } catch (error) {
            setAddTodo({ ...addTodo, isLoading: false, isError: true, message: "Opps! Something went wrong, Unable to Add Todo.  Try again later." })
        }
    }

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
            </Col>
        </Row>
    </Container>
}
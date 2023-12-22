import { Button, Container } from "react-bootstrap"
import { TodoForm } from "../components/todoForm"
import React from "react";
import { config } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../router/routes";
import { useAddTodoMutation } from "../redux/services/todoServices";

export const AddTodo = () => {

    const [addTodoMutation, { error, isLoading }] = useAddTodoMutation();

    const [title, setTitle] = React.useState("");
    const [date, setDate] = React.useState("");

    const navigate = useNavigate();

    const addTodo = () => {
        addTodoMutation({ title, date, created_at: new Date(), updated_at: new Date() }).then(res => {
            if (res.data) {
                alert("Todo Added Successfully!");
                navigate(AppRoutes.allTodos);
            }
        })
    }

    return <Container>

        <Button variant="text" className="mt-3" onClick={() => navigate(AppRoutes.allTodos)}>{"<- Go Back"}</Button>

        <h3>Add Todo</h3>
        <p>You can add your todo here.</p>

        <TodoForm
            title={title}
            setTitle={setTitle}
            date={date}
            setDate={setDate}
            errorMessage={error?.message ?? ""}
            onSubmit={addTodo}
            isLoading={isLoading}
        />
    </Container>
}
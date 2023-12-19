import { Button, Container } from "react-bootstrap"
import { TodoForm } from "../components/todoForm"
import React from "react";
import { config } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../router/routes";

export const AddTodo = () => {

    const [title, setTitle] = React.useState("");
    const [date, setDate] = React.useState("");
    const [errorMessage, setErrorMessage] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);

    const navigate = useNavigate();

    const addTodo = () => {
        setIsLoading(true);
        axios({
            url: config.api_endpoint_baseURL + "/todos",
            method: 'POST',
            data: { title, date, created_at: new Date(), updated_at: new Date() },
        }).then(res => {
            setIsLoading(false);
            alert("Todo Added Successfully!");
            navigate(AppRoutes.allTodos);
        }).catch(err => {
            setIsLoading(false);
            setErrorMessage("Something went wrong, unable to add todo")
            console.log("Err:", err);
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
            errorMessage={errorMessage}
            onSubmit={addTodo}
            isLoading={isLoading}
        />
    </Container>
}
import { Alert, Button, Container, Spinner } from "react-bootstrap"
import { TodoForm } from "../components/todoForm"
import React from "react";
import { config } from "../config";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { AppRoutes } from "../router/routes";

export const EditTodo = () => {

    const [title, setTitle] = React.useState("");
    const [date, setDate] = React.useState("");

    const [errorMessage, setErrorMessage] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);
    
    // Stats used while getting data of a single todo
    const [isFetching, setIsFetching] = React.useState(false);
    const [isFetchingError, setIsFetchingError] = React.useState(false);

    const navigate = useNavigate();
    const params = useParams();

    const updateTodo = () => {
        setIsLoading(true);
        axios({
            url: config.api_endpoint_baseURL + "/todos/" + params.id,
            method: 'PUT',
            data: { title, date, updated_at: new Date() },
        }).then(res => {
            setIsLoading(false);
            alert("Todo Updated Successfully!");
            navigate(AppRoutes.allTodos);
        }).catch(err => {
            setIsLoading(false);
            setErrorMessage("Something went wrong, unable to update todo")
            console.log("Err:", err);
        })
    }

    React.useEffect(() => {
        setIsFetching(true);
        axios({
            url: config.api_endpoint_baseURL + "/todos/" + params.id,
            method: 'GET'
        }).then(res => {
            setIsFetching(false);
            setTitle(res.data.title);
            setDate(res.data.date);
        }).catch(err => {
            setIsFetching(false);
            setIsFetchingError(true);
            console.log("Err:", err);
        })
        // eslint-disable-next-line
    }, [])

    return <Container>

        <Button variant="text" className="mt-3" onClick={() => navigate(AppRoutes.allTodos)}>{"<- Go Back"}</Button>

        <h3>Edit Todo</h3>
        <p>You can edit your todo here.</p>

        {isFetching && <Spinner />}

        {isFetchingError && <Alert variant='danger'>Something went wrong, unable to fetch todo</Alert>}

        {isFetching === false && <TodoForm
            title={title}
            setTitle={setTitle}
            date={date}
            setDate={setDate}
            errorMessage={errorMessage}
            onSubmit={updateTodo}
            isLoading={isLoading}
        />}
    </Container>
}
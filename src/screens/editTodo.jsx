import { Alert, Button, Container, Spinner } from "react-bootstrap"
import { TodoForm } from "../components/todoForm"
import React from "react";
import { config } from "../config";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { AppRoutes } from "../router/routes";
import { useGetTodoQuery, useLazyGetTodoQuery, useUpdateTodoMutation } from "../redux/services/todoServices";

export const EditTodo = () => {

    const [getTodo, getTodoData] = useLazyGetTodoQuery();
    const [updateTodoMutation, { isLoading, error }] = useUpdateTodoMutation();

    const [title, setTitle] = React.useState("");
    const [date, setDate] = React.useState("");

    const navigate = useNavigate();
    const params = useParams();

    const updateTodo = () => {
        updateTodoMutation({ id: params.id, body: { title, date, updated_at: new Date() } }).then(res => {
            if (res.data) {
                alert("Todo Updated Successfully!");
                navigate(AppRoutes.allTodos);
            }
        })
    }

    React.useEffect(() => {
        getTodo(params.id).then(res => {
            if (res.data) {
                setTitle(res.data.title);
                setDate(res.data.date);
            }
        })
        // eslint-disable-next-line
    }, [])

    return <Container>

        <Button variant="text" className="mt-3" onClick={() => navigate(AppRoutes.allTodos)}>{"<- Go Back"}</Button>

        <h3>Edit Todo</h3>
        <p>You can edit your todo here.</p>

        {getTodoData.isLoading && <Spinner />}

        {getTodoData.isError && <Alert variant='danger'>Something went wrong, unable to fetch todo</Alert>}

        {getTodoData.isLoading === false && <TodoForm
            title={title}
            setTitle={setTitle}
            date={date}
            setDate={setDate}
            errorMessage={error?.message ?? ""}
            onSubmit={updateTodo}
            isLoading={isLoading}
        />}
    </Container>
}
import axios from 'axios';
import React from 'react';
import { Alert, Button, Container, Spinner, Stack, Toast } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { config } from '../config';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '../router/routes';

export function AllTodos() {

    const [allTodos, updateAllTodos] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [isError, setIsError] = React.useState(false);
    const [show, setShow] = React.useState(false);

    const navigate = useNavigate();

    const onAddTodoButtonClicked = () => {
        navigate(AppRoutes.addTodo);
    }

    const onLogoutBtnClicked = () => {
        localStorage.removeItem('auth_token');
        navigate(AppRoutes.login);
    }

    const onEditBtnClicked = (todo) => {
        navigate(AppRoutes.editTodo.replace(':id', todo.id));
    }

    const onDeletBtnClicked = (todo) => {
        setShow(todo);
    }

    const confirmDelete = () => {
        setIsLoading(true);
        axios({
            url: config.api_endpoint_baseURL + "/todos/" + show.id,
            method: 'DELETE'
        }).then(res => {
            setIsLoading(false);
            setShow(false);
            getAllTodos();
        }).catch(err => {
            setIsLoading(false);
            setIsError(true);
            console.log("Err:", err);
        })
    };

    const getAllTodos = () => {
        setIsLoading(true);
        axios({
            url: config.api_endpoint_baseURL + "/todos",
            method: 'GET'
        }).then(res => {
            setIsLoading(false);
            updateAllTodos(res.data);
        }).catch(err => {
            setIsLoading(false);
            setIsError(true);
            console.log("Err:", err);
        })
    }

    React.useEffect(() => {
        getAllTodos();
    }, []);

    return (
        <Container>
            <Stack className='mt-3' direction="horizontal" gap={3} >
                <h3>All Todos</h3>

                <Button onClick={onAddTodoButtonClicked} className='ms-auto'>Add Todo</Button>
                <Button onClick={onLogoutBtnClicked}>Logout</Button>
            </Stack>

            {isLoading && <Spinner />}

            {isError && <Alert variant='danger'>Something went wrong, unable to fetch todos</Alert>}

            <Toast onClose={() => setShow(false)} show={show} delay={3000}>
                <Toast.Header>
                    <strong>
                        Delete Operation
                    </strong>
                </Toast.Header>
                <Toast.Body>
                    <p>Are you sure, do you want to delete?</p>
                    <Button disabled={isLoading} onClick={confirmDelete} variant='danger'>Delete</Button>
                </Toast.Body>
            </Toast>

            <Table className='mt-3' striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Date</th>
                        <th>Created At</th>
                        <th>Updated At</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {allTodos.map((todo, index) => {
                        return <tr key={todo.id}>
                            <td>{index + 1}</td>
                            <td>{todo.title}</td>
                            <td>{new Date(todo.date).toString()}</td>
                            <td>{new Date(todo.created_at).toString()}</td>
                            <td>{new Date(todo.updated_at).toString()}</td>
                            <td>
                                <Button variant='link' onClick={() => onEditBtnClicked(todo)} >Edit</Button>
                            </td>
                            <td>
                                <Button variant='link' onClick={() => onDeletBtnClicked(todo)} >Delete</Button>
                            </td>
                        </tr>
                    })}
                </tbody>
            </Table>
        </Container>
    );
}
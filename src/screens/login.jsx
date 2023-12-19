import React from 'react';
import { Container, Alert } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '../router/routes';

export function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [errorMessage, setErrorMessage] = React.useState("");

    const onLoginBtnClicked = () => {
        if (email === 'ksmwaran333@gmail.com' && password === '12345678') {
            localStorage.setItem('auth_token', 'my token');
            navigate(AppRoutes.allTodos);
        } else {
            setErrorMessage("Invalid email and password");
        }
    }

    React.useEffect(() => {
        if (localStorage.getItem('auth_token')) {
            navigate(AppRoutes.allTodos);
        }
        // eslint-disable-next-line
    }, []);


    return (
        <Container>
            <Form onSubmit={(e) => e.preventDefault()}>
                {/* Email */}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter email" />
                </Form.Group>

                {/* Password */}
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
                </Form.Group>

                {errorMessage.length > 0 && <Alert className='mb-3' variant={'danger'}>{errorMessage}</Alert>}

                {/* Login Button */}
                <Button variant="primary" type="submit" onClick={onLoginBtnClicked}>
                    Login
                </Button>
            </Form>

        </Container>
    );
}

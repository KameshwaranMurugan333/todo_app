import { fireEvent, render, screen } from '@testing-library/react';
import { Login } from '../screens/login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRoutes } from '../router/routes';

test('Check login page rendered or not', () => {
    render(<BrowserRouter>
        <Routes>
            <Route path='/' element={<Login />} />
        </Routes>
    </BrowserRouter>);

    const emailAddress = screen.getByText(/Email Address/i);
    const password = screen.getByText(/Password/i);
    const login = screen.getByText(/Login/i);


    expect(emailAddress).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(login).toBeInTheDocument();
});

test('Check login working or not', () => {
    render(<BrowserRouter>
        <Routes>
            <Route path='/' element={<Login />} />
        </Routes>
    </BrowserRouter>);

    const emailInput = screen.getByTestId('emailInput');
    const passwordInput = screen.getByTestId('passwordInput');
    const loginBtn = screen.getByTestId('loginBtn');


    fireEvent.change(emailInput, { target: { value: 'ksmwaran333@gm.com' } });
    fireEvent.change(passwordInput, { target: { value: 'ksmwaran333@gm.com' } });
    fireEvent.click(loginBtn);

    const errorMessage = screen.getByText("Invalid email and password");
    expect(errorMessage).toBeInTheDocument();

    fireEvent.change(emailInput, { target: { value: 'ksmwaran333@gm.com' } });
    fireEvent.change(passwordInput, { target: { value: '' } });
    fireEvent.click(loginBtn);

    expect(screen.getByText("Invalid email and password")).toBeInTheDocument();

    fireEvent.change(emailInput, { target: { value: '' } });
    fireEvent.change(passwordInput, { target: { value: '11111' } });
    fireEvent.click(loginBtn);

    expect(screen.getByText("Invalid email and password")).toBeInTheDocument();

    fireEvent.change(emailInput, { target: { value: 'ksmwaran333@gmail.com' } });
    fireEvent.change(passwordInput, { target: { value: '12345678' } });
    fireEvent.click(loginBtn);

    expect(window.location.pathname).toBe(AppRoutes.allTodos);
});     
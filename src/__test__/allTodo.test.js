import { fireEvent, render, screen } from '@testing-library/react';
import { Login } from '../screens/login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRoutes } from '../router/routes';
import { AllTodos } from '../screens/allTodos';
import { Provider } from 'react-redux';
import { store } from '../redux/store';

test('Check All Todos page rendered or not', () => {
    render(<Provider store={store}>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<AllTodos />} />
            </Routes>
        </BrowserRouter>
    </Provider>);

    const title = screen.getByText(/All Todos/i);
    const addTodoBtn = screen.getByText(/Add Todo/i);
    const logoutBtn = screen.getByText(/Logout/i);
    const table = screen.getByTestId("allTodoTable");


    expect(title).toBeInTheDocument();
    expect(addTodoBtn).toBeInTheDocument();
    expect(logoutBtn).toBeInTheDocument();
    expect(table).toBeInTheDocument();
});

test('Check Add Todo button is working or not', () => {
    render(<Provider store={store}>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<AllTodos />} />
            </Routes>
        </BrowserRouter>
    </Provider>);

    const addTodoBtn = screen.getByTestId('addTodoBtn');

    fireEvent.click(addTodoBtn);

    expect(window.location.pathname).toBe(AppRoutes.addTodo);
})

test('Check Logout button is working or not', () => {
    render(<Provider store={store}>
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<AllTodos />} />
                <Route path={AppRoutes.addTodo} element={<AllTodos />} />
            </Routes>
        </BrowserRouter>
    </Provider>);

    const logoutBtn = screen.getByTestId('logoutBtn');

    fireEvent.click(logoutBtn);

    expect(window.location.pathname).toBe(AppRoutes.login);
})
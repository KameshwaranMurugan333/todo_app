import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AppRoutes } from "./router/routes";
import { Login } from "./screens/login";
import PrivateRoute from "./router/priavteRoute";
import { AllTodos } from "./screens/allTodos";
import { AddTodo } from "./screens/addTodo";
import { EditTodo } from "./screens/editTodo";


function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Navigate to={AppRoutes.login} />} />

        {/* Public Routes */}
        <Route path={AppRoutes.login} element={<Login />} />

        {/* Private Routes */}
        <Route path={AppRoutes.allTodos} element={<PrivateRoute path={AppRoutes.allTodos}>
          <AllTodos />
        </PrivateRoute>} />

        <Route path={AppRoutes.addTodo} element={<PrivateRoute path={AppRoutes.addTodo}>
          <AddTodo />
        </PrivateRoute>} />

        <Route path={AppRoutes.editTodo} element={<PrivateRoute path={AppRoutes.editTodo}>
          <EditTodo />
        </PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

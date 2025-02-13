import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import EmployeeList from "./components/ListEmployee";
import EditEmployee from "./components/EditEmployee";
import AddEmployee from "./components/AddEmployee";
import Login from "./components/Login";
import CategoryList from "./components/Category/ListCategory";
import AddCategory from "./components/Category/AddCategory";
import EditCategory from "./components/Category/EditCategory";
import EmployeeService from "./services/EmployeeService";
import CategoryService from "./services/CategoryService";
import { useState, useEffect } from "react";
import Dashboard from "./components/Dashboard";

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const employeeAuth = EmployeeService.isAuthenticated();
        const categoryAuth = CategoryService.isAuthenticated();
        setIsAuthenticated(employeeAuth || categoryAuth);
    }, []);

    return (
        <Router>
            <Routes>
                {/* Página de Login */}
                <Route path="/login" element={<Login onLogin={() => setIsAuthenticated(true)} />} />

                {/* Redirigir a Login si no está autenticado */}
                <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />

                {/* Dashboard con Navbar y Subrutas */}
                <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}>
                    <Route path="employees" element={<EmployeeList />} />
                    <Route path="add-employee" element={<AddEmployee />} />
                    <Route path="edit-employee/:id" element={<EditEmployee />} />
                    <Route path="categories" element={<CategoryList />} />
                    <Route path="add-category" element={<AddCategory />} />
                    <Route path="edit-category/:id" element={<EditCategory />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;

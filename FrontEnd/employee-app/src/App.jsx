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
        const authStatus = localStorage.getItem("isAuthenticated") === "true";
        setIsAuthenticated(authStatus);
    }, []);
    
    
    

    return (
        <Router>
            <Routes>
                {/* La página inicial SIEMPRE debe ser Login si el usuario NO está autenticado */}
                <Route path="/" element={isAuthenticated ? <Navigate to="/login" /> : <Navigate to="/login" />} />

                {/* Ruta del Login */}
                <Route path="/login" element={<Login onLogin={() => {localStorage.setItem("isAuthenticated", "true"); // Guardar autenticación
                setIsAuthenticated(true);}} />} />

                {/* Rutas protegidas solo accesibles si está autenticado */}
                <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}>
                    <Route path="employees" element={<EmployeeList />} />
                    <Route path="add-employee" element={<AddEmployee />} />
                    <Route path="edit-employee/:id" element={<EditEmployee />} />
                    <Route path="categories" element={<CategoryList />} />
                    <Route path="add-category" element={<AddCategory />} />
                    <Route path="edit-category/:id" element={<EditCategory />} />
                </Route>

                {/* Si el usuario intenta acceder a una ruta inexistente, lo enviamos a Login */}
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </Router>
    );
}

export default App;

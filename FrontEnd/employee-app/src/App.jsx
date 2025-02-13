import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import EmployeeList from "./components/ListEmployee";
import EditEmployee from "./components/EditEmployee";
import AddEmployee from "./components/AddEmployee";
import Login from "./components/Login"; // Importamimport CategoryList from "./components/CategoryList";
import CategoryList from "./components/Category/ListCategory";
import AddCategory from "./components/Category/AddCategory";
import EditCategory from "./components/Category/EditCategory";
import EmployeeService from "./services/EmployeeService";
import CategoryService from "./services/CategoryService";
import { useState, useEffect } from "react";

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsAuthenticated(!!token);
    }, []);

    return (
        <Router>
            <Routes>
                {/* Ruta de Login: Solo muestra el login si el usuario NO está autenticado */}
                <Route path="/login" element={isAuthenticated ? <Navigate to="/categories" /> : <Login onLogin={() => setIsAuthenticated(true)} />} />

                {/* Redirigir "/" al login si no está autenticado */}
                <Route path="/" element={isAuthenticated ? <Navigate to="/categories" /> : <Navigate to="/login" />} />

                {/* Rutas protegidas: Si no está autenticado, lo redirige a Login */}
                <Route path="/employees" element={isAuthenticated ? <EmployeeList /> : <Navigate to="/login" />} />
                <Route path="/add" element={isAuthenticated ? <AddEmployee /> : <Navigate to="/login" />} />
                <Route path="/edit/:id" element={isAuthenticated ? <EditEmployee /> : <Navigate to="/login" />} />

                {/* Rutas protegidas de Categorías */}
                <Route path="/categories" element={isAuthenticated ? <CategoryList /> : <Navigate to="/login" />} />
                <Route path="/add-category" element={isAuthenticated ? <AddCategory /> : <Navigate to="/login" />} />
                <Route path="/edit-category/:id" element={isAuthenticated ? <EditCategory /> : <Navigate to="/login" />} />

                {/* Si no coincide con ninguna ruta, redirigir al login */}
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </Router>
    );
}

export default App;

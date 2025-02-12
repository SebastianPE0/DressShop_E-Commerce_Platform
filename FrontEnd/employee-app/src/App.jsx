import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import EmployeeList from "./components/ListEmployee";
import EditEmployee from "./components/EditEmployee";
import AddEmployee from "./components/AddEmployee";
import Login from "./components/Login"; // Importamos el componente de Login
import EmployeeService from "./services/EmployeeService";
import { useState, useEffect } from "react";

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Verificar si el usuario tiene un token en localStorage al cargar la app
    useEffect(() => {
        setIsAuthenticated(EmployeeService.isAuthenticated());
    }, []);

    return (
        <Router>
            <Routes>
                {/* Ruta de Login */}
                <Route path="/login" element={<Login onLogin={() => setIsAuthenticated(true)} />} />

                {/* Rutas protegidas: Si no está autenticado, lo redirige a Login */}
                <Route path="/" element={isAuthenticated ? <EmployeeList /> : <Navigate to="/login" />} />
                <Route path="/add" element={isAuthenticated ? <AddEmployee /> : <Navigate to="/login" />} />
                <Route path="/edit/:id" element={isAuthenticated ? <EditEmployee /> : <Navigate to="/login" />} />
                <Route path="/categories" element={isAuthenticated ?  <CategoryList /> : <Navigate to="/login" />} />
                <Route path="/add-category" element={isAuthenticated ?   <AddCategory />  : <Navigate to="/login" />} />
                <Route path="/edit-category/:id" element={isAuthenticated ?  <EditCategory /> : <Navigate to="/login" />} />
            </Routes>
        </Router>
    );
}

export default App;

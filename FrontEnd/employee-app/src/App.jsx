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
        const employeeAuth = EmployeeService.isAuthenticated();
        const categoryAuth = CategoryService.isAuthenticated();
        
        setIsAuthenticated(employeeAuth || categoryAuth);
    }, []);
    return (
        <Router>
            <Routes>
                {/* Ruta de Login */}
                <Route path="/login" element={<Login onLogin={() => setIsAuthenticated(true)} />} />

                {/* Rutas protegidas: Si no está autenticado, lo redirige a Login */}
                <Route path="/" element={isAuthenticated ? <CategoryList /> : <Navigate to="/login" />} />
                 {/*<Route path="/" element={isAuthenticated ? <EmployeeList /> : <Navigate to="/login" />} /> */}
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
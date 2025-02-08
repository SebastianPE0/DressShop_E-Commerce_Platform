import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import EmployeeList from "./components/ListEmployee";
import EditEmployee from "./components/EditEmployee";
import AddEmployee from "./components/AddEmployee";
import Login from "./components/Login"; // Importamos el componente de Login
import EmployeeService from "./services/EmployeeService";
import { useState, useEffect } from "react";

import CategoryList from "./components/Category/ListCategory";
import AddCategory from "./components/Category/AddCategory";
import EditCategory from "./components/Category/EditCategory";




function App() {
    //TEST
    
    /*const [isAuthenticated, setIsAuthenticated] = useState(false);
    
    // Verificar si el usuario tiene un token en localStorage al cargar la app
    useEffect(() => {
        setIsAuthenticated(EmployeeService.isAuthenticated());
    }, []);
*/
    return (
        <Router>
            <Routes>
                
                
                <Route path="/categories" element={ <CategoryList /> } />
                <Route path="/add-category" element={  <AddCategory />  } />
                <Route path="/edit-category/:id" element={ <EditCategory /> } />
            </Routes>
        </Router>
    );
}

export default App;

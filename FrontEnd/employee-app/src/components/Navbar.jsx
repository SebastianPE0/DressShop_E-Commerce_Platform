import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import EmployeeService from "../services/EmployeeService";

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        EmployeeService.logout(); // Llama a la función de logout
        navigate("/login"); // Redirige al usuario al login después de cerrar sesión
    };
    return (
        <nav style={{ display: "flex", justifyContent: "space-around", padding: "10px", backgroundColor: "#333" }}>
            <Link to="/dashboard/employees" style={{ color: "white", textDecoration: "none" }}>Empleados</Link>
            <Link to="/dashboard/categories" style={{ color: "white", textDecoration: "none" }}>Categorías</Link>
            <button onClick={handleLogout} style={{ color: "white", background: "red", border: "none", cursor: "pointer" }}>
                Cerrar sesión
            </button>
        </nav>
    );
};

export default Navbar;

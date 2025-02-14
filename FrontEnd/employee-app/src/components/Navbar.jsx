import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import EmployeeService from "../services/EmployeeService";

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        EmployeeService.logout(); // Cierra sesión
        navigate("/login"); // Redirige al login
    };

    return (
        <nav style={{ display: "flex", justifyContent: "space-around", padding: "10px", backgroundColor: "#333" }}>
            <Link to="/dashboard/employees" style={{ color: "white", textDecoration: "none" }}>Empleados</Link>
            <Link to="/dashboard/categories" style={{ color: "white", textDecoration: "none" }}>Categorías</Link>
            <Link to="/dashboard/products" style={{ color: "white", textDecoration: "none" }}>Productos</Link>
            <button onClick={handleLogout} style={{ color: "white", background: "red", border: "none", cursor: "pointer" }}>
                Cerrar sesión
            </button>
        </nav>
    );
};

export default Navbar;

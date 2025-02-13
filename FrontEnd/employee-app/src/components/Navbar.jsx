import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav style={{ display: "flex", justifyContent: "space-around", padding: "10px", backgroundColor: "#333" }}>
            <Link to="/dashboard/employees" style={{ color: "white", textDecoration: "none" }}>Empleados</Link>
            <Link to="/dashboard/categories" style={{ color: "white", textDecoration: "none" }}>Categorías</Link>
        </nav>
    );
};

export default Navbar;

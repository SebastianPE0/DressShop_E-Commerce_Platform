import Navbar from "./Navbar";
import { Outlet, useLocation } from "react-router-dom";

const Dashboard = () => {
    const location = useLocation();

    return (
        <div>
            <Navbar />
            {/* Solo mostrar el mensaje de bienvenida si la URL es exactamente "/dashboard" */}
            {location.pathname === "/dashboard" && (
                <div style={{ padding: "20px" }}>
                    <h2>Bienvenido al sistema</h2>
                    <p>Selecciona una opción del menú</p>
                </div>
            )}
            <Outlet /> {/* Aquí se renderizarán las páginas internas */}
        </div>
    );
};

export default Dashboard;

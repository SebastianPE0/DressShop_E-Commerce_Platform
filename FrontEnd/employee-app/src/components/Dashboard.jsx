import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
    return (
        <div>
            <Navbar />
            <div style={{ padding: "20px" }}>
                <h2>Bienvenido al sistema</h2>
                <p>Selecciona una opción del menú</p>
                <Outlet /> {/* Aquí se renderizarán las rutas internas */}
            </div>
        </div>
    );
};

export default Dashboard;

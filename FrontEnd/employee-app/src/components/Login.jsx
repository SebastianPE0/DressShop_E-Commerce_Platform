import React, { useState } from "react";
import EmployeeService from "../services/EmployeeService";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
const Login = ({ onLogin }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await EmployeeService.login(email, password);
            onLogin();  // Cambia el estado de autenticación en App.jsx
            navigate("/dashboard"); // Redirige al Dashboard después del login
        } catch (error) {
            alert("Error en el inicio de sesión");
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Iniciar Sesión</h2>
                <form onSubmit={handleLogin}>
                    <div className="input-group">
                        <label>Correo Electrónico</label>
                        <input
                            type="email"
                            placeholder="ejemplo@correo.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label>Contraseña</label>
                        <input
                            type="password"
                            placeholder="********"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button className="login-button" type="submit">Iniciar Sesión</button>
                   
                </form>
            </div>
        </div>
    );
};

export default Login;
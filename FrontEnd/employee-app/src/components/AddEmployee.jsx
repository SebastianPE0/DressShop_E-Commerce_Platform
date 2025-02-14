import React, { useState } from "react";
import { createEmployee } from "../services/EmployeeService";
import { useNavigate } from "react-router-dom";

const AddEmployee = () => {
    const navigate = useNavigate();
    const [employee, setEmployee] = useState({ employeename: "", email: "", password: "" });

    const handleChange = (e) => {
        setEmployee({ ...employee, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createEmployee(employee);
            alert("Empleado añadido correctamente");
            navigate("/dashboard/employees"); // ✅ Redirigir correctamente a la lista de empleados
        } catch (error) {
            console.error("Error añadiendo empleado:", error);
            alert("Hubo un error al añadir el empleado. Verifica los datos e intenta de nuevo.");
        }
    };

    return (
        <div>
            <h2>Añadir Empleado</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="employeename" value={employee.employeename} onChange={handleChange} placeholder="Nombre" required />
                <input type="email" name="email" value={employee.email} onChange={handleChange} placeholder="Email" required />
                <input type="password" name="password" value={employee.password} onChange={handleChange} placeholder="Contraseña" required />
                <button type="submit">Añadir</button>
            </form>
        </div>
    );
};

export default AddEmployee;

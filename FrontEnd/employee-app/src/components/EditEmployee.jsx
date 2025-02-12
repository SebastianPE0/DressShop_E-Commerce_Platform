import React, { useEffect, useState } from "react";
import { getEmployeeById, updateEmployee } from "../services/EmployeeService";
import { useParams, useNavigate } from "react-router-dom";

const EditEmployee = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [employee, setEmployee] = useState({ employeename: "", email: "", password: "" });

    useEffect(() => {
        loadEmployee();
    }, []);

    const loadEmployee = async () => {
        try {
            const data = await getEmployeeById(id);
            setEmployee(data);
        } catch (error) {
            console.error("Error obteniendo empleado:", error);
        }
    };

    const handleChange = (e) => {
        setEmployee({ ...employee, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateEmployee(id, employee);
            alert("Empleado actualizado correctamente");
            navigate("/");
        } catch (error) {
            console.error("Error actualizando empleado:", error);
        }
    };

    return (
        <div>
            <h2>Editar Empleado</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="employeename" value={employee.employeename} onChange={handleChange} placeholder="Nombre" required />
                <input type="email" name="email" value={employee.email} onChange={handleChange} placeholder="Email" required />
                <input type="password" name="password" value={employee.password} onChange={handleChange} placeholder="Contraseña" required />
                <button type="submit">Actualizar</button>
            </form>
        </div>
    );
};

export default EditEmployee;
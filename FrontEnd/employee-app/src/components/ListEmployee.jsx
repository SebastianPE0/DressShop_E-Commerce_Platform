import React, { useEffect, useState } from "react";
import { getEmployees, deleteEmployee } from "../services/EmployeeService";
import { Link } from "react-router-dom";

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        loadEmployees();
    }, []);

    const loadEmployees = async () => {
        try {
            const data = await getEmployees();
            setEmployees(data);
        } catch (error) {
            console.error("Error cargando empleados:", error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("¿Estás seguro de que deseas eliminar este empleado?")) {
            try {
                await deleteEmployee(id);
                alert("Empleado eliminado correctamente");
                loadEmployees(); // Recargar la lista después de eliminar
            } catch (error) {
                console.error("Error eliminando empleado:", error);
    
                // Si el error es de autenticación, redirigir al login
                if (error.response && error.response.status === 401) {
                    localStorage.removeItem("isAuthenticated");
                    window.location.href = "/login"; // Forzar redirección
                }
            }
        }
    };
    

    return (
        <div className="container">
            <h2>Lista de Empleados</h2>
            {/* Botón para agregar un nuevo empleado */}
            <button style={{ marginBottom: "10px", padding: "10px", backgroundColor: "green", color: "white", borderRadius: "5px" }}>
                <Link to="/dashboard/add-employee" style={{ textDecoration: "none", color: "white" }}>Añadir Empleado</Link>
            </button>


            <ul>
                {employees.map(employee => (
                    <li key={employee.employeeid}>
                        {employee.employeename} - {employee.email}
                        
                        {/* Botón de Eliminar */}
                        <button onClick={() => handleDelete(employee.employeeid)} style={{ marginLeft: "10px", color: "red" }}>
                            Eliminar
                        </button>

                       {/* Botón de Editar */}
                        <button style={{ marginLeft: "10px", backgroundColor: "blue", color: "white", padding: "5px", borderRadius: "5px" }}>
                           <Link to={`/dashboard/edit-employee/${employee.employeeid}`} style={{ textDecoration: "none", color: "white" }}>
                               Editar
                           </Link>
                        </button>

                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EmployeeList;
package com.alex.update_employee.web.springboot_update_employee.Service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import com.alex.update_employee.web.springboot_update_employee.Dto.EmployeeDTO;
import com.alex.update_employee.web.springboot_update_employee.Entity.Employee;
import com.alex.update_employee.web.springboot_update_employee.Repo.EmployeeRepo;
import com.alex.update_employee.web.springboot_update_employee.Service.IEmployeeService;

import java.util.Optional;
import org.springframework.stereotype.Service;
@Service
public class EmployeeImpl  implements IEmployeeService {
    
    @Autowired
    private EmployeeRepo employeeRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;  // Asegúrate de inyectar el PasswordEncoder

    @Override
    public Employee updateEmployee(String id, EmployeeDTO employeeDTO) {
        // Busca el empleado en la base de datos por id
        Optional<Employee> optionalEmployee = employeeRepo.findById(id);  // Encuentra al empleado por id

        // Verifica si el empleado existe
        if (optionalEmployee.isPresent()) {
            Employee existingEmployee = optionalEmployee.get();  // Obtén el Employee del Optional

            // Actualiza los campos del empleado con los valores proporcionados en el DTO
            existingEmployee.setEmployeename(employeeDTO.getEmployeename());
            existingEmployee.setEmail(employeeDTO.getEmail());

            // Si la contraseña es proporcionada, se encripta y se actualiza
            if (employeeDTO.getPassword() != null && !employeeDTO.getPassword().isEmpty()) {
                existingEmployee.setPassword(passwordEncoder.encode(employeeDTO.getPassword()));
            }

            // Guarda los cambios en la base de datos
            employeeRepo.save(existingEmployee);

            // Retorna el empleado actualizado
            return existingEmployee;
        } else {
            // Si el empleado no se encuentra, lanza una excepción o maneja el caso de no encontrado
            throw new RuntimeException("Employee not found with id: " + id);
        }
    }
}

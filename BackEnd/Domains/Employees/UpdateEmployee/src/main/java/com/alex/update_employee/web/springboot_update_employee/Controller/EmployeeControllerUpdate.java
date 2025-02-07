package com.alex.update_employee.web.springboot_update_employee.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.alex.update_employee.web.springboot_update_employee.Dto.EmployeeDTO;
import com.alex.update_employee.web.springboot_update_employee.Entity.Employee;
import com.alex.update_employee.web.springboot_update_employee.Service.IEmployeeService;

@RestController
@CrossOrigin(origins = {
    "http://localhost:5173",
    "http://localhost:5174",
    "http://ec2-52-91-80-158.compute-1.amazonaws.com" // Agrega el frontend en AWS
})
@RequestMapping("/api/v1/employees")
public class EmployeeControllerUpdate {
    @Autowired
    private IEmployeeService service;

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody EmployeeDTO employeeDTO) {
        try {
            Employee updatedEmployee = service.updateEmployee(id, employeeDTO);
            return ResponseEntity.ok(updatedEmployee);
        } catch (Exception e) {
            return ResponseEntity.status(400).body("Error actualizando empleado: " + e.getMessage());
        }
    }
}

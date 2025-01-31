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
@CrossOrigin(origins = "http://localhost:5173") 
@RequestMapping("/api/v1/employees")
public class EmployeeControllerUpdate {
    @Autowired
    private IEmployeeService service;

    @PutMapping("/{id}")
    public ResponseEntity<Employee> update(@PathVariable Long id, @RequestBody EmployeeDTO employeeDTO) {
        Employee updatedEmployee = service.updateEmployee(id, employeeDTO);
        return ResponseEntity.ok(updatedEmployee);  // Retorna el empleado actualizado
    }
}

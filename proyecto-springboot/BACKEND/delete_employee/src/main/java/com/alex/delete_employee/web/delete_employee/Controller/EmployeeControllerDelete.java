package com.alex.delete_employee.web.delete_employee.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import com.alex.delete_employee.web.delete_employee.Service.IEmployeeService;

@RestController
@RequestMapping("/api/v1/employees")
public class EmployeeControllerDelete {
    @Autowired
    private IEmployeeService service;

    @DeleteMapping("/delete/{id}")  // Usa DELETE en lugar de PUT
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.deleteEmployee(id);
        return ResponseEntity.ok("Employee deleted successfully");  // Retorna un mensaje en lugar de un objeto
    }
}


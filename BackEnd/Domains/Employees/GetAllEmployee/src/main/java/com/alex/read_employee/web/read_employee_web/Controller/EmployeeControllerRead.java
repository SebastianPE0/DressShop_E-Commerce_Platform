package com.alex.read_employee.web.read_employee_web.Controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.alex.read_employee.web.read_employee_web.Entity.Employee;
import com.alex.read_employee.web.read_employee_web.Service.IEmployeeService;

@RestController
@CrossOrigin(origins = {
    "http://localhost:5173",
    "http://ec2-44-208-167-243.compute-1.amazonaws.com"
})
@RequestMapping("/api/v1/employee")
public class EmployeeControllerRead {
        
    @Autowired
    private IEmployeeService service;

    @GetMapping
    public ResponseEntity<List<Employee>> getAllEmployees() {
        List<Employee> employees = service.getAllEmployees();
        return ResponseEntity.ok(employees);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Employee>> getEmployeeById(@PathVariable Long id) {
        Optional<Employee> employee = service.getEmployeeById(id);
        if (employee.isPresent()) {
            return ResponseEntity.ok(employee);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
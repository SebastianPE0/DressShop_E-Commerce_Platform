package com.alex.delete_employee.web.delete_employee.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.alex.delete_employee.web.delete_employee.Service.IEmployeeService;

@RestController
@CrossOrigin(origins = {
    "http://localhost:5173",
    "http://ec2-54-159-232-247.compute-1.amazonaws.com"
})
@RequestMapping("/api/v1/employees")
public class EmployeeControllerDelete {
    @Autowired
    private IEmployeeService service;

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        try {
            service.deleteEmployee(id);
            return ResponseEntity.ok("Empleado eliminado correctamente.");
        } catch (Exception e) {
            return ResponseEntity.status(404).body("Error: Empleado no encontrado.");
        }
    }
}

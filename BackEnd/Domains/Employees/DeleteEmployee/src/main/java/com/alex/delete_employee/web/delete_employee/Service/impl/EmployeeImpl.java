package com.alex.delete_employee.web.delete_employee.Service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alex.delete_employee.web.delete_employee.Repo.EmployeeRepo;
import com.alex.delete_employee.web.delete_employee.Service.IEmployeeService;

@Service
public class EmployeeImpl  implements IEmployeeService{
    
    @Autowired
    private EmployeeRepo employeeRepo;

    @Override
    public void deleteEmployee(String id) {
        if (employeeRepo.existsById(id)) {
            employeeRepo.deleteById(id);
        } else {
            throw new RuntimeException("Employee not found with id: " + id);
        }
    }
}

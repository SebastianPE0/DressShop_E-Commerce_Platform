package com.alex.read_employee.web.read_employee_web.Service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alex.read_employee.web.read_employee_web.Entity.Employee;
import com.alex.read_employee.web.read_employee_web.Repo.EmployeeRepo;
import com.alex.read_employee.web.read_employee_web.Service.IEmployeeService;
@Service
public class EmployeeImpl  implements IEmployeeService {
    @Autowired
    private EmployeeRepo employeeRepo;

    @Override
    public List<Employee> getAllEmployees() {
        return employeeRepo.findAll();
    }

    @Override
    public Optional<Employee> getEmployeeById(String id) {
        return employeeRepo.findById(id);
    }
}

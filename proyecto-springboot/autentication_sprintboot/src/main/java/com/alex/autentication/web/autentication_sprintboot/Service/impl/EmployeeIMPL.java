package com.alex.autentication.web.autentication_sprintboot.Service.impl;

import org.springframework.beans.factory.annotation.Autowired;

import com.alex.autentication.web.autentication_sprintboot.Dto.EmployeeDTO;
import com.alex.autentication.web.autentication_sprintboot.Entity.Employee;
import com.alex.autentication.web.autentication_sprintboot.Repo.EmployeeRepo;
import com.alex.autentication.web.autentication_sprintboot.Service.EmployeeService;
import org.springframework.security.crypto.password.PasswordEncoder;


public class EmployeeIMPL implements EmployeeService {

    @Autowired
    private EmployeeRepo employeeRepo;
    @Autowired
    private PasswordEncoder passwordEncoder;



    @Override 
    public String addEmployee(EmployeeDTO employeeDTO){
        Employee employee = new Employee(
            employeeDTO.getEmployeeid(),
            employeeDTO.getEmployeename(),
            employeeDTO.getEmail(),
            this.passwordEncoder.encode(employeeDTO.getPassword())

        ); 
        employeeRepo.save(employee);
                
        return employee.getEmployeename();

    }
}

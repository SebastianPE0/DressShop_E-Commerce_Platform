package com.alex.read_employee.web.read_employee_web.Service;


import java.util.List;
import java.util.Optional;

import com.alex.read_employee.web.read_employee_web.Entity.Employee;

public interface IEmployeeService {
    List<Employee> getAllEmployees();
    Optional<Employee> getEmployeeById(String id);
}

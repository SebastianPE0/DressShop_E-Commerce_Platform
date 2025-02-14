package com.alex.update_employee.web.springboot_update_employee.Service;

import com.alex.update_employee.web.springboot_update_employee.Dto.EmployeeDTO;
import com.alex.update_employee.web.springboot_update_employee.Entity.Employee;

public interface IEmployeeService {
     Employee updateEmployee(String id, EmployeeDTO employeeDTO);  // 
}

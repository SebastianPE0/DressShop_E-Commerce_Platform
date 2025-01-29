package com.alex.autentication.web.autentication_sprintboot.Service;

import com.alex.autentication.web.autentication_sprintboot.Dto.EmployeeDTO;
import com.alex.autentication.web.autentication_sprintboot.Dto.LoginDTO;
import com.alex.autentication.web.autentication_sprintboot.response.LoginResponse;



public interface EmployeeService {

    String addEmployee(EmployeeDTO employeeDTO);
    LoginResponse  loginEmployee(LoginDTO loginDTO);
    EmployeeDTO getEmployeeByEmail(String email); 
   
    
}

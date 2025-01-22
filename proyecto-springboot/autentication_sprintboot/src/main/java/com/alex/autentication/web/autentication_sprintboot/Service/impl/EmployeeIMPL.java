package com.alex.autentication.web.autentication_sprintboot.Service.impl;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import com.alex.autentication.web.autentication_sprintboot.Dto.EmployeeDTO;
import com.alex.autentication.web.autentication_sprintboot.Dto.LoginDTO;
import com.alex.autentication.web.autentication_sprintboot.Entity.Employee;
import com.alex.autentication.web.autentication_sprintboot.Repo.EmployeeRepo;
import com.alex.autentication.web.autentication_sprintboot.Service.EmployeeService;

import com.alex.autentication.web.autentication_sprintboot.response.LoginResponse;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
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



    @Override
    public LoginResponse loginEmployee(LoginDTO loginDTO) {
       String msg ="";
        Employee employee1 = employeeRepo.findByEmail(loginDTO.getEmail());
        if(employee1 != null){
            String password = loginDTO.getPassword();
            String encodedPassword =employee1.getPassword();
            Boolean isPwdRight = passwordEncoder.matches(password, encodedPassword);
            if(isPwdRight) {
                Optional<Employee> employee= employeeRepo.findOneByEmailAndPassword(loginDTO.getEmail(), encodedPassword);
                if(employee.isPresent()){
                    return new LoginResponse("Login Successful",true);
                }else{
                    return new LoginResponse("login failed",false);
                }

            }else{
                return new LoginResponse("password not match",false);
            }

        }else{
            return new LoginResponse("email not found",false);
        }


       
    }
}

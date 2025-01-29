package com.alex.login.web.login_springboot.Service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.alex.login.web.login_springboot.Client.ClientEmployee;
import com.alex.login.web.login_springboot.Dto.EmployeeDTO;
import com.alex.login.web.login_springboot.Dto.LoginDTO;
import com.alex.login.web.login_springboot.Response.LoginResponse;
import com.alex.login.web.login_springboot.Service.ILoginService;

@Service
public class LoginIMPL implements ILoginService{

    @Autowired
    private ClientEmployee clientEmployee;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public LoginResponse loginEmployee(LoginDTO loginDTO) {
        try {
            // Llama al microservicio Employee usando Feign
            EmployeeDTO employeeDTO = clientEmployee.getEmployeeByEmail(loginDTO.getEmail());

            if (employeeDTO != null) {
                boolean isPasswordValid = passwordEncoder.matches(loginDTO.getPassword(), employeeDTO.getPassword());
                if (isPasswordValid) {
                    return new LoginResponse("Login Successful", true);
                } else {
                    return new LoginResponse("Incorrect password", false);
                }
            } else {
                return new LoginResponse("Email not found", false);
            }
        } catch (Exception e) {
            return new LoginResponse("Error connecting to employee service: " + e.getMessage(), false);
        }
    }
}

package com.alex.autentication.web.autentication_sprintboot.EmployeeController;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
//import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.alex.autentication.web.autentication_sprintboot.Dto.EmployeeDTO;
import com.alex.autentication.web.autentication_sprintboot.Dto.LoginDTO;
import com.alex.autentication.web.autentication_sprintboot.Service.EmployeeService;
import com.alex.autentication.web.autentication_sprintboot.response.LoginResponse;


@RestController
@CrossOrigin
@RequestMapping("api/v1/employee")

public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;
    @PostMapping(path="/save")
    public String saveEmployee(@RequestBody EmployeeDTO employeeDTO) {
        String id = employeeService.addEmployee(employeeDTO);
        
        return id;
    }
    
    @PostMapping(path = "/login")
    public ResponseEntity<?> loginEmployee(@RequestBody LoginDTO loginDTO) {
        //TODO: process POST request
        LoginResponse loginResponse = employeeService.loginEmployee(loginDTO);
        
        return ResponseEntity.ok(loginResponse);
    }
    



}

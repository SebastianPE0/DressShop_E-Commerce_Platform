package com.alex.login.web.login_springboot.Client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.alex.login.web.login_springboot.Dto.EmployeeDTO;

@FeignClient(name = "employee-service", url = "http://localhost:8081/api/v1/employee")
public interface ClientEmployee {
 
    @GetMapping("/getByEmail/{email}")
    EmployeeDTO getEmployeeByEmail(@PathVariable("email") String email);
}
